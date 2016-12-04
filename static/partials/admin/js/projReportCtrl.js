angular.module('myApp').controller('projReportController',
  ['$scope', 'GetProjService',
  function ($scope, GetProjService) {

    GetProjService.getPopProjects()
      // handle success
      .success(function (data) {
        //$location.path('/main');
        if (data) {
          $scope.disabled = false;
          $scope.projects = $scope.parsePopProjects(data);
        } else {
          $scope.error = true;
          $scope.projects = [];
          $scope.errorMessage = "Error retrieving projects";
          $scope.disabled = false;
        }
      });

    $scope.parsePopProjects = function(data) {
      var results = [];
      for (proj in data) {
        var name = data[proj][0];
        var numApps = data[proj][1];
        results.push({'name' : name, 'numApplicants': numApps});
      }
      return results;
    }

}]);
