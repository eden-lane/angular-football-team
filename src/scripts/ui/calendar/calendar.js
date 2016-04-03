angular.module('ui.calendar', ['ui.bootstrap'])
.directive('calendar', function () {
    return {
        restrict: 'AE',
        template: '<datepicker ng-model="date" custom-class="custom(date)"></datepicker>',
        link: function (scope, element, attrs) {
            scope.date = new Date();


            scope.custom = function(date) {
                return 'red';
            }
        }
    }
})