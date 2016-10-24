/* global $*/

$('#scroll-1').click(function () {
    $('body').animate({scrollTop: $('#carousel-section').offset().top + 'px'}, 1000);
});

$('#scroll-2').click(function () {
    $('body').animate({scrollTop: $('#splitted-section').offset().top + 'px'}, 1000);
});

$('#scroll-3').click(function () {
    $('body').animate({scrollTop: $('#main-section').offset().top + 'px'}, 1000);
});

$(document).ready(function(){
    $('.slider').slider({full_width: true});
    $('.carousel.carousel-slider').carousel({full_width: true});
    $('#fullpage').fullpage();
    // $('body').animate({scrollTop: $('#main-section').offset().top + 'px'}, 1000);
    $(function () {
        $(".typed-text").typed({
            strings: ["your text.", "your snippets.", "your code."],
            typeSpeed: 100,
            loop: true
        });
    });
    
});

//add on resize
//// recalculate div size
