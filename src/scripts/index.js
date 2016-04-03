
angular
.module('app', [
    'ui.bootstrap',
    'ui',
    'services',
    'templates'
])


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


.controller('MainCtrl', function ($scope, $events, $modal) {
    var vm = this;

    vm.onSelect = function (date) {
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


    $events.getAll().then(function (events) {
        vm.events = events;
    })
})