(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('AssetsController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.assets = DataService.getAssets();
      $scope.filtered = $scope.assets;
      $scope.search = '';
      $scope.statusFilter = '';
      $scope.categoryFilter = '';
      $scope.brandFilter = '';
      $scope.brands = DataService.getAssetBrands();
      $scope.locations = DataService.getAssetLocations();
      $scope.statuses = ['Available', 'In Use', 'Allocated', 'Under Repair'];
      $scope.warrantyTypes = ['Manufacturer', 'Extended', 'Third Party', 'None'];
      $scope.serviceTypes = [
        'Preventive Maintenance', 'Repair', 'Calibration', 'Cleaning', 'Inspection',
        'Sensor Cleaning', 'Firmware Update', 'Parts Replacement', 'Annual Service'
      ];

      $scope.categoryNames = DataService.getCategories().map(function (c) { return c.name; });
      $scope.categories = [];
      $scope.assets.forEach(function (a) {
        if ($scope.categories.indexOf(a.category) === -1) $scope.categories.push(a.category);
      });

      var categoryIcons = {};
      DataService.getCategories().forEach(function (c) {
        categoryIcons[c.name] = c.icon;
      });

      $scope.modal = {
        open: false,
        mode: 'view',
        tab: 'details',
        asset: null,
        form: {},
        warranty: {},
        showAddRecord: false,
        newRecord: {}
      };

      function emptyRecord() {
        return { type: 'Preventive Maintenance', description: '', technician: '', vendor: '', cost: '', nextDue: '' };
      }

      function emptyAssetForm() {
        return {
          name: '',
          brand: $scope.brands[0] || '',
          model: '',
          serial: '',
          category: $scope.categoryNames[0] || '',
          location: 'Warehouse',
          status: 'Available',
          value: 0,
          imageUrl: ''
        };
      }

      function copyAsset(asset) {
        return {
          name: asset.name,
          brand: asset.brand || '',
          model: asset.model || '',
          location: asset.location,
          status: asset.status,
          assignedTo: asset.assignedTo || '—',
          category: asset.category,
          serial: asset.serial,
          value: asset.value,
          imageUrl: asset.imageUrl || ''
        };
      }

      function nextAssetId() {
        var max = 0;
        $scope.assets.forEach(function (a) {
          var parts = a.id.split('-');
          var num = parseInt(parts[parts.length - 1], 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'AST-' + String(max + 1).padStart(3, '0');
      }

      function readImageFile(input, callback) {
        if (!input.files || !input.files[0]) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.$apply(function () { callback(e.target.result); });
        };
        reader.readAsDataURL(input.files[0]);
        input.value = '';
      }

      function copyWarranty(asset) {
        var w = asset.warranty || {};
        return {
          provider: w.provider || '',
          type: w.type || 'Manufacturer',
          start: w.start || '',
          end: w.end || '',
          notes: w.notes || ''
        };
      }

      $scope.filter = function () {
        $scope.filtered = $scope.assets.filter(function (a) {
          var q = $scope.search.toLowerCase();
          var matchSearch = !q ||
            a.name.toLowerCase().indexOf(q) !== -1 ||
            a.id.toLowerCase().indexOf(q) !== -1;
          var matchStatus = !$scope.statusFilter || a.status === $scope.statusFilter;
          var matchCat = !$scope.categoryFilter || a.category === $scope.categoryFilter;
          var matchBrand = !$scope.brandFilter || a.brand === $scope.brandFilter;
          return matchSearch && matchStatus && matchCat && matchBrand;
        });
      };

      var pendingAssetSearch = SearchService.consumePending('app.assets');
      if (pendingAssetSearch) {
        $scope.search = pendingAssetSearch;
        $scope.filter();
      }

      $scope.getBadgeClass = function (status) {
        return 'badge-' + status.toLowerCase().replace(/\s+/g, '-');
      };

      $scope.formatValue = function (v) {
        return '₹' + v.toLocaleString('en-IN');
      };

      $scope.getCategoryIcon = function (category) {
        return categoryIcons[category] || '📦';
      };

      $scope.openAddAsset = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'add';
        $scope.modal.form = emptyAssetForm();
      };

      $scope.onImageSelected = function (input) {
        readImageFile(input, function (dataUrl) {
          $scope.modal.form.imageUrl = dataUrl;
        });
      };

      $scope.onEditImageSelected = function (input) {
        readImageFile(input, function (dataUrl) {
          $scope.modal.form.imageUrl = dataUrl;
        });
      };

      $scope.clearImage = function () {
        $scope.modal.form.imageUrl = '';
      };

      $scope.canAddAsset = function () {
        var f = $scope.modal.form;
        return f && f.name && f.brand && f.serial && f.category && f.location && f.status && f.value >= 0;
      };

      $scope.addAsset = function () {
        if (!$scope.canAddAsset()) return;
        var f = $scope.modal.form;
        var asset = {
          id: nextAssetId(),
          name: f.name,
          brand: f.brand,
          model: f.model || '',
          serial: f.serial,
          category: f.category,
          location: f.location,
          status: f.status,
          value: Number(f.value) || 0,
          assignedTo: '—',
          imageUrl: f.imageUrl || '',
          warranty: {},
          serviceHistory: []
        };
        $scope.assets.unshift(asset);
        if ($scope.categories.indexOf(asset.category) === -1) {
          $scope.categories.push(asset.category);
        }
        $scope.filter();
        $scope.closeModal();
      };

      $scope.viewAsset = function (asset) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.tab = 'details';
        $scope.modal.asset = asset;
        $scope.modal.form = copyAsset(asset);
        $scope.modal.warranty = copyWarranty(asset);
        $scope.modal.showAddRecord = false;
        $scope.modal.newRecord = emptyRecord();
      };

      $scope.editAsset = function (asset) {
        $scope.modal.open = true;
        $scope.modal.mode = 'edit';
        $scope.modal.tab = 'details';
        $scope.modal.asset = asset;
        $scope.modal.form = copyAsset(asset);
        $scope.modal.warranty = copyWarranty(asset);
        $scope.modal.showAddRecord = false;
        $scope.modal.newRecord = emptyRecord();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
        $scope.modal.showAddRecord = false;
      };

      $scope.setTab = function (tab) {
        $scope.modal.tab = tab;
        $scope.modal.showAddRecord = false;
      };

      $scope.hasWarranty = function () {
        var w = $scope.modal.warranty;
        return !!(w.provider || w.start || w.end || w.notes);
      };

      $scope.getServiceCount = function () {
        return ($scope.modal.asset && $scope.modal.asset.serviceHistory)
          ? $scope.modal.asset.serviceHistory.length : 0;
      };

      $scope.toggleAddRecord = function () {
        $scope.modal.showAddRecord = !$scope.modal.showAddRecord;
        if ($scope.modal.showAddRecord) {
          $scope.modal.newRecord = emptyRecord();
        }
      };

      $scope.cancelAddRecord = function () {
        $scope.modal.showAddRecord = false;
        $scope.modal.newRecord = emptyRecord();
      };

      $scope.saveDetails = function () {
        var asset = $scope.modal.asset;
        var f = $scope.modal.form;
        asset.name = f.name;
        asset.brand = f.brand;
        asset.model = f.model;
        asset.location = f.location;
        asset.status = f.status;
        asset.assignedTo = f.assignedTo;
        asset.imageUrl = f.imageUrl || '';
        $scope.filter();
      };

      $scope.saveWarranty = function () {
        $scope.modal.asset.warranty = angular.copy($scope.modal.warranty);
      };

      $scope.isRecordValid = function () {
        var r = $scope.modal.newRecord;
        return r && r.type && r.description && r.description.trim().length > 0;
      };

      $scope.formatNextDue = function (dateVal) {
        if (!dateVal) return '';
        var d = new Date(dateVal);
        if (isNaN(d.getTime())) return dateVal;
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      };

      $scope.saveRecord = function () {
        if (!$scope.isRecordValid()) return;
        var asset = $scope.modal.asset;
        if (!asset.serviceHistory) asset.serviceHistory = [];
        var r = angular.copy($scope.modal.newRecord);
        r.date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        r.cost = Number(r.cost) || 0;
        r.nextDue = $scope.formatNextDue(r.nextDue);
        asset.serviceHistory.unshift(r);
        $scope.modal.showAddRecord = false;
        $scope.modal.newRecord = emptyRecord();
      };
    }]);
})();
