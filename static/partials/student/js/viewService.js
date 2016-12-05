angular.module('myApp').factory('ViewService',
['$timeout', '$http', function ($timeout, $http) {

    var CourseNum = null;
    var ProjName = null;

    function getCourseNum() {
        return CourseNum;
    }

    function setCourseNum(num) {
        CourseNum = num;
    }

    function getProjName() {
        return ProjName;
    }

    function setProjName(name) {
        ProjName = name;
    }

    function clearView() {
        CourseNum = null;
        ProjName = null;
    }

    function getProject(proj_Name) {
        return $http.get('/api/Student', {params: {proj_Name: proj_Name}})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Get Project Error", status, data);
        });
    }

    function getCourse(course_num) {
        return $http.get('/api/Student', {params: {course_num: course_num}})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Get Course Error", status, data);
        });
    }

    return ({
        getCourseNum: getCourseNum,
        setCourseNum: setCourseNum,
        getProjName: getProjName,
        setProjName: setProjName,
        clearView: clearView,
    });
}]);