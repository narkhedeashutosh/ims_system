(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .factory('DataService', ['MockData', function (MockData) {
      return {
        getAssets: function () { return MockData.assets; },
        getAssetBrands: function () { return MockData.assetBrands; },
        getAssetLocations: function () { return MockData.assetLocations; },
        getCategories: function () { return MockData.categories; },
        getBrands: function () { return MockData.brands; },
        getBrandCategories: function () { return MockData.brandCategories; },
        getStock: function () { return MockData.stock; },
        getTransactions: function () { return MockData.transactions; },
        getBookings: function () { return MockData.bookings; },
        getBookingDepartments: function () { return MockData.bookingDepartments; },
        getBookingLocations: function () { return MockData.bookingLocations; },
        getAllocations: function () { return MockData.allocations; },
        getMovements: function () { return MockData.movementRegister; },
        getMovementLocations: function () { return MockData.movementLocations; },
        getTickets: function () { return MockData.tickets; },
        getPmSchedule: function () { return MockData.pmSchedule; },
        getFacilities: function () { return MockData.facilities; },
        getVendors: function () { return MockData.vendors; },
        getVendorCategories: function () { return MockData.vendorCategories; },
        getPurchaseRequests: function () { return MockData.purchaseRequests; },
        getUsers: function () { return MockData.users; },
        getUserRoles: function () { return MockData.userRoles; },
        getReportData: function () { return MockData.reports; },
        getDashboard: function () { return MockData.dashboard; },
        getNotifications: function () { return MockData.notifications; }
      };
    }]);
})();
