(function() {
  'use strict';

  angular
    .module('newApp')
    .controller('ExampleController', ExampleController);

  ExampleController.$inject = [];

  function ExampleController() {
    var vm = this;

    vm.listNames = listNames;

    function listNames() {
      return ['Jim', 'Phil', 'Stanley']
    }
  }
})();
