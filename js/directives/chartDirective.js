(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .directive('kkChart', ['$timeout', function ($timeout) {
      return {
        restrict: 'A',
        scope: { config: '&kkChart' },
        link: function (scope, element) {
          var chart = null;
          var pendingTimeout = null;
          var lastConfigKey = '';

          function getConfigKey(config) {
            if (!config) return '';
            return JSON.stringify({
              type: config.type,
              labels: config.labels,
              datasets: config.datasets,
              options: config.options
            });
          }

          function render() {
            if (scope.$$destroyed) return;

            var config = scope.config();
            if (!config) return;

            var configKey = getConfigKey(config);
            if (configKey === lastConfigKey && chart) return;
            lastConfigKey = configKey;

            if (chart) {
              chart.destroy();
              chart = null;
            }

            if (pendingTimeout) {
              $timeout.cancel(pendingTimeout);
              pendingTimeout = null;
            }

            pendingTimeout = $timeout(function () {
              pendingTimeout = null;
              if (scope.$$destroyed) return;

              var ctx = element[0].getContext('2d');
              chart = new Chart(ctx, {
                type: config.type,
                data: {
                  labels: config.labels,
                  datasets: config.datasets
                },
                options: Object.assign({
                  responsive: true,
                  maintainAspectRatio: false,
                  animation: { duration: 600, easing: 'easeOutQuart' }
                }, config.options || {})
              });
            });
          }

          scope.$watch(function () {
            return getConfigKey(scope.config());
          }, function (newKey, oldKey) {
            if (newKey !== oldKey) render();
          });

          scope.$on('chartRefresh', function () {
            lastConfigKey = '';
            render();
          });

          scope.$on('$destroy', function () {
            if (pendingTimeout) $timeout.cancel(pendingTimeout);
            if (chart) {
              chart.destroy();
              chart = null;
            }
          });

          render();
        }
      };
    }]);
})();
