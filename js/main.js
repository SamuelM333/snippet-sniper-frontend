/* global $*/

$(document).ready(function(){
    $('.slider').slider({full_width: true});
    $('.carousel.carousel-slider').carousel({full_width: true});
    $(".button-collapse").sideNav();
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage'],
        navigation: true,
        navigationPosition: 'left',
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrows: false,

    });
    $(function () {
        $(".typed-text").typed({
            strings: ["your text", "your snippets", "your code"],
            typeSpeed: 100,
            loop: true
        });
    });

});

//add on resize
//// recalculate div size
