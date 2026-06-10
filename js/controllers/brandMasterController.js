(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('BrandMasterController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.brands = DataService.getBrands();
      $scope.filtered = $scope.brands;
      $scope.search = '';
      $scope.categoryFilter = '';
      $scope.statusFilter = '';
      $scope.brandCategories = DataService.getBrandCategories();

      $scope.categories = [];
      rebuildCategoryFilterList();

      $scope.modal = { open: false, mode: 'view', brand: null, form: {} };

      function rebuildCategoryFilterList() {
        $scope.categories = [];
        $scope.brands.forEach(function (b) {
          if ($scope.categories.indexOf(b.category) === -1) $scope.categories.push(b.category);
        });
      }

      function updateStats() {
        $scope.stats = {
          total: $scope.brands.length,
          active: $scope.brands.filter(function (b) { return b.status === 'Active'; }).length,
          inactive: $scope.brands.filter(function (b) { return b.status !== 'Active'; }).length
        };
      }
      updateStats();

      function emptyForm() {
        return {
          name: '',
          country: '',
          category: $scope.brandCategories[0] || '',
          status: 'Active'
        };
      }

      function copyForm(brand) {
        return {
          name: brand.name,
          country: brand.country,
          category: brand.category,
          status: brand.status
        };
      }

      function nextBrandId() {
        var max = 0;
        $scope.brands.forEach(function (b) {
          var num = parseInt(b.id.replace('BRD-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'BRD-' + String(max + 1).padStart(3, '0');
      }

      $scope.filter = function () {
        $scope.filtered = $scope.brands.filter(function (b) {
          var q = $scope.search.toLowerCase();
          var matchSearch = !q ||
            b.name.toLowerCase().indexOf(q) !== -1 ||
            b.id.toLowerCase().indexOf(q) !== -1;
          var matchCat = !$scope.categoryFilter || b.category === $scope.categoryFilter;
          var matchStatus = !$scope.statusFilter || b.status === $scope.statusFilter;
          return matchSearch && matchCat && matchStatus;
        });
      };

      var pendingBrandSearch = SearchService.consumePending('app.brands');
      if (pendingBrandSearch) {
        $scope.search = pendingBrandSearch;
        $scope.filter();
      }

      $scope.getStatusClass = function (status) {
        return status === 'Active' ? 'badge-active' : 'badge-inactive';
      };

      $scope.getModalTitle = function () {
        if ($scope.modal.mode === 'add') return 'Add Brand';
        if ($scope.modal.mode === 'edit') return 'Edit Brand — ' + $scope.modal.brand.id;
        return $scope.modal.brand.name + ' — ' + $scope.modal.brand.id;
      };

      $scope.isFormMode = function () {
        return $scope.modal.mode === 'add' || $scope.modal.mode === 'edit';
      };

      $scope.addBrand = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'add';
        $scope.modal.brand = null;
        $scope.modal.form = emptyForm();
      };

      $scope.viewBrand = function (brand) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.brand = brand;
        $scope.modal.form = copyForm(brand);
      };

      $scope.editBrand = function (brand) {
        $scope.modal.open = true;
        $scope.modal.mode = 'edit';
        $scope.modal.brand = brand;
        $scope.modal.form = copyForm(brand);
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.saveBrand = function () {
        var f = $scope.modal.form;
        if ($scope.modal.mode === 'add') {
          var newBrand = {
            id: nextBrandId(),
            name: f.name,
            country: f.country,
            category: f.category,
            status: f.status,
            assetsInUse: 0
          };
          $scope.brands.unshift(newBrand);
        } else {
          var brand = $scope.modal.brand;
          brand.name = f.name;
          brand.country = f.country;
          brand.category = f.category;
          brand.status = f.status;
        }
        rebuildCategoryFilterList();
        updateStats();
        $scope.filter();
        $scope.closeModal();
      };

      $scope.toggleStatus = function (brand) {
        brand.status = brand.status === 'Active' ? 'Inactive' : 'Active';
        updateStats();
        $scope.filter();
      };
    }]);
})();
