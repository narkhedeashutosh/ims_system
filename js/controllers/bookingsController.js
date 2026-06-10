(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('BookingsController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.bookings = DataService.getBookings();
      $scope.filtered = $scope.bookings;
      $scope.search = '';
      $scope.statusFilter = '';
      $scope.viewMode = 'gantt';
      $scope.departments = DataService.getBookingDepartments();
      $scope.locations = DataService.getBookingLocations();
      $scope.allAssets = DataService.getAssets().filter(function (a) {
        return a.status === 'Available';
      });

      $scope.statuses = ['Pending', 'Approved', 'Active', 'Rejected', 'Returned'];

      $scope.ganttRange = { start: '2025-06-02', end: '2025-06-15' };
      $scope.ganttDays = buildGanttDays($scope.ganttRange.start, $scope.ganttRange.end);

      $scope.modal = { open: false, form: {}, availableAssets: [], selectedAssets: {} };

      function buildGanttDays(startStr, endStr) {
        var days = [];
        var current = new Date(startStr + 'T00:00:00');
        var end = new Date(endStr + 'T00:00:00');
        var today = new Date('2025-06-07T00:00:00');
        while (current <= end) {
          var dateStr = current.toISOString().slice(0, 10);
          days.push({
            date: dateStr,
            dayNum: current.getDate(),
            month: current.toLocaleDateString('en-GB', { month: 'short' }),
            isToday: current.getTime() === today.getTime()
          });
          current.setDate(current.getDate() + 1);
        }
        return days;
      }

      function parseDate(str) {
        return new Date(str + 'T00:00:00');
      }

      function dayIndex(dateStr) {
        var start = parseDate($scope.ganttRange.start);
        var d = parseDate(dateStr);
        return Math.round((d - start) / 86400000);
      }

      function emptyForm() {
        return {
          production: '',
          team: '',
          from: '',
          to: '',
          pickup: 'Studio A',
          returnLoc: 'Studio A',
          requestedBy: ''
        };
      }

      function nextBookingId() {
        var max = 0;
        $scope.bookings.forEach(function (b) {
          var parts = b.id.split('-');
          var num = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'BK-2025-' + String(max + 1).padStart(3, '0');
      }

      function formatDisplayDate(isoDate, time) {
        var d = parseDate(isoDate);
        var datePart = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        return time ? datePart + ', ' + time : datePart;
      }

      function toDateStr(val) {
        if (!val) return '';
        if (val instanceof Date) {
          var y = val.getFullYear();
          var m = String(val.getMonth() + 1).padStart(2, '0');
          var d = String(val.getDate()).padStart(2, '0');
          return y + '-' + m + '-' + d;
        }
        return String(val).slice(0, 10);
      }

      function toTimeStr(val, fallback) {
        if (!val) return fallback || '09:00';
        if (val instanceof Date) {
          return String(val.getHours()).padStart(2, '0') + ':' +
            String(val.getMinutes()).padStart(2, '0');
        }
        var str = String(val);
        return str.length >= 16 ? str.slice(11, 16) : (fallback || '09:00');
      }

      $scope.filter = function () {
        $scope.filtered = $scope.bookings.filter(function (b) {
          var matchSearch = !$scope.search ||
            b.production.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1;
          var matchStatus = !$scope.statusFilter || b.status === $scope.statusFilter;
          return matchSearch && matchStatus;
        });
      };

      var pendingBookingSearch = SearchService.consumePending('app.bookings');
      if (pendingBookingSearch) {
        $scope.search = pendingBookingSearch;
        $scope.filter();
      }

      $scope.getBadgeClass = function (status) {
        var map = {
          Approved: 'approved', Active: 'active', Pending: 'pending',
          Rejected: 'rejected', Returned: 'inactive'
        };
        return 'badge-' + (map[status] || status.toLowerCase());
      };

      $scope.getBarClass = function (status) {
        var map = {
          Approved: 'gantt-bar-approved', Active: 'gantt-bar-active',
          Pending: 'gantt-bar-pending', Rejected: 'gantt-bar-rejected',
          Returned: 'gantt-bar-returned'
        };
        return map[status] || 'gantt-bar-pending';
      };

      $scope.getBarStyle = function (booking) {
        var totalDays = $scope.ganttDays.length;
        var startIdx = dayIndex(booking.startDate);
        var endIdx = dayIndex(booking.endDate);
        if (startIdx < 0) startIdx = 0;
        if (endIdx < startIdx) endIdx = startIdx;
        var span = endIdx - startIdx + 1;
        var left = (startIdx / totalDays) * 100;
        var width = (span / totalDays) * 100;
        return { left: left + '%', width: width + '%' };
      };

      $scope.getBarLabel = function (booking) {
        if (booking.assets > 1) {
          return booking.assets + ' assets';
        }
        return booking.assets + '…';
      };

      $scope.openNewBooking = function () {
        $scope.modal.open = true;
        $scope.modal.form = emptyForm();
        $scope.modal.selectedAssets = {};
        $scope.modal.availableAssets = [];
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.onDatesChange = function () {
        var f = $scope.modal.form;
        if (f.from && f.to) {
          $scope.modal.availableAssets = $scope.allAssets.slice();
        } else {
          $scope.modal.availableAssets = [];
          $scope.modal.selectedAssets = {};
        }
      };

      $scope.toggleAsset = function (assetId) {
        $scope.modal.selectedAssets[assetId] = !$scope.modal.selectedAssets[assetId];
      };

      $scope.isAssetSelected = function (assetId) {
        return !!$scope.modal.selectedAssets[assetId];
      };

      $scope.getSelectedAssetCount = function () {
        return Object.keys($scope.modal.selectedAssets).filter(function (k) {
          return $scope.modal.selectedAssets[k];
        }).length;
      };

      $scope.canSubmitBooking = function () {
        var f = $scope.modal.form;
        return f.production && f.production.trim() &&
          f.team && f.from && f.to && f.requestedBy && f.requestedBy.trim() &&
          $scope.getSelectedAssetCount() > 0;
      };

      $scope.submitBooking = function () {
        if (!$scope.canSubmitBooking()) return;
        var f = $scope.modal.form;
        var fromDate = toDateStr(f.from);
        var toDate = toDateStr(f.to);
        var fromTime = toTimeStr(f.from, '09:00');
        var toTime = toTimeStr(f.to, '17:00');
        var selectedIds = Object.keys($scope.modal.selectedAssets).filter(function (k) {
          return $scope.modal.selectedAssets[k];
        });

        var booking = {
          id: nextBookingId(),
          production: f.production.trim(),
          by: f.requestedBy.trim(),
          team: f.team,
          assets: selectedIds.length,
          assetIds: selectedIds,
          startDate: fromDate,
          endDate: toDate,
          start: formatDisplayDate(fromDate, fromTime),
          end: formatDisplayDate(toDate, toTime),
          status: 'Pending',
          pickup: f.pickup,
          returnLoc: f.returnLoc
        };

        $scope.bookings.unshift(booking);
        $scope.filter();
        $scope.closeModal();
      };
    }]);
})();
