(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .controller('ReportsController', ['$scope', 'DataService', 'ThemeService', function ($scope, DataService, ThemeService) {
      var reportData = DataService.getReportData();

      $scope.activeTab = 'utilization';
      $scope.tabs = [
        { id: 'utilization', label: 'Asset Utilization' },
        { id: 'maintenance', label: 'Maintenance Cost' },
        { id: 'inventory', label: 'Inventory Stock' }
      ];

      $scope.setTab = function (id) {
        $scope.activeTab = id;
        $scope.$broadcast('chartRefresh');
      };

      $scope.getStats = function () {
        return reportData[$scope.activeTab].stats;
      };

      function getTabLabel() {
        for (var i = 0; i < $scope.tabs.length; i++) {
          if ($scope.tabs[i].id === $scope.activeTab) return $scope.tabs[i].label;
        }
        return $scope.activeTab;
      }

      function getChartTitle() {
        if ($scope.activeTab === 'utilization') return 'Equipment Utilization (%)';
        if ($scope.activeTab === 'maintenance') return 'Monthly Maintenance Cost';
        return 'Stock vs Reorder Level';
      }

      function formatStatLabel(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (s) { return s.toUpperCase(); });
      }

      $scope.getChartConfig = function () {
        var tab = $scope.activeTab;
        var data = reportData[tab];
        var isDark = ThemeService.isDark();
        var gridColor = isDark ? 'rgba(148,163,184,0.15)' : 'rgba(148,163,184,0.25)';
        var textColor = isDark ? '#94a3b8' : '#64748b';

        if (tab === 'utilization') {
          return {
            type: 'bar',
            labels: data.chart.labels,
            datasets: [{
              label: 'Utilization %',
              data: data.chart.data,
              backgroundColor: '#f97316',
              borderRadius: 6,
              barThickness: 18
            }],
            options: {
              indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: {
                x: { max: 100, grid: { color: gridColor }, ticks: { color: textColor } },
                y: { grid: { display: false }, ticks: { color: textColor } }
              }
            }
          };
        }

        if (tab === 'maintenance') {
          return {
            type: 'bar',
            labels: data.chart.labels,
            datasets: [{
              label: 'Cost (₹)',
              data: data.chart.data,
              backgroundColor: '#14b8a6',
              borderRadius: 6
            }],
            options: {
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor } }
              }
            }
          };
        }

        return {
          type: 'bar',
          labels: data.chart.labels,
          datasets: [
            { label: 'Stock', data: data.chart.stock, backgroundColor: '#14b8a6', borderRadius: 4 },
            { label: 'Reorder Level', data: data.chart.reorder, backgroundColor: '#f97316', borderRadius: 4 }
          ],
          options: {
            plugins: { legend: { labels: { color: textColor } } },
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor, maxRotation: 45 } },
              y: { grid: { color: gridColor }, ticks: { color: textColor } }
            }
          }
        };
      };

      var statColors = {
        utilization: { totalAssets: 'orange', available: 'green', utilizationRate: 'blue' },
        maintenance: { totalTickets: 'orange', open: 'red', totalCost: 'teal' },
        inventory: { totalSkus: 'blue', lowStock: 'orange', stockValue: 'teal' }
      };

      $scope.getStatCards = function () {
        var stats = $scope.getStats();
        var colors = statColors[$scope.activeTab] || {};
        return Object.keys(stats).map(function (key) {
          return {
            label: formatStatLabel(key),
            value: stats[key],
            color: colors[key] || 'blue'
          };
        });
      };

      $scope.exportPdf = function () {
        if (!window.jspdf || !window.jspdf.jsPDF) return;

        var doc = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        var stats = $scope.getStats();
        var statKeys = Object.keys(stats);
        var y = 18;

        doc.setFontSize(16);
        doc.setTextColor(30, 41, 59);
        doc.text('iMS — Reports & Analytics', 14, y);

        y += 10;
        doc.setFontSize(11);
        doc.setTextColor(100, 116, 139);
        doc.text('Report: ' + getTabLabel(), 14, y);

        y += 6;
        doc.text('Generated: ' + new Date().toLocaleString('en-GB'), 14, y);

        y += 12;
        doc.setFontSize(12);
        doc.setTextColor(30, 41, 59);
        doc.text('Summary', 14, y);

        y += 8;
        doc.setFontSize(10);
        statKeys.forEach(function (key) {
          doc.text(formatStatLabel(key) + ': ' + stats[key], 14, y);
          y += 7;
        });

        y += 6;
        doc.setFontSize(12);
        doc.text(getChartTitle(), 14, y);

        var canvas = document.querySelector('#report-export-area canvas');
        if (canvas) {
          try {
            var imgData = canvas.toDataURL('image/png', 1.0);
            var pageWidth = doc.internal.pageSize.getWidth();
            var imgWidth = pageWidth - 28;
            var imgHeight = (canvas.height / canvas.width) * imgWidth;
            var maxHeight = doc.internal.pageSize.getHeight() - y - 14;

            if (imgHeight > maxHeight) {
              imgHeight = maxHeight;
              imgWidth = (canvas.width / canvas.height) * imgHeight;
            }

            doc.addImage(imgData, 'PNG', 14, y + 4, imgWidth, imgHeight);
          } catch (e) {
            y += 10;
            doc.setFontSize(10);
            doc.text('Chart preview could not be embedded.', 14, y);
          }
        }

        var filename = 'ims-report-' + $scope.activeTab + '-' +
          new Date().toISOString().slice(0, 10) + '.pdf';
        doc.save(filename);
      };

      $scope.$on('themeChanged', function () {
        $scope.$broadcast('chartRefresh');
      });
    }]);
})();
