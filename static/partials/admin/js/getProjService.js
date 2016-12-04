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

    function getProjectByApps() {
      return $http.get('/api/GetProjectByApps')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    function getNumApps() {
      return $http.get('/api/GetNumApps')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    function getNumAccepted() {
      return $http.get('/api/GetNumAccepted')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    return ({
        getPopProjects: getPopProjects,
        getProjectByApps: getProjectByApps,
        getNumApps: getNumApps,
        getNumAccepted: getNumAccepted
    });
}]);
