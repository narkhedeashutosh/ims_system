(function () {
  'use strict';

  angular.module('kodeKrunchApp')
    .directive('modalEscClose', ['$document', '$parse', function ($document, $parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          if (!attrs.ngClick) return;

          var closeFn = $parse(attrs.ngClick);

          function onEsc(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
              e.preventDefault();
              scope.$apply(function () {
                closeFn(scope, { $event: e });
              });
            }
          }

          $document.on('keydown', onEsc);
          element.on('$destroy', function () {
            $document.off('keydown', onEsc);
          });
        }
      };
    }]);
})();
