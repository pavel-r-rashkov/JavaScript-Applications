var inputString = ['[{"manufacturer":"BMW","model":"E92 320i","year":2011,"price":50000,"class":"Family"},',
'{"manufacturer":"Porsche","model":"Panamera","year":2012,"price":100000,"class":"Sport"},',
'{"manufacturer":"Peugeot","model":"305","year":1978,"price":1000,"class":"Family"}]'].join('');

function createTable(jsonString, parentElement){
    var tableObject = jQuery.parseJSON(jsonString),
        headRow,
        table = $(document.createElement('table'))
            .append($(document.createElement('thead')))
            .append($(document.createElement('tbody')))
            .css('id', 'table')
            .css('border', '1px solid black')
            .css('border-spacing', '0px');
    
    headRow = $(document.createElement('tr'))
        .css('background', 'green');
        
    $.each(tableObject[0], function(index, value) {
        headRow.append($(document.createElement('th'))
            .text(index)
            .css('padding', '5px 30px')
            .css('border', '1px solid black'));
    });
    table.children('thead').append(headRow);

    $.each(tableObject, function(index, rowObj){
        var row = $(document.createElement('tr'));

        $.each(rowObj, function(attribute, value){
            row.append($(document.createElement('td'))
                .text(value)
                .css('border', '1px solid black'));
        });
        table.children('tbody').append(row);
    });

    parentElement.append(table);
}

var parent = $('#tableHolder');
createTable(inputString, parent);
