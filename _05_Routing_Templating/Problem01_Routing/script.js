(function() {
    function greet(name, selector) {
        $(selector).html('Hello, ' + name + '!');
    }

    function defaultGreeting(selector) {
        $(selector).html('Click on a name!');
    }

    var app = {};

    app.router = Sammy(function () {
        var selector = '#greeting';

        this.get('#/greet/:name', function () {
            greet(this.params['name'], selector);
        });

        this.get('#/', function () {
            defaultGreeting(selector);
        });
    });

    app.router.run('#/');
})();