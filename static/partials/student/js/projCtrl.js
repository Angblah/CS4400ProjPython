angular.module('myApp').controller('projectController',
  ['$scope', '$location', 'UserService',
  function ($scope, $location, UserService) {
      

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
      
     
}])
