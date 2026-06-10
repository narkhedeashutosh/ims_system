(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('LoginController', ['$scope', '$state', 'AuthService', 'ThemeService',
      function ($scope, $state, AuthService, ThemeService) {
        $scope.credentials = { username: 'admin', password: 'admin' };
        $scope.showPassword = false;
        $scope.error = '';

        $scope.toggleTheme = function () {
          ThemeService.toggle();
        };

        $scope.togglePassword = function () {
          $scope.showPassword = !$scope.showPassword;
        };

        $scope.login = function () {
          $scope.error = '';
          if (AuthService.login($scope.credentials.username, $scope.credentials.password)) {
            $state.go('app.dashboard');
          } else {
            $scope.error = 'Invalid username or password. Try admin / admin';
          }
        };
      }]);
})();
