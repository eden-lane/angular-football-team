
angular
.module('app', [
    'ui.bootstrap',
    'ui',
    'services',
    'templates'
])
.controller('MainCtrl', function (events) {

    this.events = [
            {
                date: '2016-04-05'
            },
            {
                date: '2016-04-08'
            }
        ];
    console.info('MainCtrl');
})