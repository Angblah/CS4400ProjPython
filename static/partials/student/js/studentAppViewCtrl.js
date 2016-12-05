angular.module('myApp').controller('studentAppViewCtrl',
  ['$scope', 'StudentAppViewService', 'UserService',
  function ($scope, StudentAppViewService, UserService) {

      // Get Student for profile
      UserService.getStudent(UserService.getUser())
      // handle success
      .success(function(data) {
          //$location.path('/main');
          if (data) {
            $scope.populate(data['username']);
          }
      });

    $scope.populate = function(user) {
      StudentAppViewService.getStudentApplications(user)
      .success(function (data) {
        if (data) {
          $scope.disabled = false;
          $scope.projects = $scope.parseApplications(data);
        } else {
          $scope.error = true;
          $scope.projects = [];
          $scope.errorMessage = "Error retrieving projects";
          $scope.disabled = false;
        }
      });
    }

    $scope.parseApplications = function(data) {
      var results = [];
      for (i = 0; i < data.apps.length; i++) {
        var proj = data.apps[i]
        var name = proj[1];
        var date = proj[2];
        var status = proj[3];
        if (status == 0) {
          status = 'pending';
        } else if (status == -1) {
          status = 'denied';
        } else {
          status = 'accepted';
        }

        results.push({'name' : name,
                      'date': date,
                      'status': status});
      }
      return results;
    }

}]);