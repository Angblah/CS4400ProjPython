angular.module('myApp').controller('profileController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
      UserService.getMajors()
      .success(function(data) {
          if (data) {
              console.log("getMajors Success");
              $scope.data.majorOptions = data.majors;
          }
      });

      // Get Student for profile
      UserService.getStudent(UserService.getUser())
      // handle success
      .success(function(data) {
          //$location.path('/main');
          if (data) {
              console.log(data);
              $scope.data.email = data.email;
              if (data.major_name) {
                  $scope.data.selectedMajor.Major_Name = data.major_name;
              } else {
                  $scope.data.selectedMajor.Major_Name = "Undecided"
              }
              $scope.updateDepartment(data.major_name);
              //$scope.data.selectedDepartment = data.selectedDepartment;
              $scope.data.selectedYear = data.year;
              console.log($scope.data);
          }
      });

      $scope.data = {
          username: UserService.getUser(),
          email: "",
          majorOptions: [{Major_Name: "", Dept_Name: ""}],
          selectedMajor: {Major_Name: "", Dept_Name: ""},
          YearOptions: ["Freshman", "Sophomore", "Junior", "Senior"],
          selectedYear: "",
          selectedDepartment: ""
      }
      
      $scope.saveProfile = function() {
          UserService.updateStudent($scope.data.username,
          $scope.data.selectedMajor, $scope.data.selectedYear)
          .success(function (data) {
              if (data) {
                  $location.path('#/profile');
              }
          });
      }

      $scope.updateDepartment = function(major_name) {
          var majorOptions = $scope.data.majorOptions;
          for (major in majorOptions) {
              console.log(majorOptions[major].Major_Name);
              if (majorOptions[major].Major_Name === major_name) {
                  console.log(majorOptions[major].Dept_Name);
                  $scope.data.selectedDepartment = majorOptions[major].Dept_Name;
                  console.log($scope.data.selectedDepartment)
                  return;
              }
          }
      }
}])
