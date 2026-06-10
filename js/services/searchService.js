(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .factory('SearchService', ['DataService', function (DataService) {
      var pending = null;

      function matches(query, text) {
        return text && text.toLowerCase().indexOf(query) !== -1;
      }

      function buildIndex() {
        var items = [];

        DataService.getAssets().forEach(function (a) {
          items.push({
            type: 'Asset',
            label: a.name,
            sublabel: a.id + ' · ' + a.category,
            state: 'app.assets',
            query: a.id
          });
        });

        DataService.getStock().forEach(function (s) {
          items.push({
            type: 'Stock',
            label: s.item,
            sublabel: s.sku + ' · Qty ' + s.qty,
            state: 'app.stock',
            query: s.sku
          });
        });

        DataService.getBrands().forEach(function (b) {
          items.push({
            type: 'Brand',
            label: b.name,
            sublabel: b.category + ' · ' + b.country,
            state: 'app.brands',
            query: b.name
          });
        });

        DataService.getBookings().forEach(function (b) {
          items.push({
            type: 'Booking',
            label: b.production,
            sublabel: b.id + ' · ' + b.team,
            state: 'app.bookings',
            query: b.production
          });
        });

        DataService.getTickets().forEach(function (t) {
          items.push({
            type: 'Ticket',
            label: t.asset,
            sublabel: t.id + ' · ' + t.status,
            state: 'app.tickets',
            query: t.asset
          });
        });

        DataService.getVendors().forEach(function (v) {
          items.push({
            type: 'Vendor',
            label: v.name,
            sublabel: v.category,
            state: 'app.vendors',
            query: v.name
          });
        });

        DataService.getUsers().forEach(function (u) {
          items.push({
            type: 'User',
            label: u.name,
            sublabel: u.email + ' · ' + u.role,
            state: 'app.users',
            query: u.name
          });
        });

        DataService.getPurchaseRequests().forEach(function (p) {
          items.push({
            type: 'Purchase',
            label: p.item,
            sublabel: p.id + ' · ' + p.vendor,
            state: 'app.purchaseRequests',
            query: p.item
          });
        });

        DataService.getMovements().forEach(function (m) {
          items.push({
            type: 'Movement',
            label: m.asset,
            sublabel: m.id + ' · ' + m.from + ' → ' + m.to,
            state: 'app.movements',
            query: m.asset
          });
        });

        DataService.getAllocations().forEach(function (a) {
          items.push({
            type: 'Allocation',
            label: a.production,
            sublabel: a.id + ' · ' + a.dept,
            state: 'app.allocations',
            query: a.production
          });
        });

        return items;
      }

      var index = buildIndex();

      return {
        search: function (query, limit) {
          if (!query || !query.trim()) return [];
          var q = query.trim().toLowerCase();
          var max = limit || 8;
          var results = [];

          for (var i = 0; i < index.length; i++) {
            var item = index[i];
            if (matches(q, item.label) || matches(q, item.sublabel) || matches(q, item.type)) {
              results.push(item);
              if (results.length >= max) break;
            }
          }
          return results;
        },

        setPending: function (state, query) {
          pending = { state: state, query: query };
        },

        consumePending: function (state) {
          if (pending && pending.state === state) {
            var q = pending.query;
            pending = null;
            return q;
          }
          return null;
        }
      };
    }]);
})();
