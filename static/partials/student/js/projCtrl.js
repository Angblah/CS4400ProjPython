angular.module('myApp').controller('projectController',
  ['$scope', '$location', 'ViewService',
  function ($scope, $location, ViewService) {
      
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

      $scope.back = function() {
          ViewService.clearView();
          $location.path('/main');
          $location
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
