import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	styleUrls: ['./slides.component.sass']
})
export class SlidesComponent implements OnInit, OnDestroy {
	
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
		
		$('.carousel.carousel-slider').carousel({ full_width: true });
		var interval = window.setInterval(function () {
			$('.carousel').carousel('next')
		}, 3000);
		
		$('#carousel-section').click(function () {
			clearInterval(interval);
		});
		
		$('.slider').slider({ full_width: true });
		$(".button-collapse").sideNav();
		
	}
	
	ngOnDestroy() { $.fn.fullpage.destroy('all'); }
}
