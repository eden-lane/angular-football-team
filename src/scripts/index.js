
angular
.module('app', [
    'ui.bootstrap',
    'ui',
    'services',
    'templates'
])
.controller('MainCtrl', function (events) {
    console.info('MainCtrl');
})