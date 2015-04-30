(function() {
    var arr = [
        {name: 'Garry Finch', jobTitle: 'Frond End Technical Lead', website: 'http://website.com'},
        {name: 'Bob McFray', jobTitle: 'Photographer', website: 'http://goo.gle'},
        {name: 'Jenny O\'Sullivan', jobTitle: 'LEGO Geek', website: 'http://stackoverflow.com'}
    ];
    var selector = '#wrapper';

    $.get('employees.html', function(view) {
        var data = {employees: arr};
        var output = Mustache.render(view, data);
        $(selector).html(output);
    }); 
})();