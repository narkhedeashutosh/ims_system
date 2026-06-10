(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('DashboardController', ['$scope', 'DataService', 'ThemeService',
      function ($scope, DataService, ThemeService) {
        var dash = DataService.getDashboard();

        $scope.stats = dash.stats;
        $scope.movements = dash.movements;
        $scope.maintenanceDue = dash.maintenanceDue;
        $scope.fleetLegend = dash.fleetStatus;

        function chartColors() {
          var isDark = ThemeService.isDark();
          return {
            grid: isDark ? 'rgba(148,163,184,0.12)' : 'rgba(148,163,184,0.2)',
            text: isDark ? '#94a3b8' : '#64748b'
          };
        }

        $scope.getBookingsChart = function () {
          var c = chartColors();
          var data = dash.bookingsMovements;
          return {
            type: 'line',
            labels: data.labels,
            datasets: [
              {
                label: 'Bookings',
                data: data.bookings,
                borderColor: '#14b8a6',
                backgroundColor: 'rgba(20, 184, 166, 0.18)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
              },
              {
                label: 'Movements',
                data: data.movements,
                borderColor: '#f97316',
                backgroundColor: 'rgba(249, 115, 22, 0.15)',
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4
              }
            ],
            options: {
              plugins: {
                legend: {
                  position: 'top',
                  align: 'end',
                  labels: { color: c.text, boxWidth: 12, usePointStyle: true }
                }
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: c.text } },
                y: {
                  min: 0,
                  max: 80,
                  grid: { color: c.grid },
                  ticks: { color: c.text, stepSize: 20 }
                }
              },
              interaction: { intersect: false, mode: 'index' }
            }
          };
        };

        $scope.getFleetChart = function () {
          var c = chartColors();
          var fleet = dash.fleetStatus;
          return {
            type: 'doughnut',
            labels: fleet.map(function (f) { return f.label; }),
            datasets: [{
              data: fleet.map(function (f) { return f.value; }),
              backgroundColor: fleet.map(function (f) { return f.color; }),
              borderWidth: 0,
              hoverOffset: 6
            }],
            options: {
              cutout: '68%',
              plugins: {
                legend: { display: false }
              }
            }
          };
        };

        $scope.getMovementBadge = function (status) {
          var map = { Out: 'in-use', 'At Service': 'under-repair', Returned: 'allocated' };
          return 'badge-' + (map[status] || status.toLowerCase());
        };

        $scope.getPriorityBadge = function (priority) {
          return 'badge-' + priority.toLowerCase();
        };

        $scope.$on('themeChanged', function () {
          $scope.$broadcast('chartRefresh');
        });
      }]);
})();
