angular.module('myApp').controller('addCourseCtrl',
  ['$scope', '$location', 'UserService', 'AddCourseService',
  function ($scope, $location, UserService, AddCourseService) {

    $scope.courseform = {
      name: "",
      number: "",
      instructor: "",
      designation: "",
      students: "",
    };

    $scope.submit = function() {
      if($scope.validate($scope.courseform.name, $scope.courseform.number, $scope.courseform.instructor, $scope.courseform.designation, $scope.courseform.students)) {
        return;
      }
      console.log($scope.courseform.name);
      $scope.error = false;
      $scope.disabled = true;
      // AddCourseService.addCourse()
      //     .success(function (data) {
      //       if (data) {
      //         $scope.disabled = false;
      //         $location.path('/addcourse');
      //         $scope.courseform = {};
      //       } else {
      //         $scope.error = true;
      //         $scope.errorMessage = "Unable to fetch Data";
      //         $scope.disabled = false;
      //         $scope.courseform = {};
      //       }
      // });
    };

    $scope.checkboxCount = function () {
      return document.querySelectorAll('input[type="checkbox]:checked').length;
    };

    $scope.validate = function (name, number, instruct, des, student) {
      $scope.nameCheckFail = false;
      $scope.numCheckFail = false;
      $scope.instructorCheckFail = false;
      $scope.designationCheckFail = false;
      $scope.categoryCheckFail  = false;
      $scope.studentCheckFail = false;

      if (name == "") {
        $scope.nameCheckFail = true;
        return false;
      }
      if (number == "") {
        $scope.numCheckFail = true;
        console.log("no num");
        return false;
      }
      if (instruct == "") {
        $scope.instructorCheckFail = true;
        return false;
      }
      if (des == "") {
        $scope.designationCheckFail = true;
        return false;
      }
      if ($scope.checkboxCount() == 0) {
        $scope.categoryCheckFail = true;
        return false;
      }
      if (student == "") {
        $scope.studentCheckFail = true;
        return false;
      }
    };  
}])