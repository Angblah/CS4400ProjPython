angular.module('myApp').factory('AddProjService',
['$timeout', '$http', function ($timeout, $http) {

    function addProject(number, name, instructor, designation, category, students) {
      return $http.post('/api/AddProject', 
      {name: name, description: description, advisor: advisor, students:students, email: email, designation: designation, category: category, requirement: requirement})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Failed to add project", status, data);
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

    function getMajor() {
        return $http.get('/api/GetMajor')
        .success(function(data) {
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting majors")
        });
    }

    return ({
        addProject: addProject,
        getCategory: getCategory,
        getMajor: getMajor,
    });
}]);