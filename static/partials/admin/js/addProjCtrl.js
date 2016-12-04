angular.module('myApp').controller('addProjCtrl',
  ['$scope', '$location', 'UserService', 'AddProjService',
  function ($scope, $location, UserService, AddProjService) {

    $scope.data = {
      years: [["Freshman"],["Sophomore"],["Junior"],["Senior"]],
      majors: [],
      categories: [],
      departments: [],
      designations: [["Community"],["Sustainable Communities"]],
    };

    $scope.projform = {
      name: "",
      description: "",
      advisor: "",
      email: "",
      year: "",
      departments: "",
      category: "",
      students: "",
      designation: "",
      majors: "",
    }; 

    AddProjService.getCategory()
      .success(function(data) {
        $scope.data.categories = data;
    }); 

    AddProjService.getMajor()
      .success(function(data) {
        $scope.data.majors = data;
    });     
}]);