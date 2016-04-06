
angular
.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ui',
    'app.event',
    'app.calendar',
    'services',
    'templates'
])

.config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('');
})

.controller('CreateEventCtrl', function ($scope, date, $modalInstance) {
    $scope.date = date;

    $scope.ok = function () {
        // $modalInstance.close()
        $scope.addEventForm.$submitted = true;
        if ($scope.addEventForm.$invalid) {
            return;
        }

        var event = angular.copy($scope.event);
        date.setHours($scope.event.time.getHours());
        date.setMinutes($scope.event.time.getMinutes());
        event.date = date;

        $modalInstance.close(event);
    };


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
})


.controller('MainCtrl', function ($scope, $events, $modal, $state) {
    var vm = this;

    function addEventModal(date) {
        $modal.open({
            templateUrl: 'template/modal/events/create.html',
            controller: 'CreateEventCtrl',
            resolve: {
                date: date
            }
        }).result.then(function (event) {
            return $events.add(event)
        }).then(function (events) {
            vm.events = events;
        });
    }

    vm.onSelect = function (date) {
        $events.getByDate(date).then(function (event) {
            if (!event) {
                addEventModal(date)
            } else {
                $state.go('event', {date: event.date})
            }
        })
        
    }


    $events.getAll().then(function (events) {
        vm.events = events;
    })
})