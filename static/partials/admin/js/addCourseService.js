angular.module('myApp').factory('AddCourseService',
['$timeout', '$http', function ($timeout, $http) {

    function loadDesignation() {
      return $http.getDesignation('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Designation Load Error", status, data);
      });
    }
    
    function loadDesignation() {
      return $http.getDesignation('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Designation Load Error", status, data);
      });
    }

    function loadCategory() {
      return $http.getCategory('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Category Load Error", status, data);
      });
    }

    function loadMajor() {
      return $http.getMajors('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Major Load Error", status, data);
      });
    }

    function loadDepts() {
      return $http.getDepts('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Department Load Error", status, data);
      });
    }

    return ({
        loadDesignation: loadDesignation,
        loadMajor: loadMajor,
        loadCategory: loadCategory,
        loadDepts: loadDepts
    });
}]);