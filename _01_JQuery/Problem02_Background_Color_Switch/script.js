$('#paint').on('click', function(){
    var color,
        className;
    $('ul li').css('background', 'white');
    color = $('#color').val();
    className = $('#className').val();
    $('li.' + className).css('background', color);
});