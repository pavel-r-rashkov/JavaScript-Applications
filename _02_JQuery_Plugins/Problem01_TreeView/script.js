(function($){
    $.fn.treeView = function() {    
        var $this = $(this);

        addButtonsToChildren($this);
        hideChildren($this);
        
        function addButtonsToChildren(element) {
            var children = element.children();
            for(var i = 0 ; i < children.length ; i += 1) {
                if($(children[i]).is('li')) {
                    createButton(children[i]);
                }
                addButtonsToChildren($(children[i]));
            }
        }

        function createButton(element) {
            var button = $(document.createElement('button')).css('width', '15px')
                .css('height', '15px').css('border-radius', '7.5px');
            
            button.on('click', function(){
                if($(element).children('ul').is(":visible")) {
                    hideChildren($(element));
                }else{
                    $(element).children().show();
                }
            });
            
            $(element).prepend(button);
        }

        function hideChildren(element) {
            var children = element.children();
            for(var i = 0 ; i < children.length ; i += 1) {
                if($(children[i]).is('ul')) {
                    $(children[i]).hide();
                }
                hideChildren($(children[i]));
            }
        }

        return $this;
    }
}(jQuery));

// Test the plugin...

$('#tree').treeView();




