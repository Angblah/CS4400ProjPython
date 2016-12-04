angular.module('myApp').controller('adminAppController',
  ['$scope', 'GetProjService',
  function ($scope, GetProjService) {

    // WHEN REJECTING AN APPLICATION MAKE THE STATUS IN THE DB TABLE '-1'!!!!!!


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
        if (year == 1) {year = 'freshman';}
        else if (year == 2) {year = 'sophomore';}
        else if (year == 3) {year = 'junior';}
        else {year = 'senior'}
        var status = data[proj][3];
        if (status == 0) {status = 'pending';}
        else if (status == -1) {status = 'denied';}
        else {status = 'accepted';}
        results.push({'name' : name,
                      'major': major,
                      'year': year,
                      'status': status});
      }
      return results;
    }

    $scope.temp = [
      {'name':'Excel Current Events',
      'major':'ECE',
      'year':'freshman',
      'status':'pending'}
    ];

}]);
