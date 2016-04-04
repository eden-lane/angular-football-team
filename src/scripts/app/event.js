angular
.module('app.event', [])
.config(function ($stateProvider) {
    $stateProvider
    .state('event', {
        url: "/event/:date",
        templateUrl: "scripts/app/event.html",
        resolve: {
            event: function ($events, $stateParams) {
                return $events.getByDate($stateParams.date);
            }
        },
        controller: function ($scope, event) {
            console.info(event)
            $scope.event = event;
        }
    })
})