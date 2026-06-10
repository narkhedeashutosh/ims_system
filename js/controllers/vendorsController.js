(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('VendorsController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.vendors = DataService.getVendors();
      $scope.filtered = $scope.vendors;
      $scope.categories = DataService.getVendorCategories();
      $scope.search = '';
      $scope.modal = { open: false, mode: 'view', vendor: null, form: {} };

      function emptyForm() {
        return {
          name: '',
          category: $scope.categories[0] || '',
          contact: '',
          email: '',
          phone: ''
        };
      }

      function nextVendorId() {
        var max = 0;
        $scope.vendors.forEach(function (v) {
          var num = parseInt(String(v.id || '').replace('VEN-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'VEN-' + String(max + 1).padStart(3, '0');
      }

      $scope.filter = function () {
        $scope.filtered = $scope.vendors.filter(function (v) {
          return !$scope.search ||
            v.name.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1 ||
            v.category.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1;
        });
      };

      var pendingVendorSearch = SearchService.consumePending('app.vendors');
      if (pendingVendorSearch) {
        $scope.search = pendingVendorSearch;
        $scope.filter();
      }

      $scope.getStars = function (rating) {
        var stars = '';
        for (var i = 0; i < 5; i++) {
          stars += i < rating ? '★' : '☆';
        }
        return stars;
      };

      $scope.getContractBadgeClass = function (status) {
        return status === 'Active' ? 'badge-approved' : 'badge-inactive';
      };

      $scope.formatValue = function (value) {
        return '₹' + Number(value).toLocaleString('en-IN');
      };

      $scope.viewVendor = function (vendor) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.vendor = vendor;
      };

      $scope.openAddVendor = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'add';
        $scope.modal.vendor = null;
        $scope.modal.form = emptyForm();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canAddVendor = function () {
        var f = $scope.modal.form;
        return f.name && f.name.trim() &&
          f.category && f.contact && f.contact.trim() &&
          f.email && f.email.trim() && f.phone && f.phone.trim();
      };

      $scope.addVendor = function () {
        if (!$scope.canAddVendor()) return;
        var f = $scope.modal.form;
        var vendor = {
          id: nextVendorId(),
          name: f.name.trim(),
          category: f.category,
          contact: f.contact.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          contracts: 0,
          rating: 0,
          contractList: []
        };
        $scope.vendors.unshift(vendor);
        $scope.filter();
        $scope.closeModal();
      };
    }]);
})();
