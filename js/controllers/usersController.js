(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('UsersController', ['$scope', 'DataService', 'SearchService', function ($scope, DataService, SearchService) {
      $scope.users = DataService.getUsers();
      $scope.filtered = $scope.users;
      $scope.roles = DataService.getUserRoles();
      $scope.statuses = ['Active', 'Inactive'];
      $scope.search = '';
      $scope.roleFilter = '';
      $scope.modal = { open: false, mode: 'view', user: null, form: {} };

      function emptyForm() {
        return {
          name: '',
          email: '',
          role: 'Production Team',
          department: '',
          status: 'Active'
        };
      }

      function nextUserId() {
        var max = 0;
        $scope.users.forEach(function (u) {
          var num = parseInt(String(u.id).replace('USR-', ''), 10);
          if (!isNaN(num) && num > max) max = num;
        });
        return 'USR-' + String(max + 1).padStart(3, '0');
      }

      $scope.filter = function () {
        $scope.filtered = $scope.users.filter(function (u) {
          var matchSearch = !$scope.search ||
            u.name.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1 ||
            u.email.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1;
          var matchRole = !$scope.roleFilter || u.role === $scope.roleFilter;
          return matchSearch && matchRole;
        });
      };

      var pendingUserSearch = SearchService.consumePending('app.users');
      if (pendingUserSearch) {
        $scope.search = pendingUserSearch;
        $scope.filter();
      }

      $scope.getInitials = function (name) {
        return name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
      };

      $scope.getStatusClass = function (status) {
        return status === 'Active' ? 'badge-active' : 'badge-inactive';
      };

      $scope.viewUser = function (user) {
        $scope.modal.open = true;
        $scope.modal.mode = 'view';
        $scope.modal.user = user;
      };

      $scope.openAddUser = function () {
        $scope.modal.open = true;
        $scope.modal.mode = 'add';
        $scope.modal.user = null;
        $scope.modal.form = emptyForm();
      };

      $scope.closeModal = function () {
        $scope.modal.open = false;
      };

      $scope.canAddUser = function () {
        var f = $scope.modal.form;
        return f.name && f.name.trim() &&
          f.email && f.email.trim() &&
          f.role && f.department && f.department.trim() &&
          f.status;
      };

      $scope.addUser = function () {
        if (!$scope.canAddUser()) return;
        var f = $scope.modal.form;
        var user = {
          id: nextUserId(),
          name: f.name.trim(),
          email: f.email.trim(),
          role: f.role,
          department: f.department.trim(),
          lastLogin: '—',
          status: f.status
        };
        $scope.users.unshift(user);
        $scope.filter();
        $scope.closeModal();
      };
    }]);
})();
