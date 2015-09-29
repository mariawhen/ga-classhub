(function (){

  'use strict';

  angular.module('authService', [])

    .factory('Auth', function($http, $q, AuthToken) {
      var authFactory = {};
        authFactory.login = function(username, password) {
          return $http.post('api/authenticate', {
            username: username,
            password: password
          })
          .success(function(data) {
            AuthToken.setToken(data.token);
            return data;
          });
        };

        authFactory.logout = function() {
          AuthToken.setToken();

        };

        authFactory.isLoggedIn = function() {
          if(AuthToken.getToken())
            return true;
          else
            return false;
        };

        authFactory.getUser = function() {
          if(AuthToken.getToken())
            return $http.get('/api/me', { cache: true });
          else
            return $q.reject({message: 'User has no token.'});
        };

      return authFactory;
    })

    .factory('AuthToken', function($window) {
      var authTokenFactory = {};
        authTokenFactory.getToken = function() {
          return $window.localStorage.getItem('token');
        };

        authTokenFactory.setToken = function(token) {
          if (token)
            $window.localStorage.setItem('token', token);
          else
            $window.localStorage.removeItem('token');
        };

      return authTokenFactory;
    })

    .factory('AuthInterceptor', function($q, $location, AuthToken) {
      var interceptorFactory = {};
        interceptorFactory.request = function(config) {

          //get the token
          var token = AuthToken.getToken();
          //if token exists, add it to the header as x-access-token
          if(token)
            config.headers['x-access-token'] = token;
          return config;
        };

        //happens on res err's
        interceptorFactory.responseError = function(response) {
          //if our server returns a 403 forbidden response
          if(response.status == 403)
            $location.path('/login');

          //return the errors from the server as a promise
          return $q.reject(response);
        };
      return interceptorFactory;
    })

})();
