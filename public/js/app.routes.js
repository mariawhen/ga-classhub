(function(){

'use strict';

angular.module('gaClasshub')
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl:  'js/templates/home.html',
      controller:   'mainController',
      controllerAs: 'main'
    });

    $urlRouterProvider.otherwise('/'); //default state
  }

})();
