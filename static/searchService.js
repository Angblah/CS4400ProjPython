angular.module('myApp').factory('SearchService',
['$timeout', '$http', function ($timeout, $http) {

    var user = null;
    
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
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting categories")
        });
    }

    return ({
        getCategory: getCategory
    });
}]);