var app = app || {};

app.bookController = (function () {

    function redirectTo(url) {
        window.location = url;
    }

    function BooksController(repositories) {
        this._repositories = repositories;
    }

    BooksController.prototype.showAllBooks = function(selector) {
         this._repositories.booksRepository.getAllBooks()
                .then(
                function (data) {
                    $.get('./views/book/all-books.html', function (view) {
                        output = Mustache.render(view, data);
                        $(selector).html(output);
                    });
                },
                function (error) {
                    Noty.error("Error loading books data.");
                }
            );
    }

    BooksController.prototype.new = function(selector) {
        $.get('./views/book/add-book.html', function (view) {
            $(selector).html(view);
        });
    }

    BooksController.prototype.create = function(params) {
        var bookData = {
            title: params['book-title'],
            author: params['book-author'],
            isbn: params['book-isbn']
        }

        this._repositories.booksRepository.createBook(bookData)
                .then(
                function (data) {
                    Noty.success('Book added');
                    redirectTo('#/books/showall');
                },
                function (error) {
                    Noty.error("Error adding book");
                }
            );
    }

    BooksController.prototype.delete = function(id) {
        this._repositories.booksRepository.deleteBook(id)
                .then(
                function (data) {
                    Noty.success('Book deleted');
                    redirectTo('#/books/showall');
                },
                function (error) {
                    Noty.error("Error deleting book");
                }
            );
    }

    BooksController.prototype.edit = function(id, selector) {
        this._repositories.booksRepository.getBookById(id)
                .then(
                function (data) {
                    $.get('./views/book/edit-book.html', function (view) {
                        output = Mustache.render(view, data);
                        $(selector).html(output);
                    });
                },
                function (error) {
                    Noty.error("Error finding book");
                }
            );
    }

    BooksController.prototype.update = function(params) {
        var bookData = {
            title: params['book-title'],
            author: params['book-author'],
            isbn: params['book-isbn']
        }

        this._repositories.booksRepository.updateBook(params['id'], bookData)
                .then(
                function (data) {
                    Noty.success('Book updated');
                    redirectTo('#/books/showall');
                },
                function (error) {
                    Noty.error("Error updating book");
                }
            );
    }

    return {
        get: function(data) {
            return new BooksController(data);
        }
    }; 
})();
