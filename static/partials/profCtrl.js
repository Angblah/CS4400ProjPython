angular.module('myApp').controller('profileController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
      /*UserService.getMajors()
      .success(function(data) {
          if (data) {
              $scope.majorOptions = data;
          }
      });*/

      // Get Student for profile
      UserService.getStudent(UserService.username)
      // handle success
      .success(function(data) {
          //$location.path('/main');
          if (data) {
              $scope.data.email = data.email;
              $scope.data.selectedMajor.name = data.major_name;
              $scope.updateDepartment(data.major_name);
              $scope.data.selectedYear = data.year;
          }
      });

      $scope.data = {
          username: UserService.username,
          email: "",
          majorOptions: [{name: "", department: ""}],
          selectedMajor: {name: "", department: ""},
          YearOptions: ["Freshman", "Sophomore", "Junior", "Senior"],
          selectedYear: "",
          selectedDepartment: ""
      }
      
      $scope.saveProfile = function() {
          UserService.editStudent($scope.data.username,
          $scope.data.selectedMajor, $scope.data.selectedYear)
          .success(function (data) {
              if (data) {
                  $location.path('#/main');
              }
          });
      }

      $scope.updateDepartment = function(major_name) {
          for (major in majorOptions) {
              if (major.major_name === major_name) {
                  $scope.data.selectedDepartment = major.department;
                  return;
              }
          }
      }
}])
