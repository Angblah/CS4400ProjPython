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

    return ({
        getCourseNum: getCourseNum,
        setCourseNum: setCourseNum,
        getProjName: getProjName,
        setProjName: setProjName,
        clearView: clearView,
    });
}]);