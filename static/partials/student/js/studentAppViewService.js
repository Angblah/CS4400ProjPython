angular.module('myApp').factory('StudentAppViewService',
['$timeout', '$http', 'UserService', function ($timeout, $http, $UserService) {

    function getStudentApplications() {
        username = $UserService.getUser();
        console.log(username);
      return $http.get('/api/GetStudentApplications', {username: "bburns"})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    return ({
        getStudentApplications: getStudentApplications,
    });
}]);