// @see https://gist.github.com/cgmartin/3daa01f910601ced9cd3
angular.module('ui.bootstrap.datepicker')
.config(function($provide) {
    $provide.decorator('datepickerDirective', function($delegate) {
        var directive = $delegate[0];
        var link = directive.link;

        directive.compile = function() {
            return function(scope, element, attrs, ctrls) {
                link.apply(this, arguments);

                var datepickerCtrl = ctrls[0];
                var ngModelCtrl = ctrls[1];

                if (ngModelCtrl) {
                    // Listen for 'refreshDatepickers' event...
                    scope.$on('refreshDatepickers', function refreshView() {
                        datepickerCtrl.refreshView();
                    });
                }
            }
        };
        return $delegate;
    });
});

angular.module('ui.calendar', ['ui.bootstrap'])
.directive('calendar', function ($filter) {
    return {
        scope: {
            events: '=',
            onSelect: '&'
        },
        restrict: 'AE',
        template: '<datepicker ng-model="date" ng-change="onSelect({date: date})" calendar-refresh="events" custom-class="custom(date)"></datepicker>',
        link: function (scope, element, attrs) {
            var active = {};

            scope.date = new Date();

            scope.custom = function(date) {
                var customClass = [];


                if (scope.events) {
                    for (var i = scope.events.length - 1; i >= 0; i--) {
                        var d = new Date(scope.events[i].date);
                        if ($filter('date')(d, 'dd-MM-yyyy') === $filter('date')(date, 'dd-MM-yyyy')) {
                            customClass.push('_active');
                            break;
                        }
                    }
                }
                return customClass.join(' ');
            }

            scope.$watchCollection('events', function () {
                scope.$broadcast('refreshDatepickers');
            })

        }
    }
})