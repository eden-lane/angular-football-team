
angular
.module('services.events', [])
.factory('$events', function ($http, $q, $filter) {
    var events,
        eventsMaxId = 0;

    /**
     * Loads events from file, localStorage or memory
     * 
     * @return {Promise} 
     */
    function getAll() {
        if (events) {
            return $q.when(events);
        } else {
            return $http.get('/data/events.json').then(function (response) {
                events = response.data.events;

                eventsMaxId = events.reduce(function (previous, current) {
                    return previous > current.id ? previous : current.id;
                }, 0)
                return events;
            });
        }
    }


    function getById(id) {
        return getAll().then(function (events) {
            var filtered = events.filter(function (event) {
                if (event.id === id) {
                    return event;
                }
            });

            return filtered[0] || null;
        });
    }

    function getByDate(date) {
        var d = $filter('date')(date, 'yyyy-MM-dd');
        return getAll().then(function (events) {
            var filtered = events.filter(function (event) {
                if (event.date == d) {
                    return event;
                }
            });

            return filtered[0] || null;
        });
    }

    /**
     * Add new event
     *
     * @param {Object} event
     * @param {String} event.title
     * @param {String} event.description
     * @param {Date} event.date
     */
    function add(event) {
        return getAll().then(function (events) {
            events.push({
                id: ++eventsMaxId,
                title: event.title,
                date: $filter('date')(event.date, 'yyyy-MM-dd'),
                time: $filter('date')(event.date, 'HH:mm'),
                description: event.description,
                attenders: []
            });
            return events;
        })
    }

    return {
        getAll: getAll,
        getByDate: getByDate,
        add: add
    }
})