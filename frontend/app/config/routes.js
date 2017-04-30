angular.module('dashboard').config([
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/dashboard.html'
    }).state('billingCycle', {
      url: '/billingcycles',
      templateUrl: 'billing-cycle/tabs.html'
    });

    $urlRouterProvider.otherwise('/dashboard');
  }
]);