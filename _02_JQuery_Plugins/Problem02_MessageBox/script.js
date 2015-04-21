(function($){
    $.fn.messageBox = function() {    
        var $this = $(this);
        
        $this.success = function(msg) {
            $this.append(createMsg(msg).css('color', 'green'));
        };

        $this.error = function(msg) {
            $this.append(createMsg(msg).css('color', 'red'));
        };

        function createMsg(msg) {
            var message = $(document.createElement('p')).text(msg).css('opacity', 0);
            message.animate({opacity:'1'}, 1000, function(){
                setTimeout(function(){ message.remove(); }, 3000);
            })
            return message;
        }

        return $this;
    }
}(jQuery));

// Test the plugin...

var box = $('div').messageBox();

box.success("Hello success!");

//box.error("Hello error!");





