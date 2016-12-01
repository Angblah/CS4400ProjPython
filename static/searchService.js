angular.module('myApp').factory('SearchService',
['$timeout', '$http', function ($timeout, $http) {

    var user = null;
    
    function authenticate(username, password) {
        //http://twisted.readthedocs.io/en/twisted-16.2.0/core/howto/defer-intro.html
        //See above on deffereds for async code

        //Post request to server
        return $http.post('/api/AuthenticateUser', {username: username, password: password})
        .success(function(data) {
            return data;
        })
        .error(function(data, status) {
            console.error("Authenticate User Error", status, data);
        });
    }

    // function search(title, category, desgination, major, year, type) {
    //     return $http.search('/api/SearchProjects', {title: title, category: category,
    //         designation: designation, major: major, year: year, type: type})
    //     .success(function(data)) {
    //         return data;
    //     })
    //     .error(function(data, status) {
    //         console.log("Search Error: ", status, data);
    //     });
    // }

    function getCategory() {
        return $http.getCategory('/api/SearchProjects')
        .success(function(data) {
            return data
        })
        .error(function(data, status) {
            console.error("Error getting categories")
        });
    }

    return ({
        categories: getCategory
    });
}]);