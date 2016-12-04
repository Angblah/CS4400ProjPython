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
    
    // SearchService.query(model_title, model_category,
    //     model_designation, model_major, model_year);
    $scope.query = function() {
        SearchService.query($scope.data.model_title, $scope.data.model_category,
            $scope.data.model_designation, $scope.data.model_major, $scope.data.model_year)
    }
    $scope.data = {
    title: null,
    category: null,
    designation: null,
    major: null,
    year: 'YA YA  YA ',
    categories: [],
    designations: [["Community"],["Sustainable Communities"]],
    majors: [],
    projects: []
   };

}]);