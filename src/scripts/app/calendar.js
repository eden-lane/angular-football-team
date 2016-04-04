angular
.module('app.calendar', [])
.config(function ($stateProvider) {
    $stateProvider
    .state('calendar', {
        url: "",
        templateUrl: "scripts/app/calendar.html"
    })
})