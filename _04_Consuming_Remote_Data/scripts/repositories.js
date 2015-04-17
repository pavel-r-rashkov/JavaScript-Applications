var app = app || {};

(function(scope) {
    function Repositories(baseUrl, ajaxRequester) {
        this.booksRepository = new Books(baseUrl, ajaxRequester);
    }

    var headers = {
        'X-Parse-Application-Id': 'FL1awc4oXm1NBcmg5VhmGMg8HjSpN00UvRE34MXH',
        'X-Parse-REST-API-Key': 'wMNC62sSS9dKZNFIKwiNQQsAflLcQK0GOAiI59jZ'
    }

    var Books = (function(){
        function Books(baseUrl, ajaxRequester) {
            this._baseUrl = baseUrl;
            this._ajaxRequester = ajaxRequester;
        }

        var ENTITY_URL = 'classes/Book';

        Books.prototype.getAllBooks = function(success, error) {
            this._ajaxRequester.get(this._baseUrl + ENTITY_URL, headers, success, error)
        }

        Books.prototype.getBookById = function(id, success, error) {
            this._ajaxRequester.get(this._baseUrl + ENTITY_URL + '/' + id, headers, success, error)
        }

        Books.prototype.createBook = function(data, success, error) {
            this._ajaxRequester.post(this._baseUrl + ENTITY_URL, data, headers, success, error);
        }

        Books.prototype.updateBook = function(id, data, success, error) {
            this._ajaxRequester.put(this._baseUrl + ENTITY_URL + '/' + id, data, headers, success, error);
        }

        Books.prototype.deleteBook = function(id, success, error) {
            this._ajaxRequester.delete(this._baseUrl + ENTITY_URL + '/' + id, headers, success, error);
        }

        return Books;
    })();

    scope.getRepositories = function(baseUrl, ajaxRequester) {
        return new Repositories(baseUrl, ajaxRequester);
    }
})(app);