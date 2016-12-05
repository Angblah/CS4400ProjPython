angular.module('myApp').controller('projectController',
  ['$scope', '$location', 'ViewService', 'UserService',
  function ($scope, $location, ViewService, UserService) {

      ViewService.getProject(ViewService.getProjName())
      .success(function(data) {
          if(data) {
              /*projData = {"Proj_Name": data[0][0], "Description": data[0][1], "Advisor_Name": data[0][2],
                "Advisor_Email": data[0][3], "Proj_Est_Students": data[0][4], "P_Designation": data[0][5],
                "P_Category": [], "P_Reqs": {}}*/
                $scope.data.proj_name = data.Proj_Name;
                $scope.data.advisor = data.Advisor_Name;
                $scope.data.advisor_email = data.Advisor_Email;
                $scope.data.description = data.Description;
                $scope.data.category = data.P_Category;
                $scope.data.designation = data.P_Designation;
                $scope.data.est_num = data.Proj_Est_Students;
                if (data.P_Reqs.Dept_Restrict) {
                    $scope.data.dept_req = data.P_Reqs.Dept_Restrict;
                }
                if (data.P_Reqs.Maj_Restrict) {
                    $scope.data.dept_req = data.P_Reqs.Maj_Restrict;
                }
                if (data.P_Reqs.Yr_Restrict) {
                    $scope.data.dept_req = data.P_Reqs.Yr_Restrict;
                }
          }
      });

      // Get Student for profile
      UserService.getStudent(UserService.getUser())
      // handle success
      .success(function(data) {
          if (data) {
            $scope.studdata.userMajor['Major_Name'] = data['major_name'];
            $scope.studdata.userMajor['Dept_Name'] = data['department'];
            $scope.studdata.year = data['year'];
            $scope.studdata.canApply = $scope.validate();
          }
      });

      $scope.apply = function() {
          if ($scope.data.canApply) {
            ViewService.apply($scope.data.username, $scope.data.project)
            .success(function (data) {
                if (data) {
                    $location.path('/studentapps');
                } else {
                    $scope.error = true;
                    $scope.errorMessage = "Error Applying for Project";
                }
            }); 
          } else {
            $scope.error = true;
            $scope.errorMessage = "Student does not meet Project requirements";
          }
      }

       $scope.validate = function() {
           console.log($scope.studdata);
           console.log($scope.data);
          if ($scope.data.dept_req !== 'None' && $scope.studdata.userMajor.Dept_Name !== $scope.data.dept_req) {
              return false;
          }
          if ($scope.data.major_req !== 'None' && $scope.studdata.userMajor.Major_Name !== $scope.data.major_req) {
              return false;
          }
          if ($scope.data.year_req !== 'None' && $scope.studdata.year !== $scope.data.year_req) {
              return false;
          }
          return true;
      }

      $scope.back = function() {
          ViewService.clearView();
          $location.path('/main');
          $location
      }

      $scope.studdata = {
          username: UserService.getUser(),
          userMajor: {Major_Name: "", Dept_Name: ""},
          year: "", 
          canApply: false
      }

      $scope.data = {
          proj_name: '',
          advisor: '',
          advisor_email: '',
          description: '',
          category: '',
          designation: '',
          est_num: '',
          dept_req: 'None',
          major_req: 'None',
          year_req: 'None'
      }
}])