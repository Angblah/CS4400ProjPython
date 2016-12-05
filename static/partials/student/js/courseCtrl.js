angular.module('myApp').controller('courseController',
  ['$scope', '$location', 'ViewService',
  function ($scope, $location, ViewService) {
    
      ViewService.getCourse(ViewService.getCourseNum())
      .success(function(data) {
          if(data) {
              /* {"Number": data[0][0], "Course_Name": data[0][1], "Instructor_Name": data[0][2],
                "Course_Est_Students": data[0][3], "C_Designation": data[0][4], "C_Category": course_cat}*/
                $scope.data.course_name = data.Course_Name;
                $scope.data.course_num = data.Number;
                $scope.data.instructor = data.Instructor_Name;
                $scope.data.description = data.Description;
                $scope.data.category = data.C_Category;
                $scope.data.designation = data.C_Designation;
                $scope.data.est_num = data.Course_Est_Students;
          }
      });

      $scope.back = function() {
          ViewService.clearView();
          $location.path('/main');
          $location
      }

      $scope.data = {
          course_name: '',
          course_num: '',
          instructor: '',
          category: '',
          designation: '',
          est_num: '',
      }
}])
