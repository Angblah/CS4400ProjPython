angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      UserService.register($scope.registerform.username, $scope.registerform.email, $scope.registerform.password)
        // handle success
        .success(function (data) {
          //$location.path('/main');
          if (data.username) {
            $scope.disabled = false;
            $scope.username = data.username;
            $location.path('/main');
            $scope.registerform = {};
          } else {
            $scope.error = true;
            $scope.errorMessage = "Unable to Register, username or email might already exist";
            $scope.disabled = false;
            $scope.registerform = {};
          }
        });
      };


}])
