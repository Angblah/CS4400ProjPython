angular.module('myApp').controller('addCourseCtrl',
  ['$scope', '$location', 'UserService', 'AddCourseService',
  function ($scope, $location, UserService, AddCourseService) {
    var des = '';
    var major = '';

      AddCourseService.preload()
          .success(function (data) {
            if (data.designation &&) {
              des = data.designation;
              $scope.disabled = false;
              $location.path('/addcourse');
              $scope.courseform = {};
            } else {
              $scope.error = true;
              $scope.errorMessage = "Unable to fetch Deignations";
              $scope.disabled = false;
              $scope.courseform = {};
            }
          });

      AddCourseService.loadMajor()
        .success(function (data) {
          //$location.path('/main');
          if (data.majors) {
            des = data.majors
            $scope.disabled = false;
            $location.path('/addcourse');
            $scope.courseform = {};
          } else {
            $scope.error = true;
            $scope.errorMessage = "Unable to fetch Major";
            $scope.disabled = false;
            $scope.courseform = {};
          }
      });

}])