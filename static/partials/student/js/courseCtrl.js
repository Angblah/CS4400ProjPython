angular.module('myApp').controller('courseController',
  ['$scope', '$location', 'ViewService',
  function ($scope, $location, ViewService) {
    
      ViewService.getCourse(ViewService.getCourseNum())
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
          course_name: '',
          course_num: '',
          instructor: '',
          category: '',
          designation: '',
          est_num: '',
      }
}])
