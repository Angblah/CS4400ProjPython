angular.module('myApp').factory('ViewService',
['$timeout', '$http', function ($timeout, $http) {

    var CourseName = null;
    var ProjName = null;

    function getCourseName() {
        return CourseName;
    }

    function setCourseName(num) {
        CourseName = num;
    }

    function getProjName() {
        return ProjName;
    }

    function setProjName(name) {
        ProjName = name;
    }

    function clearView() {
        CourseName = null;
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
        return $http.get('/api/AddProject', {params: {proj_Name: proj_Name}})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Get Project Error", status, data);
        });
    }

    function getCourse(course_Name) {
        return $http.get('/api/AddCourse', {params: {course_Name: course_Name}})
        .success(function (data) {
            return data;
        })
        .error(function(data,status) {
            console.error("Get Course Error", status, data);
        });
    }

    return ({
        getCourseName: getCourseName,
        setCourseName: setCourseName,
        getProjName: getProjName,
        setProjName: setProjName,
        clearView: clearView,
        apply: apply,
        getProj: getProj,
        getProject: getProject,
        getCourse: getCourse
    });
}])
