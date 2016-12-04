angular.module('myApp').factory('AddCourseService',
['$timeout', '$http', function ($timeout, $http) {

    function addCourse(number, name, instructor, designation, category, students) {
      return $http.post('/api/AddCourse', 
      {number: number, name: name, instructor: instructor, designation:designation, category: category, students: students})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Failed to add course", status, data);
      });
    }

    function getCategory() {
        return $http.get('/api/GetCategory')
        .success(function(data) {
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting categories")
        });
    }

    return ({
        addCourse: addCourse,
        getCategory: getCategory,
    });
}]);