angular.module('myApp').controller('appReportController',
  ['$scope',
  function ($scope) {

    //get projects and num applications sorted by acceptance rate
    //should also calculate top 3 majors of applicants
    $scope.projects = [
      { 'name':'Epic Intentions',
        'numApplicants': '25',
        'acceptRate': '25%',
        'majors': 'CS/MATH'
      }
    ];

}]);
