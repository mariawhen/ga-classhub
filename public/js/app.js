(function() {
  'use strict';

  angular
    .module('gaClasshub', ['userService', 'authService', 'ui.router'])

    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
