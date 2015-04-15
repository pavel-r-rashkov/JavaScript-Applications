var dataAccess = dataAccess || {};

(function(scope) {
    var endpointUrl = 'https://api.parse.com/1/classes/Town',
        PARSE_APP_ID = 'NZj8mW5nclV7vYpPEwlNo3eMAjxASDywBDEBvz5S',
        PARSE_REST_API_KEY = 'hUjC3U7M0G0gBihg0hEI8y2V8bkbgmiSSoBgF0qu';

    var townsRepository = {
        removeTownById: function removeTownById(id, success, error) {
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
        getTownsByCountryId: function getTownsByCountryId(id, success, error) {
            $.ajax({
                type: 'GET',
                url: endpointUrl + '?where={"countryId":{"__type": "Pointer","className": "Country","objectId": "' + id + '"}}', 
                data: null,
                headers: {
                    'X-Parse-Application-Id': PARSE_APP_ID,
                    'X-Parse-REST-API-Key': PARSE_REST_API_KEY
                }, 
                success: success,
                error: error
            });
        },
        addTown: function addTown(name, countryId, success, error) {
            var data = JSON.stringify({name: name, countryId: {__type: "Pointer", className: "Country", objectId: countryId}});

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
        updateTown: function updateTown(name, townId, success, error) {
            var data = JSON.stringify({name: name});

            $.ajax({
                type: 'PUT',
                url: endpointUrl + '/' + townId, 
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

    scope.townsRepository = townsRepository;
})(dataAccess);