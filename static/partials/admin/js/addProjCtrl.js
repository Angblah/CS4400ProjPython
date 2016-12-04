angular.module('myApp').controller('addProjCtrl',
  ['$scope', '$location', 'UserService', 'AddProjService',
  function ($scope, $location, UserService, AddProjService) {

    $scope.data = {
      years: [["Freshman"],["Sophomore"],["Junior"],["Senior"]],
      majors: [],
      categories: [],
      departments: [],
      designations: [["Community"],["Sustainable Communities"]],
    };

    $scope.projform = {
      name: "",
      description: "",
      advisor: "",
      email: "",
      year: "",
      departments: "",
      category: "",
      students: "",
      designation: "",
      major: "",
    }; 

    AddProjService.getCategory()
      .success(function(data) {
        $scope.data.categories = data;
    }); 

    AddProjService.getMajor()
      .success(function(data) {
        var majI = 0;
        for (i = 0; i < data.majors.length; i++) {
          $scope.data.majors[majI] = [data.majors[i]["Major_Name"]];
          majI++;
        }
    });  

    AddProjService.getDepartments()
      .success(function(data) {
        $scope.data.departments = data;
      });        

    $scope.fetchCategories = function () {
      $scope.chosenCat = ""
      var add = 0
      for (i = 0; i < addproj.category.options.length; i++) {
        if (addproj.category.options[i].selected) {
          if (i == (addproj.category.options.length - 1) || add == 0) {
            $scope.chosenCat += addproj.category.options[i].value;
          } else {
            $scope.chosenCat = $scope.chosenCat + "," + addproj.category.options[i].value;
          }
          add++;
        }
      }
      return $scope.chosenCat;
    };

    $scope.fetchDesignation = function () {
      $scope.chosenDes = []
      var index = 0;
      for (i = 0; i < addproj.designation.options.length; i++) {
        if (addproj.designation.options[i].selected) {
          $scope.chosenDes[index] = addproj.designation.options[i].value;
          index++;
        }
      }
      return $scope.chosenDes[0];
    };

    $scope.fetchDept= function () {
      $scope.chosenDept = []
      var index = 0;
      for (i = 0; i < addproj.departments.options.length; i++) {
        if (addproj.departments.options[i].selected) {
          $scope.chosenDept[index] = addproj.departments.options[i].value;
          index++;
        }
      }
      return $scope.chosenDept[0];
    };

    $scope.fetchYear= function () {
      $scope.chosenYear = []
      var index = 0;
      for (i = 0; i < addproj.year.options.length; i++) {
        if (addproj.year.options[i].selected) {
          $scope.chosenYear[index] = addproj.year.options[i].value;
          index++;
        }
      }
      return $scope.chosenYear[0];
    };

    $scope.fetchMajor= function () {
      $scope.chosenMajor = []
      var index = 0;
      for (i = 0; i < addproj.major.options.length; i++) {
        if (addproj.major.options[i].selected) {
          $scope.chosenMajor[index] = addproj.major.options[i].value;
          index++;
        }
      }
      return $scope.chosenMajor[0];
    };    

    $scope.add = function() {
      var designation = $scope.fetchDesignation();
      var categories = $scope.fetchCategories();
      var year = $scope.fetchYear();
      var major = $scope.fetchMajor();
      var dept = $scope.fetchDept();
      $scope.filled = false;
      if($scope.validate($scope.projform.name, $scope.projform.description, $scope.projform.advisor, $scope.projform.email, categories, $scope.projform.students, designation)) {
        $scope.filled = true;
      }
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      AddProjService.addProject($scope.projform.name, $scope.projform.description, $scope.projform.advisor, $scope.projform.students, $scope.projform.email, designation, categories, major, dept, year)
          .success(function (data) {
            if ($scope.filled) {
              $scope.disabled = false;
              $scope.projform = {};
            } else {
              $scope.error = true;
              $scope.errorMessage = "Unable to add project. Be sure to fill ALL fields. Department, Year, and Major are optional.\n Or the Project name already exists";
              $scope.disabled = false;
              $scope.projform = {};
            }
      });
    };

    $scope.validate = function (name, description, ad, email, cat, students, designation) {
      $scope.nameCheck = false;
      $scope.descriptionCheck = false;
      $scope.adCheck = false;
      $scope.emailCheck = false;
      $scope.catCheck = false;
      $scope.studentsCheck = false;
      $scope.desCheck  = false;

      if (name != "") {
        $scope.nameCheck = true;
      }
      if (description != "") {
        $scope.descriptionCheck = true;
      }
      if (ad != "") {
        $scope.adCheck = true;
      }
      if (email != "") {
        $scope.emailCheck = true;
      }
      if (cat != "") {
        $scope.catCheck = true;
      }
      if (students != "") {
        $scope.studentsCheck = true;
      }
      if (designation != "? string: ?") {
        $scope.desCheck = true;
      }

      if ($scope.nameCheck && $scope.descriptionCheck && $scope.emailCheck 
      && $scope.desCheck && $scope.adCheck && $scope.studentsCheck
      && $scope.catCheck) {
        return true;
      }
      return false;
    }; 

}]);