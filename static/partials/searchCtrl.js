angular.module('myApp')
 .controller('searchController', ['$scope', function($scope) {
   $scope.data = {
    model: null,
    availableOptions: [
         {value: 'myString', name: 'string'},
         {value: 1, name: 'integer'},
         {value: true, name: 'boolean'},
         {value: null, name: 'null'},
         {value: {prop: 'value'}, name: 'object'},
         {value: ['a'], name: 'array'}
    ]
   };
}]);