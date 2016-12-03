angular.module('myApp').controller('addCourseCtrl',
  ['$scope', '$location', 'UserService', 'AddCourseService',
  function ($scope, $location, UserService, AddCourseService) {
    var des = '';
    var major = '';

      AddCourseService.loadData()
          .success(function (data) {
            if (data.designation && data.major && data.department && data.category) {
              des = data.designation;
              major = data.major
              $scope.disabled = false;
              $location.path('/addcourse');
              $scope.courseform = {};
            } else {
              $scope.error = true;
              $scope.errorMessage = "Unable to fetch Data";
              $scope.disabled = false;
              $scope.courseform = {};
            }
          });
}])