angular.module('myApp').factory('SearchService',
['$timeout', '$http', function ($timeout, $http) {

    var user = null;

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
            console.log(data);
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
    function query(title, category, designation, major, year1, type) {
        switch (year1) {
            case 'Freshman':
                year = 1;
                break;
            case 'Sophomore':
                year = 2;
                break;
            case 'Junior':
                year = 3;
                break;
            case 'Senior':
                year = 4;
                break;    
        }

        console.log([title, category, designation, major, year, type]);
        
        if (type === 'Project') {
            console.log('getting projects...')
            return $http.get('/api/QueryProject', {title:title,
                category:category, designation:designation, major:major,
                 year:year})
            .success(function(data) {
                console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting projects")
        });
        } else if (type === 'Course') {
            return $http.get('/api/QueryCourse')
            .success(function(data) {
            // console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting categories")
        });
        } else {
            return $http.get('/api/QueryBoth')
            .success(function(data) {
            // console.log(data);
            return data;
        })
        .error(function(data, status) {
            console.error("Error getting categories and projects")
        });
        }
    }
    return ({
        getCategory: getCategory,
        getDesignation: getDesignation,
        getMajor: getMajor,
        query: query
    });
}]);