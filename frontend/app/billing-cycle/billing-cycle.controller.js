(() => {
  angular.module('dashboard').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    'tabs',
    BillingCycleController
  ]);

  function BillingCycleController($http, msgs, tabs) {
    const vm = this;
    const url = 'http://localhost:3003/api/billingCycles';

    vm.refresh = () => {
      $http.get(url).then(response => {
        vm.billingCycle = {};
        vm.billingCycles = response.data;
        tabs.show(vm, { tabList: true, tabCreate: true });
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
    };

    vm.showTabDelete = (billingCycle) => {
      vm.billingCycle = billingCycle;
      tabs.show(vm, { tabDelete: true });
    };

    vm.refresh();
  }
})();