angular.module('myApp').controller('addCourseCtrl',
  ['$scope', '$location', 'UserService', 'AddCourseService',
  function ($scope, $location, UserService, AddCourseService) {

    // Place to put out queried categories and designations
    $scope.data = {
      categories: [],
      designations: [["Community"],["Sustainable Communities"]],
    };

    $scope.courseform = {
      name: "",
      number: "",
      instructor: "",
      designation: "",
      categories: "",
      students: "",
    };

    AddCourseService.getCategory()
      .success(function(data) {
        $scope.data.categories = data;
    });

    $scope.submit = function() {
      var designation = $scope.fetchDesignation();
      var categories = $scope.fetchCategories();
      if($scope.validate($scope.courseform.name, $scope.courseform.number, $scope.courseform.instructor, categories, designation[0], $scope.courseform.students)) {
        $scope.filled = true;
      }
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AddCourseService.addCourse($scope.courseform.number, $scope.courseform.name, $scope.courseform.instructor, designation[0], categories, $scope.courseform.students)
          .success(function (data) {
            if ($scope.filled) {
              $scope.disabled = false;
              $location.path('/addcourse');
              $scope.courseform = {};
            } else {
              $scope.error = true;
              $scope.errorMessage = "Unable to add course, please fill ALL fields";
              $scope.disabled = false;
              $scope.courseform = {};
            }
      });

    };

    $scope.fetchCategories = function () {
      $scope.chosenCat = ""
      var add = 0
      for (i = 0; i < cform.category.options.length; i++) {
        if (cform.category.options[i].selected) {
          if (i == (cform.category.options.length - 1) || add == 0) {
            $scope.chosenCat += cform.category.options[i].value;
          } else {
            $scope.chosenCat = $scope.chosenCat + "," + cform.category.options[i].value;
          }
          add++;
        }
      }
      return $scope.chosenCat;
    };

    $scope.fetchDesignation = function () {
      $scope.chosenDes = []
      var index = 0;
      for (i = 0; i < cform.designations.options.length; i++) {
        if (cform.designations.options[i].selected) {
          $scope.chosenDes[index] = cform.designations.options[i].value;
          index++;
        }
      }
      return $scope.chosenDes;
    };

    $scope.validate = function (name, number, instruct, cats, des, student) {
      $scope.nameCheck = false;
      $scope.numCheck = false;
      $scope.instructorCheck = false;
      $scope.designationCheck = false;
      $scope.categoryCheck  = false;
      $scope.studentCheck = false;

      if (number != "") {
        $scope.numCheck = true;
      }
      if (name != "") {
        $scope.nameCheck = true;
      }
      if (instruct != "") {
        $scope.instructorCheck = true;
      }
      if (des != "? string: ?") {
        $scope.designationCheck = true;
      }
      if (cats != "") {
        $scope.categoryCheck = true;
      }
      if (student != "") {
        $scope.studentCheck = true;
      }
      if ($scope.numCheck && $scope.studentCheck && $scope.categoryCheck 
      && $scope.designationCheck && $scope.instructorCheck && $scope.nameCheck) {
        return true;
      }
      return false;
    };  
}])