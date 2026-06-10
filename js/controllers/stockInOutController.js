(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('StockInOutController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.transactions = DataService.getTransactions();
      $scope.stockItems = DataService.getStock();
      $scope.transactionTypes = ['Issue', 'Return', 'Receive', 'Adjust'];

      $scope.modal = {
        open: false,
        mode: 'view',
        transaction: null,
        form: {}
      };

      function emptyForm() {
        var now = new Date();
        var dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
          ', ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
        return {
          sku: $scope.stockItems.length ? $scope.stockItems[0].sku : '',
          type: 'Issue',
          qty: '',
          handledBy: '',
          note: '',
          date: dateStr
        };
      }

      function nextTxnId() {
        var max = 0;
        $scope.transactions.forEach(function (t) {
          var num = parseInt(t.id.replace('TXN-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'TXN-' + String(max + 1).padStart(3, '0');
      }

      function findStockItem(sku) {
        for (var i = 0; i < $scope.stockItems.length; i++) {
          if ($scope.stockItems[i].sku === sku) return $scope.stockItems[i];
        }
        return null;
      }

      function applyStockChange(stockItem, type, qty) {
        if (!stockItem || !qty) return;
        if (type === 'Issue') {
          stockItem.qty = Math.max(0, stockItem.qty - qty);
        } else {
          stockItem.qty += qty;
        }
      }

      $scope.getBadgeClass = function (type) {
        var map = { Issue: 'issue', Return: 'return', Receive: 'receive', Adjust: 'pending' };
        return 'badge-' + (map[type] || type.toLowerCase());
      };

      $scope.openNewTransaction = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'new';
        $scope.modal.transaction = null;
        $scope.modal.form = emptyForm();
      };

      $scope.viewTransaction = function (txn) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.transaction = txn;
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.getSelectedItemName = function () {
        var item = findStockItem($scope.modal.form.sku);
        return item ? item.item : '';
      };

      $scope.canLogTransaction = function () {
        var f = $scope.modal.form;
        var qty = Number(f.qty);
        if (!f.sku || !f.type || !qty || qty <= 0 || !f.handledBy || !f.handledBy.trim()) return false;
        if (f.type === 'Issue') {
          var stock = findStockItem(f.sku);
          if (stock && qty > stock.qty) return false;
        }
        return true;
      };

      $scope.logTransaction = function () {
        if (!$scope.canLogTransaction()) return;
        var f = $scope.modal.form;
        var qty = Number(f.qty);
        var stockItem = findStockItem(f.sku);
        var txn = {
          id: nextTxnId(),
          item: stockItem ? stockItem.item : f.sku,
          sku: f.sku,
          type: f.type,
          qty: qty,
          issuedBy: f.handledBy.trim(),
          date: f.date,
          note: f.note || ''
        };
        $scope.transactions.unshift(txn);
        applyStockChange(stockItem, f.type, qty);
        $scope.closeModal();
      };
    }]);
})();
