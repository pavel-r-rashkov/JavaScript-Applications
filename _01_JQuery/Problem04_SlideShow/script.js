var sliderModule = (function(){

    function create(slides, autoScrollTime, width, height) {
        var widthPx = width + 'px',
            widthPxNegative = '-' + widthPx,
            heightPx = height + 'px',
            sliderHolder = $(document.createElement('section'))
                .attr('id', 'sliderHolder')
                .css('position', 'relative')
                .css('overflow', 'hidden')
                .css('width', widthPx)
                .css('height', heightPx)
                .css('border', '1px solid black'),
            activeSlide = 0,
            frame = $(document.createElement('div')).css('height', '100%').css('position', 'relative'),
            stopAutoScroll = setInterval(scrollSlider, autoScrollTime),
            buttonLeft,
            buttonRight; 
        
        sliderHolder.append(frame);

        for(var i in slides){
            slides[i][0].style.position = 'absolute';
        }

        frame.append(slides[0]);

        buttonLeft = $(document.createElement('button')).attr('id', 'leftSliderButton').on('click', scrollSlider)
            .css('position', 'absolute').css('top', '45%').css('left', '20px').css('width', '30px').css('height', '30px');
        buttonRight = $(document.createElement('button')).attr('id', 'rightSliderButton').on('click', scrollSlider)
            .css('position', 'absolute').css('top', '45%').css('right', '20px').css('width', '30px').css('height', '30px');
        sliderHolder.append(buttonLeft);
        sliderHolder.append(buttonRight);

        function scrollSlider() {
            var left = this === buttonLeft.get(0),
                oldSlideLeftPosition = left ? widthPx : widthPxNegative,
                newSlideLeftPosition = left ? widthPxNegative : widthPx;

            if (this === buttonLeft.get(0) || this === buttonRight.get(0)) {
                clearInterval(stopAutoScroll);
                stopAutoScroll = setInterval(scrollSlider, autoScrollTime); 
            }

            activeSlide = left ? activeSlide - 1 : activeSlide + 1;
            activeSlide = slides.length <= activeSlide ? activeSlide = 0 : activeSlide;
            activeSlide = 0 > activeSlide ? activeSlide = slides.length - 1 : activeSlide;

            frame.children().animate({left:oldSlideLeftPosition}, "slow");
            slides[activeSlide].css('left', newSlideLeftPosition);
            frame.append(slides[activeSlide]);
            slides[activeSlide].animate({left:'0px'}, "slow", 
                function(){ 
                    $(frame.children()[0]).remove();
                }
            );
        }

        return sliderHolder;
    }

    return {
        createSlider: create
    }
})();

// Test slider module...

var a = $(document.createElement('div')).text('first').css('background', 'red').css('width', '100%').css('height', '100%'),
    b = $(document.createElement('div')).text('second').css('background', 'green').css('width', '100%').css('height', '100%'),
    c = $(document.createElement('div')).text('third').css('background', 'yellow').css('width', '100%').css('height', '100%'),
    d = $(document.createElement('div')).text('fourth').css('background', 'blue').css('width', '100%').css('height', '100%'),
    slides = [a, b, c, d],
    slider = sliderModule.createSlider(slides, 5000, 1000, 300);

$('body').append(slider);
