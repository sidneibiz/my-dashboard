(() => {
  angular.module('dashboard').factory('tabs', [
    function TabsFactory() {

      const show = (owner,
        {
          tabList = false,
          tabCreate = false,
          tabChange = false,
          tabDelete = false
       }) => {
        owner.tabList = tabList;
        owner.tabCreate = tabCreate;
        owner.tabChange = tabChange;
        owner.tabDelete = tabDelete;
      };

      return {
        show
      }
    }
  ]);
})();