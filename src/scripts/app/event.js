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
        controller: function ($scope, $events, event) {
            $scope.event = event;
            $scope.date = new Date(event.date + ' ' + event.time);

            function isPlayerAlreadyExists (player) {
                if (!player || !player.email || !event.attenders) return false;
                return event.attenders.filter(function (attender) {
                    return attender.email == player.email
                }).length > 0
            }

            $scope.addPlayer = function (player) {
                if (isPlayerAlreadyExists(player)) {
                    $scope.registerForm.playerEmail.$error.exists = true;
                    return
                }
                if ($scope.registerForm.$invalid) {
                    return
                }

                $events.addAttender(event.id, player)
                .then(function (attenders) {
                    $scope.event.attenders = attenders;
                    $scope.registerForm.playerEmail.$error.exists = false;
                    $scope.player.name = '';
                    $scope.player.email = '';

                    $scope.registerForm.$setPristine();
                })

            }
        }
    })
})