angular.module('myApp')
 .controller('searchController', ['$scope', '$location', 'SearchService',
 function($scope, $location, SearchService) {
   $scope.data = {
    model: null,
    categories: [
         {value: 'bob', name: 'bob'},
         {value: 'coding for good', name: 'idk'},
         {value: 'abob', name: 'bodb'},
         {value: 'cdscoding for good', name: 'iadk'},
         {value: 'sbob', name: 'bossb'},
         {value: 'dcoding for good', name: 'dsidk'},
    ],
    designations: [
    	{value: 'bob', name: 'bob'},
        {value: 'coding for good', name: 'idk'},
    ],
    majors: [
    	{value: 'asdfbob', name: 'bofdsab'},
        {value: 'asdfcoding for goodf', name: 'idasdk'},
    ],

   };
}]);