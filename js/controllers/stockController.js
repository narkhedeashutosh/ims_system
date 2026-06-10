(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('StockController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.stock = DataService.getStock();
      $scope.filtered = $scope.stock;
      $scope.search = '';
      $scope.lowStockOnly = false;

      $scope.modal = {
        open: false,
        mode: 'view',
        item: null,
        adjustType: 'Add',
        adjustQty: 0
      };

      function updateStats() {
        $scope.stats = {
          totalItems: $scope.stock.length,
          lowStock: $scope.stock.filter(function (s) { return isLowStock(s); }).length,
          totalValue: $scope.stock.reduce(function (sum, s) { return sum + s.qty * s.value; }, 0)
        };
      }

      function isLowStock(s) {
        return s.qty <= s.reorder;
      }

      updateStats();

      $scope.filter = function () {
        $scope.filtered = $scope.stock.filter(function (s) {
          var q = $scope.search.toLowerCase();
          var matchSearch = !q ||
            s.item.toLowerCase().indexOf(q) !== -1 ||
            s.sku.toLowerCase().indexOf(q) !== -1;
          var matchLow = !$scope.lowStockOnly || isLowStock(s);
          return matchSearch && matchLow;
        });
      };

      var pendingStockSearch = SearchService.consumePending('app.stock');
      if (pendingStockSearch) {
        $scope.search = pendingStockSearch;
        $scope.filter();
      }

      $scope.formatValue = function (v) {
        return '₹' + v.toLocaleString('en-IN');
      };

      $scope.isLowStock = isLowStock;

      $scope.getQtyClass = function (item) {
        return isLowStock(item) ? 'qty-low' : 'qty-ok';
      };

      $scope.getStockStatus = function (item) {
        return isLowStock(item) ? 'Low Stock' : '✓ In Stock';
      };

      $scope.getStockStatusClass = function (item) {
        return isLowStock(item) ? 'stock-low' : 'stock-ok';
      };

      $scope.getTotalValue = function (item) {
        return item.qty * item.value;
      };

      $scope.viewItem = function (item) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.item = item;
      };

      $scope.adjustItem = function (item) {
        $scope.modal.open = true;
        $scope.modal.mode = 'adjust';
        $scope.modal.item = item;
        $scope.modal.adjustType = 'Add';
        $scope.modal.adjustQty = 0;
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canApplyAdjustment = function () {
        var qty = Number($scope.modal.adjustQty);
        if (!qty || qty <= 0) return false;
        if ($scope.modal.adjustType === 'Remove' && qty > $scope.modal.item.qty) return false;
        return true;
      };

      $scope.applyAdjustment = function () {
        if (!$scope.canApplyAdjustment()) return;
        var item = $scope.modal.item;
        var qty = Number($scope.modal.adjustQty);
        if ($scope.modal.adjustType === 'Add') {
          item.qty += qty;
        } else {
          item.qty -= qty;
        }
        updateStats();
        $scope.filter();
        $scope.closeModal();
      };
    }]);
})();
