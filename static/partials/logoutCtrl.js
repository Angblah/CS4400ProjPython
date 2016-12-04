angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
    $scope.logout = function () {

      // call logout from service
      UserService.logout()
        .then(function () {
            console.log(UserService.getUser());
            $location.path('/login');
        });

    };
}])
