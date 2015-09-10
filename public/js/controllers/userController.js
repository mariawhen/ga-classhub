(function(){

  'use strict';

  angular.module('gaClasshub')
         .controller('userController', userController)

    function userController(Auth, User, $http, $location, $q) {
      var vm = this;

      //set processing var to show loading things
      vm.processing = true;

      //grab all the users
      User.all()
          .success(function(data) {
        //when users come back, remove processing var
        vm.processing = false;
        //bind the users that come back to vm.users
        vm.users = data;

          });
})();
