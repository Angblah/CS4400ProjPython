angular.module('myApp').controller('projectController',
  ['$scope', '$location', 'ViewService', 'UserService',
  function ($scope, $location, ViewService, UserService) {

      $scope.data = {
          username: UserService.getUser(),
          userMajor: {Major_Name: "", Dept_Name: ""},
          course: ViewService.getCourse(),
          project: ViewService.getProjName(),
          canApply: false
      }

      // Get Student for profile
      UserService.getStudent(username)
      // handle success
      .success(function(data) {
          //$location.path('/main');
          if (data) {
            $scope.data.userMajor['Major_Name'] = data['Major_Name'];
            $scope.data.userMajor['Dept_Name'] = data['Dept_Name'];
            $scope.data.canApply = $scope.validate();
          }
      });

      $scope.apply = function() {
          if ($scope.data.canApply) {
         ViewService.apply($scope.data.username, $scope.data.project)
        .success(function (data) {
            if (data) {
                $scope.disabled = false;
                $scope.projects = $scope.validate(data);
            } else {
                $scope.error = true;
                $scope.projects = [];
                $scope.errorMessage = "Error retrieving project";
                $scope.disabled = false;
            }
        }); 
      }
      }

      $scope.getProj = function(proj) {
        ViewService.getProj(proj)
        .success(function (data) {
            if (data) {
                $scope.disabled = false;
                $scope.projects = $scope.validate(data);
            } else {
                $scope.error = true;
                $scope.projects = [];
                $scope.errorMessage = "Error retrieving project";
                $scope.disabled = false;
            }
        });          
      };
      
     
}]);
