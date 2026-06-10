(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .factory('ThemeService', ['$rootScope', function ($rootScope) {
      var STORAGE_KEY = 'kk-theme';
      var isDark = localStorage.getItem(STORAGE_KEY) === 'dark';

      function apply() {
        document.documentElement.classList.toggle('theme-dark', isDark);
        $rootScope.$broadcast('themeChanged', isDark);
      }

      apply();

      return {
        isDark: function () { return isDark; },
        toggle: function () {
          isDark = !isDark;
          localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
          apply();
          return isDark;
        },
        setDark: function (dark) {
          isDark = !!dark;
          localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
          apply();
        }
      };
    }]);
})();
