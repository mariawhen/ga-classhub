(function(){

  'use strict';

  angular.module('gaClasshub')
    .controller('mainController', mainController)

    function mainController($http, User, Auth, $rootScope, $location) {

      var vm = this;

      vm.message = "hi";

      vm.allUsers = User.all();

      vm.aMaria = User.get('55efcaaf93e3a3aabf98bebe');

      console.log(vm.allUsers);
      console.log(vm.aMaria);

    }

})();
