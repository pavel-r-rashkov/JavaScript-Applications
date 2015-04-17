var app = app || {},
    baseUrl = 'https://api.parse.com/1/',
    repositories = app.getRepositories(baseUrl, app.ajaxRequester),
    views = app.views;

function registerEventHandlers() {
    $('#main').on('click', function(e){
        if(e.target.tagName === 'BUTTON') {
            if($(e.target).attr('operation') === 'edit-book') {
                var id = $(e.target.parentNode.parentNode).attr('book-id');
                repositories.booksRepository.getBookById(id, views.createEditBookView, views.createErrorView);

            } else if($(e.target).attr('operation') === 'delete-book') {
                var id = $(e.target.parentNode.parentNode).attr('book-id');
                repositories.booksRepository.deleteBook(id, showAllBooks, views.createErrorView);

            } else if($(e.target).attr('operation') === 'edit-book-submit') {
                var id = $(e.target.parentNode).attr('book-id');
                data = {
                    title: $('#edit-book [name="book-title"]').val(),
                    author: $('#edit-book [name="book-author"]').val(),
                    isbn: $('#edit-book [name="book-isbn"]').val()
                }
                repositories.booksRepository.updateBook(id, data, showAllBooks, views.createErrorView);
            }
        }
    });

    $('#new-book-submit').on('click', function() {
        data = {
            title: $('#new-book [name="book-title"]').val(),
            author: $('#new-book [name="book-author"]').val(),
            isbn: $('#new-book [name="book-isbn"]').val()
        }

        repositories.booksRepository.createBook(data, showAllBooks, views.createErrorView);
    });
}

function showAllBooks() {
    repositories.booksRepository.getAllBooks(views.createAllBooksView, views.createErrorView);    
}

registerEventHandlers();
showAllBooks();




