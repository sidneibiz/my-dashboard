(() => {
  angular.module('dashboard').factory('msgs', [
    'toastr',
    MsgsFactory
  ]);

  function MsgsFactory(toastr) {
    const addMsg = (msgs, title, method) => {
      if (msgs instanceof Array) {
        msgs.forEach(msg => toastr[method](msg, title));
      } else toastr[method](msgs, title);
    };

    const addSuccess = (msgs) => {
      addMsg(msgs, 'Success', 'success');
    };

    const addError = (msgs) => {
      addMsg(msgs, 'Error', 'error');
    };

    return {
      addSuccess,
      addError
    }
  }
})();