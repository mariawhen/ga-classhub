(function() {
  'use strict';

  angular
    .module('gaClasshub', ['userService', 'authService'])

    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
