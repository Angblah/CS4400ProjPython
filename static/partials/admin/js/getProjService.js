angular.module('myApp').factory('GetProjService',
['$timeout', '$http', function ($timeout, $http) {

    function getPopProjects() {
      return $http.get('/api/GetTopTenProjects')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    return ({
        getPopProjects: getPopProjects,
    });
}]);
