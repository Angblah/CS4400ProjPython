angular.module('myApp')
 .controller('searchController', ['$scope', '$location', 'SearchService',
 function($scope, $location, SearchService) {
    SearchService.getCategory()
        .success(function(data) {
            console.log(data);
            $scope.data.categories = data;
    });

    // SearchService.getDesignation()
    // .success(function(data) {
    //     console.log(data);
    //     $scope.data.designations = data;
    // });

    SearchService.getMajor()
    .success(function(data) {
        console.log(data);
        $scope.data.majors = data;
    });

    $scope.data = {
    model: null,
    categories: [],
    designations: [["Community"],["Sustainable Communities"]],
    majors: [],
   };

}]);