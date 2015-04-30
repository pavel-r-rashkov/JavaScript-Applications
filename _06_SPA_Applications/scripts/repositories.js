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

        Books.prototype.getAllBooks = function() {
            return this._ajaxRequester.get(this._baseUrl + ENTITY_URL, headers)
        }

        Books.prototype.getBookById = function(id) {
            return this._ajaxRequester.get(this._baseUrl + ENTITY_URL + '/' + id, headers)
        }

        Books.prototype.createBook = function(data) {
            return this._ajaxRequester.post(this._baseUrl + ENTITY_URL, data, headers);
        }

        Books.prototype.updateBook = function(id, data) {
            return this._ajaxRequester.put(this._baseUrl + ENTITY_URL + '/' + id, data, headers);
        }

        Books.prototype.deleteBook = function(id) {
            return this._ajaxRequester.delete(this._baseUrl + ENTITY_URL + '/' + id, headers);
        }

        return Books;
    })();

    scope.getRepositories = function(baseUrl, ajaxRequester) {
        return new Repositories(baseUrl, ajaxRequester);
    }
})(app);