import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../api.service';

declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.sass']
})
export class SlidesComponent implements OnInit, OnDestroy {

    constructor(private apiService: ApiService) { }

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
                if (index === 1) {
                    $('#floating-nav').fadeIn('fast');
                } else if (nextIndex === 1) {
                    $('#floating-nav').fadeOut('fast');
                }
            }
        });

        $('.typed-text').typed({
            strings: ['text', 'snippets', 'code', 'images'],
            typeSpeed: 100,
            loop: true
        });

        $('.carousel.carousel-slider').carousel({ full_width: true });
        let interval = window.setInterval(function () {
            $('.carousel').carousel('next');
        }, 3000);

        $('#carousel-section').click(function () {
            clearInterval(interval);
        });

        $('.slider').slider({ full_width: true });
        $('.button-collapse').sideNav();

    }

    ngOnDestroy() { $.fn.fullpage.destroy('all'); }

    onSubmit(form: NgForm) {

        this.apiService.sendMail(
            form.value.name,
            form.value.email,
            form.value.message
        ).subscribe(
            data => {
                if (data._status === 'OK') {
                    Materialize.toast('Email sent!', 4000);
                    form.reset();
                }
            });
    }
}
