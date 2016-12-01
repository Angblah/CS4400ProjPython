angular.module('myApp').controller('searchController',
	['$scope', '$location', 'SearchService',
	function ($scope, $location, SearchService) {
		
		$scope.data = {
			availableCategories: [
				{id: '1', name: 'asdf'},
				{id: '2', name: 'bsdf'}
			]
		};
}]);
