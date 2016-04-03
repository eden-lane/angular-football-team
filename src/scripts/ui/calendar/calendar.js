angular.module('ui.calendar', ['ui.bootstrap'])
.directive('calendar', function ($filter) {
    return {
        scope: {
            events: '=',
            onSelect: '&'
        },
        restrict: 'AE',
        template: '<span>{{date}}</span><datepicker ng-model="date" ng-click="onSelect({date: date})" custom-class="custom(date)"></datepicker>',
        link: function (scope, element, attrs) {
            var active = {};

            scope.date = new Date();

            scope.custom = function(date) {
                var customClass = [];

                if (scope.date.getMonth() != date.getMonth()) {
                    customClass.push('_inactive');
                }

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


            scope.$watchCollection('events', function (newValue) {
                scope.date = new Date(scope.date);
            })
        }
    }
})