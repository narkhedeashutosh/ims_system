(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('CategoriesController', ['$scope', 'DataService', function ($scope, DataService) {
      $scope.categories = DataService.getCategories();
      $scope.allAssets = DataService.getAssets();
      $scope.modal = { open: false, category: null, assets: [] };

      $scope.viewCategory = function (category) {
        $scope.modal.category = category;
        $scope.modal.assets = $scope.allAssets.filter(function (a) {
          return a.category === category.name;
        });
        $scope.modal.open = true;
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
        $scope.modal.category = null;
        $scope.modal.assets = [];
      };

      $scope.getBadgeClass = function (status) {
        var map = {
          Available: 'available',
          'In Use': 'in-use',
          Allocated: 'allocated',
          'Under Repair': 'under-repair',
          Retired: 'inactive'
        };
        return 'badge-' + (map[status] || status.toLowerCase());
      };
    }]);
})();
