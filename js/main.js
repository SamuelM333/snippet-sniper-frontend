/* global $*/

$(document).ready(function () {
    $('.slider').slider({ full_width: true });
    $('.carousel.carousel-slider').carousel({ full_width: true });
    $(".button-collapse").sideNav();
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
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

    var options = [
        {
            selector: '.nav-section', offset: 500, callback: function (el) {
                Materialize.fadeInImage($(el));
            }
        }
    ];
    Materialize.scrollFire(options);

});

//add on resize
//// recalculate div size
