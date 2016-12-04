angular.module('myApp').factory('AddProjService',
['$timeout', '$http', function ($timeout, $http) {

    function addProject(name,description,advisor,students,email,designation,category,major,department,year) {
      return $http.post('/api/AddProject', 
      {name: name, description: description, advisor: advisor, students:students, email: email, designation: designation, category: category, major: major, department: department, year: year})
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

    function getDepartments() {
        return $http.get('/api/GetDepartments')
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
        getDepartments: getDepartments,
    });
}]);