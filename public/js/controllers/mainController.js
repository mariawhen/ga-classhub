(function() {

  'use strict';

  angular.module('gaClasshub')
    .controller('mainController', mainController)

  function mainController($http, User, Auth, $rootScope, $location) {

    var vm = this;

    vm.message = "Hi";

    vm.login = {};
    vm.login.status = Auth.isLoggedIn();

    //check to see if a user is logged in on every req
    $rootScope.$on('$routeChangeStart', function() {
      vm.login.status = Auth.isLoggedIn();

      //get user info on route change
      Auth.getUser()
        .success(function(data) {
          vm.user = data;
        });
    });

    //function to handle login form
    vm.doLogin = function() {
      //call the Auth.login()
      vm.login.status = Auth.isLoggedIn();

      console.log('doLogin triggered');
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
          vm.login.status = Auth.isLoggedIn();
          //if a user successfully logs in, redirect to users page
          $location.path('/users');
        });

    };

    //function to handle logging out
    vm.doLogout = function() {
      Auth.logout();
      vm.login.status = Auth.isLoggedIn();
      //reset all user info
      vm.user = {};
      $location.path('/login');
    };

  }


})();
