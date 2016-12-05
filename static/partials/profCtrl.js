angular.module('myApp').controller('profileController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
      UserService.getMajors()
      .success(function(data) {
          if (data) {
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
                  $scope.data.userMajor.Major_Name = data.major_name;
                  $scope.updateDepartment(data.major_name);
                  $scope.findSelectedMajor($scope.data.userMajor);
              } else {
                  $scope.data.selectedMajor.Major_Name = "Undecided"
                  $scope.data.userMajor.Major_Name = "Undecided"
                  $scope.data.selectedDepartment = "None"
              }
              if (data.year) {
                  $scope.data.selectedYear = data.year;
              } else {
                  $scope.data.selectedYear = "None";
              }
              
              console.log($scope.data);
          }
      });

      $scope.data = {
          username: UserService.getUser(),
          email: "",
          majorOptions: [{Major_Name: "", Dept_Name: ""}],
          selectedMajor: {Major_Name: "", Dept_Name: ""},
          userMajor: {Major_Name: "", Dept_Name: ""},
          yearOptions: ["Freshman", "Sophomore", "Junior", "Senior"],
          selectedYear: "",
          selectedDepartment: ""
      }
      
      $scope.saveProfile = function() {
          var major_name = ''
          if ($scope.data.selectedMajor.Major_Name !== 'Undecided') {
              major_name = $scope.data.selectedMajor.Major_Name;
          }
          UserService.updateStudent($scope.data.username,
          major_name, $scope.data.selectedYear)
          .success(function (data) {
              if (data) {
                  console.log(data);
                  $location.path('/profile');
                  $location
              } else {
                  console.log("Success but issues");
              }
          });
      }

      $scope.findSelectedMajor = function(userMajor) {
          angular.forEach($scope.data.majorOptions, function(major){
              if(angular.equals(userMajor, major)){
                  $scope.data.selectedMajor = major;
              }
          });
      }

      $scope.updateDepartment = function(major_name) {
          var majorOptions = $scope.data.majorOptions;
          for (major in majorOptions) {
              if (majorOptions[major].Major_Name === major_name) {
                  $scope.data.selectedDepartment = majorOptions[major].Dept_Name;
                  $scope.data.userMajor.Dept_Name = majorOptions[major].Dept_Name;
                  return;
              }
          }
      }
}])
