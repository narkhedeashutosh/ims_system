(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('MovementsController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.movements = DataService.getMovements();
      $scope.filtered = $scope.movements;
      $scope.statusFilter = '';
      $scope.locations = DataService.getMovementLocations();
      $scope.assets = DataService.getAssets();
      $scope.statuses = ['Out', 'At Service', 'Returned'];

      $scope.modal = { open: false, mode: 'view', movement: null, form: {} };

      function emptyForm() {
        return {
          assetId: $scope.assets.length ? $scope.assets[0].id : '',
          from: 'Warehouse',
          to: 'Studio A',
          requestedBy: '',
          approvedBy: ''
        };
      }

      function findAsset(assetId) {
        for (var i = 0; i < $scope.assets.length; i++) {
          if ($scope.assets[i].id === assetId) return $scope.assets[i];
        }
        return null;
      }

      function nextMovementId() {
        var max = 0;
        $scope.movements.forEach(function (m) {
          var num = parseInt(m.id.replace('MV-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'MV-' + String(max + 1).padStart(3, '0');
      }

      function nowDispatched() {
        var now = new Date();
        return now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
          ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
      }

      $scope.filter = function () {
        $scope.filtered = $scope.movements.filter(function (m) {
          return !$scope.statusFilter || m.status === $scope.statusFilter;
        });
      };

      $scope.getBadgeClass = function (status) {
        var map = { Out: 'in-use', 'At Service': 'under-repair', Returned: 'allocated' };
        return 'badge-' + (map[status] || status.toLowerCase());
      };

      $scope.viewMovement = function (movement) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.movement = movement;
      };

      $scope.openNewTransfer = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'new';
        $scope.modal.movement = null;
        $scope.modal.form = emptyForm();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canLogMovement = function () {
        var f = $scope.modal.form;
        return f.assetId && f.from && f.to && f.from !== f.to &&
          f.requestedBy && f.requestedBy.trim() &&
          f.approvedBy && f.approvedBy.trim();
      };

      $scope.logMovement = function () {
        if (!$scope.canLogMovement()) return;
        var f = $scope.modal.form;
        var asset = findAsset(f.assetId);
        var movement = {
          id: nextMovementId(),
          asset: asset ? asset.name : f.assetId,
          assetId: f.assetId,
          from: f.from,
          to: f.to,
          requestedBy: f.requestedBy.trim(),
          approvedBy: f.approvedBy.trim(),
          dispatched: nowDispatched(),
          returned: '',
          status: 'Out'
        };
        $scope.movements.unshift(movement);
        $scope.filter();
        $scope.closeModal();
      };

      $scope.returnMovement = function (movement) {
        if (movement.status !== 'Out') return;
        movement.status = 'Returned';
        movement.returned = nowDispatched();
        movement.to = movement.from;
        $scope.filter();
      };
    }]);
})();
