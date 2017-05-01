(() => {
  angular.module('dashboard').controller('BillingCycleCtrl', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ]);

  function BillingCycleController($http, $location, msgs, tabs) {
    const vm = this;
    const url = 'http://localhost:3003/api/billingCycles';

    vm.refresh = () => {
      const page = parseInt($location.search().page) || 1;
      $http.get(`${url}?skip=${(page - 1) * 6}&limit=6`).then(response => {
        vm.billingCycle = { credits: [{}], debts: [{}] };
        vm.billingCycles = response.data;
        vm.calculateValues();
        $http.get(`${url}/count`).then(response => {
          vm.pages = Math.ceil(response.data.value / 6);
          tabs.show(vm, { tabList: true, tabCreate: true });
        });
      });
    };

    vm.create = () => {
      $http.post(url, vm.billingCycle).then(() => {
        vm.refresh();
        msgs.addSuccess("Operation performed successfully!")
      }).catch(response => msgs.addError(response.data.errors));
    };

    vm.change = () => {
      const changeUrl = `${url}/${vm.billingCycle._id}`;
      $http.put(changeUrl, vm.billingCycle).then(() => {
        vm.refresh();
        msgs.addSuccess("Change made successfully!")
      }).catch(response => msgs.addError(response.data.errors));
    };

    vm.delete = () => {
      const deleteUrl = `${url}/${vm.billingCycle._id}`;
      $http.delete(deleteUrl, vm.billingCycle).then(() => {
        vm.refresh();
        msgs.addSuccess("Deletion successful!")
      }).catch(response => msgs.addError(response.data.errors));
    };

    vm.showTabUpdate = (billingCycle) => {
      vm.billingCycle = billingCycle;
      tabs.show(vm, { tabChange: true });
      vm.calculateValues();
    };

    vm.showTabDelete = (billingCycle) => {
      vm.billingCycle = billingCycle;
      tabs.show(vm, { tabDelete: true });
      vm.calculateValues();
    };

    vm.addCredit = (index) => {
      vm.billingCycle.credits.splice(index + 1, 0, {});
      vm.calculateValues();
    };

    vm.cloneCredit = (index, { name, value }) => {
      vm.billingCycle.credits.splice(index + 1, 0, { name, value });
      vm.calculateValues();
    };

    vm.deleteCredit = (index) => {
      if (vm.billingCycle.credits.length > 1) vm.billingCycle.credits.splice(index, 1);
      vm.calculateValues();
    };

    vm.addDebt = (index) => {
      vm.billingCycle.debts.splice(index + 1, 0, {});
      vm.calculateValues();
    };

    vm.cloneDebt = (index, { name, value, status }) => {
      vm.billingCycle.debts.splice(index + 1, 0, { name, value, status });
      vm.calculateValues();
    };

    vm.deleteDebt = (index) => {
      if (vm.billingCycle.debts.length > 1) vm.billingCycle.debts.splice(index, 1);
      vm.calculateValues();
    };

    vm.calculateValues = () => {
      vm.credit = 0;
      vm.debt = 0;

      if (vm.billingCycle) {
        vm.billingCycle.credits.forEach(({ value }) => {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
        });

        vm.billingCycle.debts.forEach(({ value }) => {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
        });
      }

      vm.total = vm.credit - vm.debt;
    };

    vm.refresh();
  }
})();