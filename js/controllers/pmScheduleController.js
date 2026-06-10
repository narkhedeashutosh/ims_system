(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('PmScheduleController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.schedule = DataService.getPmSchedule();
      $scope.modal = { open: false, item: null };

      $scope.getBadgeClass = function (status) {
        return status === 'Due Soon' ? 'badge-in-use' : 'badge-scheduled';
      };

      $scope.viewItem = function (item) {
        $scope.modal.item = item;
        $scope.modal.open = true;
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
        $scope.modal.item = null;
      };
    }]);
})();
