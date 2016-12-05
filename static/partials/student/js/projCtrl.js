angular.module('myApp').controller('projectController',
  ['$scope', '$location', 'ViewService',
  function ($scope, $location, ViewService) {

      console.log(ViewService.getProjName());
      ViewService.getProject(ViewService.getProjName())
      .success(function(data) {
          if(data) {

          }
      });

      $scope.back = function() {
          ViewService.clearView();
          $location.path('/main');
          $location
      }

      $scope.data = {
          proj_name: '',
          advisor: '',
          advisor_email: '',
          description: '',
          category: '',
          designation: '',
          est_num: '',
          dept_req: '',
          major_req: '',
          year_req: ''
      }
}])
