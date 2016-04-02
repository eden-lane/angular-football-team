angular.module('ui.calendar', ['ui.bootstrap'])
.directive('calendar', function () {
    return {
        restrict: 'AE',
        template: '<datepicker ng-model="dt"></datepicker>',
        link: function (scope, element, attrs) {
            scope.dt = new Date();
        }
    }
})