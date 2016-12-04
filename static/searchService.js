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
        return $http.get('/api/GetCategory')
        .success(function(data) {
            // console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting categories")
        });
    }

    function getDesignation() {
        return $http.get('/api/GetDesignation')
        .success(function(data) {
            // console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting designations")
        });
    }
    function getMajor() {
        return $http.get('/api/GetMajor')
        .success(function(data) {
            // console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting majors")
        });
    }
    function query(title, category, designation, major, year) {
        console.log(title);
        console.log(category);
        console.log(designation);
        console.log(major);
        console.log(year);
    }
    return ({
        getCategory: getCategory,
        getDesignation: getDesignation,
        getMajor: getMajor,
        query: query
    });
}]);