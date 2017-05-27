// Your main js File
$(document).on('ready', function() {
    easySmoothScroll();
    countdown();
});


function easySmoothScroll(options) {
    
    'use strict';
    
    var defaults = {
        element: '.scroll',
        speed: 500,
        offset: 0,
        backTopElement: '.back-top'
    },
        settings = $.extend(true, defaults, options),
        element = settings.element;
    
    $('a' + element).on('click', function (e) {
        
        e.preventDefault();
        
        var offset = (!$(this).data('offset')) ? settings.offset : $(this).data('offset'),
            speed = (!$(this).data('speed')) ? settings.speed : $(this).data('speed'),
            target = $(this).attr('href');
        
        if ($(target).length) {
            $('html,body').animate({
                scrollTop: $(target).offset().top + offset
            }, speed);
            return true;
        } else {
            console.log(' ENOTARGET! Missing target element ');
            return false;
        }

    }); // end click
    
    $('a' + settings.backTopElement).on('click', function (e) {
        
        e.preventDefault();
        
        var offset = (!$(this).data('offset')) ? settings.offset : $(this).data('offset'),
            speed = (!$(this).data('speed')) ? settings.speed : $(this).data('speed');
        
        $('html,body').animate({
            scrollTop: 0 + offset
        }, speed);
        return true;

    }); // end click
    
}

function countdown() {
    // Set the date we're counting down to
    var countDownDate = new Date("Jun 5, 2017 10:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("countdown").innerHTML = '<div class="days">' + days + '</div> <div class="hours">' + hours + '</div> <div class="minutes">' + minutes + '</div> <div class="seconds">' + seconds + '</div>';

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}