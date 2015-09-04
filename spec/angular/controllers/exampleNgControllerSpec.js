var scope,
    ctrl;

describe('ExampleController', function() {

  beforeEach(module('newApp')); // load the main angular module

  beforeEach(inject(function($controller, $rootScope) {
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();

    // Create the controller
    ctrl = $controller('ExampleController', {
      $scope: scope
    });

  }));

  describe('#listNames', function() {
    it('should return a list of names', function() {
      expect(ctrl.listNames()).to.include.members([
          'Jim',
          'Phil',
          'Stanley'
      ]);
    });
  });
});
