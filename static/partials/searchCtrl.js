angular.module('myApp')
 .controller('searchController', ['$scope', '$location', 'SearchService',
 function($scope, $location, SearchService) {
    SearchService.getCategory()
    .success(function(data) {
        $scope.data.categories = data;
    });

    SearchService.getMajor()
    .success(function(data) {
        for (x in data['majors']) {
            $scope.data.majors.push(data['majors'][x]['Major_Name']);
        }
    });
    // SearchService.getDesignation()
    // .success(function(data) {
    //     $scope.data.designations = data;
    // });
    $scope.query = function() {
        SearchService.query($scope.data.title, $scope.data.category,
            $scope.data.designation, $scope.data.major, $scope.data.year,
            $scope.data.type)
        .success(function(data) {
            $scope.data.projects = $scope.parseQuery(data);
        })
    }

    $scope.selectRow = function(application) {
      if (application.type == 'Project') {
        console.log(application.name);
        // $location.path('/viewproj');
      } else {
        console.log(application.name);
        // $location.path('/viewcourse');
      }
    }

    $scope.parseQuery = function(data) {
      var results = [];
      console.log(data);
      for (n in data) {
        var name = data[n]['proj'][0];
        var designation = data[n]['proj'][1];
        var category = data[n]['proj'][2];
        var requirements = data[n]['proj'][4];
        var type = data[n]['type'];
        results.push(
          {'name' : name,
          'designation': designation,
          'category': category,
          'requirements': requirements,
          'type': type});
      }
      return results;
    }

    $scope.data = {
    title: null,
    category: null,
    designation: null,
    major: null,
    year: null,
    type: 'Both',
    categories: [],
    designations: [["Community"],["Sustainable Communities"]],
    majors: [],
    projects: [
    ],
    types: ['Project','Course','Both'],
   };
    $scope.names = ['pizza', 'unicorns', 'robots'];
       $scope.my = { favorite: 'unicorns' };

}]);
