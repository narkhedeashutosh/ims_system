(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('MainController', ['$scope', '$state', 'AuthService', 'ThemeService', 'DataService', 'SearchService',
      function ($scope, $state, AuthService, ThemeService, DataService, SearchService) {
        var user = AuthService.getUser();
        $scope.user = user;
        $scope.notificationItems = DataService.getNotifications();
        $scope.notifOpen = false;
        $scope.searchOpen = false;
        $scope.globalSearch = '';
        $scope.searchResults = [];

        $scope.navSections = [
          {
            title: 'Overview',
            items: [
              { label: 'Dashboard', icon: '◫', state: 'app.dashboard' }
            ]
          },
          {
            title: 'Assets & Inventory',
            items: [
              { label: 'Asset List', icon: '▤', state: 'app.assets' },
              { label: 'Categories', icon: '▦', state: 'app.categories' },
              { label: 'Brand Master', icon: '◈', state: 'app.brands' },
              { label: 'Stock List', icon: '▧', state: 'app.stock' },
              { label: 'Stock In/Out', icon: '⇄', state: 'app.stockInOut' }
            ]
          },
          {
            title: 'Operations',
            items: [
              { label: 'Bookings', icon: '☰', state: 'app.bookings' },
              { label: 'Allocations', icon: '↗', state: 'app.allocations' },
              { label: 'Movements', icon: '⇆', state: 'app.movements' }
            ]
          },
          {
            title: 'Maintenance',
            items: [
              { label: 'Tickets', icon: '⚙', state: 'app.tickets' },
              { label: 'PM Schedule', icon: '◷', state: 'app.pmSchedule' }
            ]
          },
          {
            title: 'Facilities',
            items: [
              { label: 'Studios & Locations', icon: '⌂', state: 'app.facilities' }
            ]
          },
          {
            title: 'Procurement',
            items: [
              { label: 'Vendors', icon: '🛒', state: 'app.vendors' },
              { label: 'Purchase Requests', icon: '⊕', state: 'app.purchaseRequests' }
            ]
          },
          {
            title: 'Users & Roles',
            items: [
              { label: 'Users & Roles', icon: '👤', state: 'app.users' }
            ]
          },
          {
            title: 'Admin',
            items: [
              { label: 'Reports', icon: '📊', state: 'app.reports' }
            ]
          }
        ];

        function updateUnreadCount() {
          var count = 0;
          $scope.notificationItems.forEach(function (n) {
            if (!n.read) count++;
          });
          $scope.notifications = count;
        }

        updateUnreadCount();

        $scope.isActive = function (state) {
          return $state.is(state);
        };

        $scope.getBreadcrumb = function () {
          var data = $state.current.data;
          return data && data.breadcrumb ? data.breadcrumb : ['', ''];
        };

        $scope.toggleNotifications = function ($event) {
          if ($event) $event.stopPropagation();
          $scope.searchOpen = false;
          $scope.notifOpen = !$scope.notifOpen;
        };

        $scope.closeDropdowns = function () {
          $scope.notifOpen = false;
          $scope.searchOpen = false;
        };

        $scope.onGlobalSearch = function () {
          $scope.notifOpen = false;
          $scope.searchResults = SearchService.search($scope.globalSearch);
          $scope.searchOpen = !!$scope.globalSearch.trim();
        };

        $scope.onSearchFocus = function () {
          if ($scope.globalSearch.trim()) {
            $scope.onGlobalSearch();
          }
        };

        $scope.submitGlobalSearch = function ($event) {
          if ($event) $event.preventDefault();
          if ($scope.searchResults.length) {
            $scope.goToSearchResult($scope.searchResults[0]);
          }
        };

        $scope.goToSearchResult = function (result) {
          SearchService.setPending(result.state, result.query);
          $scope.globalSearch = '';
          $scope.searchResults = [];
          $scope.searchOpen = false;
          $scope.closeDropdowns();
          $state.go(result.state);
        };

        $scope.markNotificationRead = function (item) {
          item.read = true;
          updateUnreadCount();
        };

        $scope.markAllNotificationsRead = function ($event) {
          if ($event) $event.stopPropagation();
          $scope.notificationItems.forEach(function (n) {
            n.read = true;
          });
          updateUnreadCount();
        };

        $scope.toggleTheme = function () {
          ThemeService.toggle();
        };

        $scope.logout = function () {
          AuthService.logout();
          $state.go('login');
        };
      }]);
})();
