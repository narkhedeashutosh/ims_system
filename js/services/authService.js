(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .factory('AuthService', [function () {
      var STORAGE_KEY = 'kk-auth';
      var user = null;

      try {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) user = JSON.parse(stored);
      } catch (e) { /* ignore */ }

      return {
        login: function (username, password) {
          if (username === 'admin' && password === 'admin') {
            user = { username: 'admin', name: 'admin', role: 'Administrator' };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return true;
          }
          return false;
        },
        logout: function () {
          user = null;
          localStorage.removeItem(STORAGE_KEY);
        },
        isAuthenticated: function () { return !!user; },
        getUser: function () { return user; }
      };
    }]);
})();
