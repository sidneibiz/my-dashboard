(() => {
  angular.module('dashboard').component('valueBox', {
    bindings: {
      grid: '@',
      color: '@',
      value: '@',
      label: '@',
      iconClass: '@'
    },
    controller: [
      'gridSystem',
      function (gridSystem) {
        this.$onInit = () => this.gridClass = gridSystem.toCssClass(this.grid);
      }
    ],
    template: `<div class="{{$ctrl.gridClass}}">
                <div class="small-box {{$ctrl.color}}">
                  <div class="inner">
                    <h3>{{$ctrl.value}}</h3> 
                    <p>{{$ctrl.label}}</p>
                  </div>
                  <div class="icon">
                    <i class="fa {{$ctrl.iconClass}}"></i>
                  </div>
                </div>
              </div>`
  });
})();