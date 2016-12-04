angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {

    // $scope.userCheckFail = false;
    // $scope.passCheckFail = false;
    // $scope.passMatchFail = false;
    $scope.registerform = {
      username: "",
      email: "",
      password: "",
      confpassword: ""
    };

    $scope.register = function () {
      if ($scope.validate($scope.registerform.username, $scope.registerform.email, $scope.registerform.password, $scope.registerform.confpassword)) {
        return;
      }
      if (!$scope.registerform.email) {
        return;
      }
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
            $location.path('/editprofile');
            $scope.registerform = {};
          } else {
            $scope.error = true;
            $scope.errorMessage = "Unable to Register, username or email already exists";
            $scope.disabled = false;
            $scope.registerform = {};
          }
        });
      };

    $scope.validate = function (username, email, password, confpassword) {
      $scope.userCheckFail = false;
      $scope.emailCheckFail = false;
      $scope.passCheckFail = false;
      $scope.passMatchFail = false;

      if (username == "") {
        $scope.userCheckFail = true;
        return false;
      }
      if (email == "") {
        $scope.emailCheckFail = true;
        return false;
      }
      if (password == "") {
        $scope.passCheckFail = true;
        return false;
      }
      if (password != confpassword) {
        $scope.passMatchFail = true;
        return false;
      }
    }

}])
