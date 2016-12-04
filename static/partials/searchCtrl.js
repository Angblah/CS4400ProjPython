angular.module('myApp')
 .controller('searchController', ['$scope', '$location', 'SearchService',
 function($scope, $location, SearchService) {
    SearchService.getCategory()
    .success(function(data) {
        $scope.data.categories = data;
    });

    SearchService.getMajor()
    .success(function(data) {
        $scope.data.majors = data;
    });
    // SearchService.getDesignation()
    // .success(function(data) {
    //     $scope.data.designations = data;
    // });
    $scope.query = function() {
        SearchService.query($scope.data.title, $scope.data.category,
            $scope.data.designation, $scope.data.major, $scope.data.year,
            $scope.data.type)
        // .success(function(data) {
            // console.log(data);
            // $scope.data.projects = data;
        // })
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
    projects: [],
    types: ['Project','Course','Both'],
   };
    $scope.names = ['pizza', 'unicorns', 'robots'];
       $scope.my = { favorite: 'unicorns' };

}]);