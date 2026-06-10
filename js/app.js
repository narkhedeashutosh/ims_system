(function () {
  'use strict';

  angular.module('kodeKrunchApp', ['ui.router', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider', '$animateProvider',
      function ($stateProvider, $urlRouterProvider, $animateProvider) {

        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);

        $urlRouterProvider.otherwise('/login');

        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            data: { public: true }
          })
          .state('app', {
            abstract: true,
            templateUrl: 'views/layout.html',
            controller: 'MainController',
            resolve: {
              auth: ['AuthService', '$state', function (AuthService, $state) {
                if (!AuthService.isAuthenticated()) {
                  $state.go('login');
                  return false;
                }
                return true;
              }]
            }
          })
          .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            data: { breadcrumb: ['Overview', 'Dashboard'] }
          })
          .state('app.assets', {
            url: '/assets',
            templateUrl: 'views/assets.html',
            controller: 'AssetsController',
            data: { breadcrumb: ['Assets', 'Asset List'] }
          })
          .state('app.categories', {
            url: '/categories',
            templateUrl: 'views/categories.html',
            controller: 'CategoriesController',
            data: { breadcrumb: ['Assets', 'Categories'] }
          })
          .state('app.brands', {
            url: '/brands',
            templateUrl: 'views/brands.html',
            controller: 'BrandMasterController',
            data: { breadcrumb: ['Assets', 'Brand Master'] }
          })
          .state('app.stock', {
            url: '/stock',
            templateUrl: 'views/stock.html',
            controller: 'StockController',
            data: { breadcrumb: ['Inventory', 'Stock List'] }
          })
          .state('app.stockInOut', {
            url: '/stock-in-out',
            templateUrl: 'views/stock-in-out.html',
            controller: 'StockInOutController',
            data: { breadcrumb: ['Inventory', 'Stock In/Out'] }
          })
          .state('app.bookings', {
            url: '/bookings',
            templateUrl: 'views/bookings.html',
            controller: 'BookingsController',
            data: { breadcrumb: ['Operations', 'Bookings'] }
          })
          .state('app.allocations', {
            url: '/allocations',
            templateUrl: 'views/allocations.html',
            controller: 'AllocationsController',
            data: { breadcrumb: ['Operations', 'Allocations'] }
          })
          .state('app.movements', {
            url: '/movements',
            templateUrl: 'views/movements.html',
            controller: 'MovementsController',
            data: { breadcrumb: ['Operations', 'Movements'] }
          })
          .state('app.tickets', {
            url: '/tickets',
            templateUrl: 'views/tickets.html',
            controller: 'TicketsController',
            data: { breadcrumb: ['Maintenance', 'Tickets'] }
          })
          .state('app.pmSchedule', {
            url: '/pm-schedule',
            templateUrl: 'views/pm-schedule.html',
            controller: 'PmScheduleController',
            data: { breadcrumb: ['Maintenance', 'PM Schedule'] }
          })
          .state('app.facilities', {
            url: '/facilities',
            templateUrl: 'views/facilities.html',
            controller: 'FacilitiesController',
            data: { breadcrumb: ['Facilities', 'Studios & Locations'] }
          })
          .state('app.vendors', {
            url: '/vendors',
            templateUrl: 'views/vendors.html',
            controller: 'VendorsController',
            data: { breadcrumb: ['Procurement', 'Vendors'] }
          })
          .state('app.purchaseRequests', {
            url: '/purchase-requests',
            templateUrl: 'views/purchase-requests.html',
            controller: 'PurchaseRequestsController',
            data: { breadcrumb: ['Procurement', 'Purchase Requests'] }
          })
          .state('app.users', {
            url: '/users',
            templateUrl: 'views/users.html',
            controller: 'UsersController',
            data: { breadcrumb: ['Users & Roles', 'Users & Roles'] }
          })
          .state('app.reports', {
            url: '/reports',
            templateUrl: 'views/reports.html',
            controller: 'ReportsController',
            data: { breadcrumb: ['Admin', 'Reports'] }
          })
      }])
    .run(['$rootScope', '$state', 'ThemeService', 'AuthService',
      function ($rootScope, $state, ThemeService, AuthService) {
        $rootScope.isDark = ThemeService.isDark();
        $rootScope.$on('themeChanged', function (e, isDark) {
          $rootScope.isDark = isDark;
        });

        $rootScope.$on('$stateChangeStart', function (e, toState) {
          if (!toState.data || !toState.data.public) {
            if (!AuthService.isAuthenticated()) {
              e.preventDefault();
              $state.go('login');
            }
          }
          if (toState.name === 'login' && AuthService.isAuthenticated()) {
            e.preventDefault();
            $state.go('app.dashboard');
          }
        });
      }]);
})();
