(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('FacilitiesController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.facilities = DataService.getFacilities();

      $scope.getStatusClass = function (status) {
        var map = {
          'Occupied': 'occupied',
          'On Location': 'on-location',
          'Available Space': 'available-space'
        };
        return 'badge-' + (map[status] || 'available');
      };
    }]);
})();
