angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
    $scope.username = 'user';

    $scope.authenticate = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      UserService.authenticate($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .success(function (data) {
          //$location.path('/main');
          if (data) {
            $scope.disabled = false;
            $scope.username = data.username;
            // redirect to main page depending on type
            if (data.userType == "Student") {
              $location.path('/main');
            } else if (data.userType == "Admin") {
              $location.path('/adminapps');
            }
            $location
            $scope.loginForm = {};
          } else {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          }
        });

    };

}])
