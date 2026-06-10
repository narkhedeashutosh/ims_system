(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('PurchaseRequestsController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.requests = DataService.getPurchaseRequests();
      $scope.vendors = DataService.getVendors();
      $scope.modal = { open: false, mode: 'view', request: null, form: {} };

      function emptyForm() {
        return {
          item: '',
          qty: '',
          cost: '',
          vendor: $scope.vendors.length ? $scope.vendors[0].name : '',
          requestedBy: ''
        };
      }

      function nextRequestId() {
        var max = 0;
        $scope.requests.forEach(function (r) {
          var parts = r.id.split('-');
          var num = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'PR-2025-' + String(max + 1).padStart(3, '0');
      }

      function todayStr() {
        return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

      $scope.getBadgeClass = function (status) {
        var map = { Approved: 'approved', Pending: 'pending', Rejected: 'rejected' };
        return 'badge-' + (map[status] || status.toLowerCase());
      };

      $scope.formatCost = function (c) {
        return '₹' + Number(c).toLocaleString('en-IN');
      };

      $scope.viewRequest = function (request) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.request = request;
      };

      $scope.openNewRequest = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'new';
        $scope.modal.request = null;
        $scope.modal.form = emptyForm();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canSubmitRequest = function () {
        var f = $scope.modal.form;
        var qty = Number(f.qty);
        var cost = Number(f.cost);
        return f.item && f.item.trim() &&
          !isNaN(qty) && qty > 0 &&
          !isNaN(cost) && cost > 0 &&
          f.vendor && f.requestedBy && f.requestedBy.trim();
      };

      $scope.submitRequest = function () {
        if (!$scope.canSubmitRequest()) return;
        var f = $scope.modal.form;
        var request = {
          id: nextRequestId(),
          item: f.item.trim(),
          qty: Number(f.qty),
          vendor: f.vendor,
          cost: Number(f.cost),
          requestedBy: f.requestedBy.trim(),
          date: todayStr(),
          status: 'Pending'
        };
        $scope.requests.unshift(request);
        $scope.closeModal();
      };
    }]);
})();
