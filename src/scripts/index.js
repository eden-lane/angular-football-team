
angular
.module('app', [
    'ui.bootstrap',
    'ui',
    'services',
    'templates'
])
.controller('CreateEventCtrl', function ($scope, $modalInstance) {
    $scope.ok = function () {
        // $modalInstance.close()
        $scope.addEventForm.$submitted = true;
        if ($scope.addEventForm.$invalid) {
            return;
        }

        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }
})
.controller('MainCtrl', function (events, $modal) {

    this.events = [
            {
                date: '2016-04-05'
            },
            {
                date: '2016-04-08'
            }
        ];
    console.info('MainCtrl');
    $modal.open({
        templateUrl: 'template/modal/events/create.html',
        controller: 'CreateEventCtrl'
    })
})