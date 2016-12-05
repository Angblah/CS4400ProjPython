angular.module('myApp').controller('courseController',
  ['$scope', '$location', 'ViewService',
  function ($scope, $location, ViewService) {
      

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
