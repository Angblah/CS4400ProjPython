angular.module('myApp').controller('projReportController',
  ['$scope',
  function ($scope) {

    //get top 10 projects sorted by num applications
    $scope.projects = [
      { 'name':'Excel Current Events',
        'numApplicants': '35',
      }
    ];

}]);
