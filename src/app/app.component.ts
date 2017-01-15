import { Component } from '@angular/core';
import { Router } from "@angular/router";

declare const $:any;

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {
    constructor(private router: Router) {
        router.events.subscribe((val) => {
            $('.button-collapse').sideNav('hide');
        });
    }
}
