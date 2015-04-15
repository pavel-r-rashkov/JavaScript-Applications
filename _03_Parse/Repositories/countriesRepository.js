var dataAccess = dataAccess || {};

(function(scope) {
    var endpointUrl = 'https://api.parse.com/1/classes/Country',
        PARSE_APP_ID = 'NZj8mW5nclV7vYpPEwlNo3eMAjxASDywBDEBvz5S',
        PARSE_REST_API_KEY = 'hUjC3U7M0G0gBihg0hEI8y2V8bkbgmiSSoBgF0qu';

    var countriesRepository = {
        getAllCountries: function getAllCountries(success, error) {
            $.ajax({
                type: 'GET',
                url: endpointUrl, 
                data: null,
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
                    'Content-Type': 'application/json'
                }, 
                success: success,
                error: error
            });
        },
        removeCountryById: function removeCountryById(id, success, error) {
            $.ajax({
                type: 'DELETE',
                url: endpointUrl + '/' + id, 
                data: null,
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
                    'Content-Type': 'application/json'
                }, 
                success: success,
                error: error
            });
        },
        addCountry: function addCountry(name, success, error) {
            var data = JSON.stringify({name: name});

            $.ajax({
                type: 'POST',
                url: endpointUrl, 
                data: data,
                dataType: 'json',
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
                    'Content-Type': 'application/json'
                }, 
                success: success,
                error: error
            });
        },
        updateCountry: function updateCountry(name, countryId, success, error) {
            var data = JSON.stringify({name: name});

            $.ajax({
                type: 'PUT',
                url: endpointUrl + '/' + countryId, 
                data: data,
                dataType: 'json',
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY,
                    'Content-Type': 'application/json'
                }, 
                success: success,
                error: error
            });
        }
    }

    scope.countriesRepository = countriesRepository;
})(dataAccess);