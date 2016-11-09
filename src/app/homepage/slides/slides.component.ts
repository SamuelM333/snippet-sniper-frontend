import {Component, OnInit, OnDestroy} from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	styleUrls: ['./slides.component.sass']
})
export class SlidesComponent implements OnInit, OnDestroy {

	constructor() {
	}

	ngOnInit() {

		$('#fullpage').fullpage({
			anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
			navigation: true,
			navigationPosition: 'left',
			showActiveTooltip: true,
			slidesNavigation: true,
			slidesNavPosition: 'bottom',
			controlArrows: false,
			onLeave: function (index, nextIndex, direction) {
				if (index == 1) {
					$('#floating-nav').fadeIn("fast");
				} else if (nextIndex == 1) {
					$('#floating-nav').fadeOut("fast");
				}
			}
		});

		$(".typed-text").typed({
			strings: ["text", "snippets", "code", "images"],
			typeSpeed: 100,
			loop: true
		});

		$('.slider').slider({full_width: true});
		$('.carousel.carousel-slider').carousel({full_width: true});
		$(".button-collapse").sideNav();


	}

	ngOnDestroy() {
		$.fn.fullpage.destroy('all');
	}
}
