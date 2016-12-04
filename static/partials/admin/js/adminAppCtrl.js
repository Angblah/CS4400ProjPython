angular.module('myApp').controller('adminAppController',
  ['$scope', 'GetProjService',
  function ($scope, GetProjService) {

    $scope.selectRow = function(application) {
      $scope.selectedApplication = application;
    }

    $scope.accept = function() {
      if (!$scope.selectedApplication || $scope.selectedApplication.status !='pending') {
        return;
      }
      GetProjService.acceptApplication($scope.selectedApplication.name,$scope.selectedApplication.username)
        .success(function (data) {
          if (data) {
            $scope.disabled = false;
          } else {
            $scope.error = true;
            $scope.errorMessage = "Error retrieving projects";
            $scope.disabled = false;
          }
        });
        GetProjService.getAdminApplications()
          // handle success
          .success(function (data) {
            //$location.path('/main');
            if (data) {
              $scope.disabled = false;
              $scope.projects = $scope.parseAdminApplications(data);
            } else {
              $scope.error = true;
              $scope.projects = [];
              $scope.errorMessage = "Error retrieving projects";
              $scope.disabled = false;
            }
          });
    }

    $scope.reject = function() {
      if (!$scope.selectedApplication || $scope.selectedApplication.status !='pending') {
        return;
      }
      GetProjService.rejectApplication($scope.selectedApplication.name,$scope.selectedApplication.username)
        .success(function (data) {
          if (data) {
            $scope.disabled = false;
          } else {
            $scope.error = true;
            $scope.errorMessage = "Error retrieving projects";
            $scope.disabled = false;
          }
        });
        GetProjService.getAdminApplications()
          // handle success
          .success(function (data) {
            //$location.path('/main');
            if (data) {
              $scope.disabled = false;
              $scope.projects = $scope.parseAdminApplications(data);
            } else {
              $scope.error = true;
              $scope.projects = [];
              $scope.errorMessage = "Error retrieving projects";
              $scope.disabled = false;
            }
          });
    }

    GetProjService.getAdminApplications()
      // handle success
      .success(function (data) {
        //$location.path('/main');
        if (data) {
          $scope.disabled = false;
          $scope.projects = $scope.parseAdminApplications(data);
        } else {
          $scope.error = true;
          $scope.projects = [];
          $scope.errorMessage = "Error retrieving projects";
          $scope.disabled = false;
        }
      });

    $scope.parseAdminApplications = function(data) {
      var results = [];
      for (proj in data) {
        var name = data[proj][0];
        var major = data[proj][1];
        if (major == undefined) {major = 'Undecided';}
        var year = data[proj][2];
        if (year == 1) {year = 'Freshman';}
        else if (year == 2) {year = 'Sophomore';}
        else if (year == 3) {year = 'Junior';}
        else {year = 'Senior'}
        var status = data[proj][3];
        if (status == 0) {status = 'pending';}
        else if (status == -1) {status = 'denied';}
        else {status = 'accepted';}
        var username = data[proj][4];
        results.push({'name' : name,
                      'major': major,
                      'year': year,
                      'status': status,
                      'username':username});
      }
      return results;
    }

}]);
