angular.module('myApp').factory('AddCourseService',
['$timeout', '$http', function ($timeout, $http) {

    function loadData() {
      return $http.get('/api/AddCourse')
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Data Load Error", status, data);
      });
    }

    return ({
        loadData: loadData,
    });
}]);