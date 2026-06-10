(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('RootController', ['$scope', 'ThemeService', function ($scope, ThemeService) {
      $scope.isDark = ThemeService.isDark();
      $scope.$on('themeChanged', function (e, isDark) {
        $scope.isDark = isDark;
      });
    }]);
})();
