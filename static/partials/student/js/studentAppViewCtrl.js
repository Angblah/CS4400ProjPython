angular.module('myApp').controller('studentAppViewCtrl',
  ['$scope', 'StudentAppViewService', 'UserService',
  function ($scope, StudentAppViewService, UserService) {

    $scope.user = function() {
      return UserService.getUser();
    }

    $scope.populate = function() {
      var user = $scope.user();
      StudentAppViewService.getStudentApplications()
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

    $scope.populate();

    $scope.parseApplications = function(data) {
      var results = [];
      console.log(data);
      // for (proj in data) {
      //   var name = data[proj][0];
      //   var major = data[proj][1];
      //   if (major == undefined) {major = 'Undecided';}
      //   var year = data[proj][2];
      //   if (year == 1) {year = 'Freshman';}
      //   else if (year == 2) {year = 'Sophomore';}
      //   else if (year == 3) {year = 'Junior';}
      //   else {year = 'Senior'}
      //   var status = data[proj][3];
      //   if (status == 0) {status = 'pending';}
      //   else if (status == -1) {status = 'denied';}
      //   else {status = 'accepted';}
      //   var username = data[proj][4];
      //   results.push({'name' : name,
      //                 'major': major,
      //                 'year': year,
      //                 'status': status,
      //                 'username':username});
      // }
      return data;
    }

}]);