angular.module('myApp').factory('GetProjService',
['$timeout', '$http', function ($timeout, $http) {

  function acceptApplication(projname, username) {
      return $http.post('/api/AcceptApplication', {projname: projname, username:username})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Error Accepting Application", status, data);
      });
  }

  function rejectApplication(projname, username) {
      return $http.post('/api/RejectApplication', {projname: projname, username:username})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Error Rejecting Application", status, data);
      });
  }

    function getAdminApplications() {
      return $http.get('/api/GetAdminApplications')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

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
        getAdminApplications: getAdminApplications,
        getPopProjects: getPopProjects,
        getProjectByApps: getProjectByApps,
        getNumApps: getNumApps,
        getNumAccepted: getNumAccepted,
        acceptApplication: acceptApplication,
        rejectApplication: rejectApplication
    });
}]);
