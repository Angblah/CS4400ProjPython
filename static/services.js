angular.module('myApp').factory('UserService',
['$timeout', '$http', function ($timeout, $http) {

    var user = null;
    var isLoggedIn = false;

    function authenticate(username, password) {
        //http://twisted.readthedocs.io/en/twisted-16.2.0/core/howto/defer-intro.html
        //See above on deffereds for async code

        //Post request to server
        return $http.post('/api/AuthenticateUser', {username: username, password: password})
        .success(function(data) {
            user = data.username;
            isLoggedIn = true;
            return data;
        })
        .error(function(data, status) {
            console.error("Authenticate User Error", status, data);
        });
    }

    function register(username, email, password) {
      //Post request to server (api.py)
      return $http.post('/api/Student', {username: username, email: email, password: password})
      .success(function(data) {
          return data;
      })
      .error(function(data, status) {
          console.error("Register User Error", status, data);
      });
    }

    function getStudent(username) {
        return $http.get('/api/Student', {username: username})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Get Student Error", status, data);
        });
    }

    function updateStudent(username, major_name, year) {
        return $http.put('/api/Student', {username: username, major_name: major_name, year: year})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Update Student Error", status, data);
        });
    }


    return ({
        authenticate: authenticate,
        register: register,
        user: user,
        isLoggedIn: isLoggedIn,
        getStudent: getStudent,
        updateStudent: updateStudent
    });
}]);

