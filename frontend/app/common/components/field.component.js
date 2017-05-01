(() => {
  angular.module('dashboard').component('field', {
    bindings: {
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=',
      readonly: '<'
    },
    controller: [
      'gridSystem',
      function (gridSystem) {
        this.$onInit = () => this.gridClass = gridSystem.toCssClass(this.grid);
      }
    ],
    template: `
       <div class="{{$ctrl.gridClass}}">
        <div class="form-group">
          <label for="{{$ctrl.id}}">{{$ctrl.label}}</lable>
          <input id="{{$ctrl.id}}" class="form-control" placeholder="{{$ctrl.placeholder}}" 
          type="{{$ctrl.type}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly"/>
        </div>
      </div>
    `
  });
})();