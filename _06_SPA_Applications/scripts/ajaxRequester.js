var app = app || {};

(function(scope) {
    
    function makeRequest(method, url, data, headers) {
        var queue = Q.defer();

        $.ajax({
            type: method,
            contentType: 'application/json',
            url: url, 
            data: JSON.stringify(data || undefined),
            headers: headers, 
            success: function(data) {
                queue.resolve(data);
            },
            error: function(error) {
                queue.reject(error);
            }
        });

        return queue.promise;
    }  

    function makeGetRequest(url, headers) {
        return makeRequest('GET', url, null, headers);
    }

    function makePostRequest(url, data, headers) {
        return makeRequest('POST', url, data, headers);
    }

    function makePutRequest(url, data, headers) {
        return makeRequest('PUT', url, data, headers);
    }

    function makeDeleteRequest(url, headers) {
        return makeRequest('DELETE', url, null, headers);
    }

    scope.ajaxRequester = {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
})(app);