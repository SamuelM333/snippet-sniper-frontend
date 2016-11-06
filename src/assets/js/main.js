/* global $ */

$(function () {
	$(".typed-text").typed({
		strings: ["text", "snippets", "code", "images"],
		typeSpeed: 100,
		loop: true
	});
});

$(document).ready(function () {

    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        navigation: true,
        navigationPosition: 'left',
        showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrows: false,
        onLeave: function(index, nextIndex, direction){
            if(index == 1){
                $('#floating-nav').fadeIn("fast");
            } else if (nextIndex == 1) {
                 $('#floating-nav').fadeOut("fast");
            }
        }
    });
	$('.slider').slider({ full_width: true });
	$('.carousel.carousel-slider').carousel({ full_width: true });
	$(".button-collapse").sideNav();

});

//add on resize
//// recalculate div size
