angular.module('myApp').factory('ViewService',
['$timeout', '$http', function ($timeout, $http) {

    var CourseName = null;
    var ProjName = null;

    function getCourseNum() {
        return CourseName;
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

    function apply(projname, username) {
        return $http.get('/api/StudentApply', {params: {projname:projname, username: username}})
            .success(function(data) {
                return data;
            })
            .error(function(data, status) {
                console.error("Data Load Error", status, data);
            });
    }

    function getProj(projname) {
        return $http.get('/api/GetProject', {params: {projname:projname, username: username}})
            .success(function(data) {
                return data;
            })
            .error(function(data, status) {
                console.error("Data Load Error", status, data);
            });
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
        apply: apply,
        getProj: getProj,
        getProject: getProject,
        getCourse: getCourse
    });
}])
