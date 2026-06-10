(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('TicketsController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.tickets = DataService.getTickets();
      $scope.filtered = $scope.tickets;
      $scope.assets = DataService.getAssets();
      $scope.priorityFilter = '';
      $scope.statusFilter = '';
      $scope.priorities = ['Critical', 'High', 'Medium', 'Low'];
      $scope.statuses = ['Pending', 'Scheduled', 'Under Repair', 'Resolved'];

      $scope.modal = { open: false, mode: 'view', ticket: null, form: {} };
      $scope.openStatusId = null;

      function emptyForm() {
        return {
          assetId: $scope.assets.length ? $scope.assets[0].id : '',
          issue: '',
          priority: 'Medium',
          vendor: '',
          cost: ''
        };
      }

      function findAsset(assetId) {
        for (var i = 0; i < $scope.assets.length; i++) {
          if ($scope.assets[i].id === assetId) return $scope.assets[i];
        }
        return null;
      }

      function nextTicketId() {
        var max = 0;
        $scope.tickets.forEach(function (t) {
          var num = parseInt(t.id.replace('MT-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'MT-' + String(max + 1).padStart(3, '0');
      }

      function todayStr() {
        return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

      $scope.getBadgeClass = function (priority) {
        return 'badge-' + priority.toLowerCase();
      };

      $scope.getStatusClass = function (status) {
        var map = {
          'Under Repair': 'under-repair',
          'Scheduled': 'scheduled',
          'Pending': 'pending',
          'Resolved': 'resolved'
        };
        return 'badge-' + (map[status] || status.toLowerCase());
      };

      $scope.getStatusTriggerClass = function (status) {
        var map = {
          'Pending': 'status-trigger-pending',
          'Scheduled': 'status-trigger-scheduled',
          'Under Repair': 'status-trigger-repair',
          'Resolved': 'status-trigger-resolved'
        };
        return map[status] || '';
      };

      $scope.toggleStatusMenu = function (ticket, $event) {
        $event.stopPropagation();
        $scope.openStatusId = $scope.openStatusId === ticket.id ? null : ticket.id;
      };

      $scope.closeStatusMenu = function () {
        $scope.openStatusId = null;
      };

      $scope.setTicketStatus = function (ticket, status) {
        ticket.status = status;
        $scope.openStatusId = null;
        $scope.filter();
      };

      $scope.filter = function () {
        $scope.filtered = $scope.tickets.filter(function (t) {
          var matchPri = !$scope.priorityFilter || t.priority === $scope.priorityFilter;
          var matchStatus = !$scope.statusFilter || t.status === $scope.statusFilter;
          return matchPri && matchStatus;
        });
      };

      $scope.formatCost = function (c) {
        return '₹' + Number(c).toLocaleString('en-IN');
      };

      $scope.viewTicket = function (ticket) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.ticket = ticket;
      };

      $scope.openNewTicket = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'new';
        $scope.modal.ticket = null;
        $scope.modal.form = emptyForm();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canCreateTicket = function () {
        var f = $scope.modal.form;
        var cost = Number(f.cost);
        return f.assetId && f.issue && f.issue.trim() &&
          f.priority && f.vendor && f.vendor.trim() &&
          !isNaN(cost) && cost > 0;
      };

      $scope.createTicket = function () {
        if (!$scope.canCreateTicket()) return;
        var f = $scope.modal.form;
        var asset = findAsset(f.assetId);
        var ticket = {
          id: nextTicketId(),
          asset: asset ? asset.name : f.assetId,
          assetId: f.assetId,
          issue: f.issue.trim(),
          priority: f.priority,
          vendor: f.vendor.trim(),
          cost: Number(f.cost),
          raised: todayStr(),
          estCompletion: '',
          status: 'Pending'
        };
        $scope.tickets.unshift(ticket);
        $scope.filter();
        $scope.closeModal();
      };
    }]);
})();
