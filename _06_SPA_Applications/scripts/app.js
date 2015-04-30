var app = app || {};

(function() {
    var baseUrl = 'https://api.parse.com/1/',
        repositories = app.getRepositories(baseUrl, app.ajaxRequester),
        bookController = app.bookController.get(repositories);

    app.router = Sammy(function () {
        var mainSelector = '#main';

        this.get('#/books/showall', function () {
            bookController.showAllBooks(mainSelector);
        });

        this.get('#/books/edit/:id', function () {
           bookController.edit(this.params['id'], mainSelector);
        });

        this.put('#/books/update/:id', function () {
            bookController.update(this.params);
        });

        this.get('#/books/new', function () {
            bookController.new(mainSelector);
        });

        this.post('#/books/create', function () {
            bookController.create(this.params);
        });

        this.get('#/books/delete/:id', function () {
            bookController.delete(this.params['id']);
        });

        this.get('#/', function () {
            console.log('!!!');
        });
    });

    app.router.run('#/books/showall');
})();







