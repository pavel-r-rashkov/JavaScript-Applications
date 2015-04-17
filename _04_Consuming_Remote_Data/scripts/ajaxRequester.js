var app = app || {};

(function(scope) {
    
    function makeRequest(method, url, data, headers, success, error) {
        $.ajax({
            type: method,
            contentType: 'application/json',
            url: url, 
            data: JSON.stringify(data || undefined),
            headers: headers, 
            success: success,
            error: error
        });
    }  

    function makeGetRequest(url, headers, success, error) {
        makeRequest('GET', url, null, headers, success, error);
    }

    function makePostRequest(url, data, headers, success, error) {
        makeRequest('POST', url, data, headers, success, error);
    }

    function makePutRequest(url, data, headers, success, error) {
        makeRequest('PUT', url, data, headers, success, error);
    }

    function makeDeleteRequest(url, headers, success, error) {
        makeRequest('DELETE', url, null, headers, success, error);
    }

    scope.ajaxRequester = {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
})(app);