app = app || {};

(function(scope) {
    
    views = {
        createEditBookView: function(data) {
            var titleInput = $(document.createElement('input')).attr('name', 'book-title').attr('value', data['title']),
                authorInput = $(document.createElement('input')).attr('name', 'book-author').attr('value', data['author']),
                isbnInput = $(document.createElement('input')).attr('name', 'book-isbn').attr('value', data['isbn']),
                editBookSubmit = $(document.createElement('button')).attr('operation', 'edit-book-submit').text('Update'),
                editBookFieldSet = $(document.createElement('fieldset')).attr('book-id', data['objectId'])
                                                                        .attr('id', 'edit-book')
                                                                        .append(titleInput, $('<br>'),
                                                                            authorInput, $('<br>'),
                                                                            isbnInput, $('<br>'), 
                                                                            editBookSubmit);

            $('#main').html(editBookFieldSet);
        },

        createAllBooksView: function(data) {
            var thead = $(document.createElement('thead')).append($(document.createElement('th')).text('Title'),
                                                                  $(document.createElement('th')).text('Author'),
                                                                  $(document.createElement('th')).text('Isbn'),
                                                                  $(document.createElement('th')),
                                                                  $(document.createElement('th')))
                booksTable = $(document.createElement('table')).css('id', 'books').append(thead),
                tbody = $(document.createElement('tbody')),
                books = data['results'];

            for (var i in books) {
                var titleTd = $(document.createElement('td')).text(books[i]['title']),
                    authorTd = $(document.createElement('td')).text(books[i]['author']),
                    isbnTd = $(document.createElement('td')).text(books[i]['isbn']),
                    editButton = $(document.createElement('button')).text('Edit').attr('operation', 'edit-book'),
                    deleteButton = $(document.createElement('button')).text('Delete').attr('operation', 'delete-book'),
                    editTd = $(document.createElement('td')).append(editButton),
                    deleteTd = $(document.createElement('td')).append(deleteButton),
                    bookTr = $(document.createElement('tr')).attr('book-id', books[i]['objectId'])
                                                            .append(titleTd, authorTd, isbnTd, editTd, deleteTd);

                tbody.append(bookTr);
            };

            booksTable.append(tbody);
            $('#main').html(booksTable);
        },

        createErrorView: function(data) {
            $('#main').text(data.statusText);
        }
    }

    scope.views = views;
})(app);