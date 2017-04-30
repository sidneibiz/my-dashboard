(() => {
  angular.module('dashboard').controller('BillingCycleCtrl', [
    '$http',
    'msgs',
    BillingCycleController
  ]);

  function BillingCycleController($http, msgs) {
    const vm = this;
    vm.create = () => {
      const url = 'http://localhost:3003/api/billingCycles';
      $http.post(url, vm.billingCycle).then(() => {
        vm.billingCycle = {};
        msgs.addSuccess("Operation performed successfully!")
      }).catch(response => msgs.addError(response.data.errors));
    }
  }
})();