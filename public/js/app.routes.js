(function(){

'use strict';

angular.module('gaClasshub')
  .config(MainRouter);

  function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider

    // HOME STATE
    .state('home', {
      url: '/',
      templateUrl:  'js/templates/home.html',
      controller:   'mainController',
      controllerAs: 'main'
    })

    // GALLERY STATE
    .state('gallery', {
      url: '/gallery',
      templateUrl: 'js/templates/gallery.html',
      controller: 'mainController',
      controllerAs: 'main'
    })

    // PROFILE STATE
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/templates/profile.html',
      controller: 'mainController',
      controllerAs: 'main'
    });

    $urlRouterProvider.otherwise('/'); //default state
  }

})();
