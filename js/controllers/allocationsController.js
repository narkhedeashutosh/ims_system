(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('AllocationsController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.allocations = DataService.getAllocations();
      $scope.modal = { open: false, allocation: null };

      $scope.getBadgeClass = function (status) {
        return status === 'Approved' ? 'badge-approved' : 'badge-active';
      };

      $scope.viewAllocation = function (allocation) {
        $scope.modal.allocation = allocation;
        $scope.modal.open = true;
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
        $scope.modal.allocation = null;
      };
    }]);
})();
