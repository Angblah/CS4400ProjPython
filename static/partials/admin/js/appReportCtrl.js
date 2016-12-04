angular.module('myApp').controller('appReportController',
  ['$scope', 'GetProjService',
  function ($scope, GetProjService) {

    GetProjService.getProjectByApps()
      // handle success
      .success(function (data) {
        //$location.path('/main');
        if (data) {
          $scope.disabled = false;
          $scope.projects = $scope.parseProjectByApps(data);
        } else {
          $scope.error = true;
          $scope.projects = [];
          $scope.errorMessage = "Error retrieving projects";
          $scope.disabled = false;
        }
      });

    $scope.parseProjectByApps = function(data) {
      var results = [];
      for (proj in data) {
        var name = data[proj][0];
        var numApps = data[proj][1];
        var percent = data[proj][2];
        percent = percent.slice(0,-3) + '%';
        var majors = data[proj][3];
        results.push(
          {'name' : name,
          'numApplicants': numApps,
          'acceptRate': percent,
          'majors': majors});
      }
      return results;
    }

    GetProjService.getNumApps()
    // handle success
    .success(function (data) {
      //$location.path('/main');
      if (data) {
        $scope.disabled = false;
        $scope.numApps = data[0][0];
      } else {
        $scope.error = true;
        $scope.numApps = 0;
        $scope.errorMessage = "Error retrieving projects";
        $scope.disabled = false;
      }
    });

    GetProjService.getNumAccepted()
    // handle success
    .success(function (data) {
      //$location.path('/main');
      if (data) {
        $scope.disabled = false;
        $scope.numAccepted = data[0][0];
      } else {
        $scope.error = true;
        $scope.numAccepted = 0;
        $scope.errorMessage = "Error retrieving projects";
        $scope.disabled = false;
      }
    });

}]);
