angular.module('myApp').factory('StudentAppViewService',
['$timeout', '$http', 'UserService', function ($timeout, $http, $UserService) {

    function getStudentApplications(username) {
      return $http.get('/api/GetStudentApplications', {params: {username: username}})
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