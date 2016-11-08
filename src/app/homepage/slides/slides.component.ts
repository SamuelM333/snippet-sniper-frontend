import {Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MnFullpageOptions } from 'ng2-fullpage';
declare var $: any;

@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./slides.component.sass']
})
export class SlidesComponent implements OnInit {

	@Input() public options:MnFullpageOptions = new MnFullpageOptions({
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

	constructor() {
	}

	ngOnInit() {
		console.log("home");

		$(".typed-text").typed({
			strings: ["text", "snippets", "code", "images"],
			typeSpeed: 100,
			loop: true
		});

		$('.slider').slider({full_width: true});
		$('.carousel.carousel-slider').carousel({full_width: true});
		$(".button-collapse").sideNav();
	}
}
