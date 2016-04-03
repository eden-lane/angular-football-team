angular.module('ui.calendar', ['ui.bootstrap'])
.directive('calendar', function () {
    return {
        scope: {
            events: '='
        },
        restrict: 'AE',
        template: '<span>{{date}}</span><datepicker ng-model="date" custom-class="custom(date)"></datepicker>',
        link: function (scope, element, attrs) {
            var active = {};

            scope.date = new Date();

            console.info(scope.events);

            scope.custom = function(date) {
                var customClass = [];

                if (scope.date.getMonth() != date.getMonth()) {
                    customClass.push('_inactive');
                }

                for (var i = scope.events.length - 1; i >= 0; i--) {
                    var d = new Date(scope.events[i].date);
                    d.setHours(0); 
                    d.setMinutes(0);
                    if (+d == +date) {
                        customClass.push('_active');
                        break;
                    }
                }

                return customClass.join(' ');
            }


            scope.$watch('active', function (newValue) {
            })
        }
    }
})