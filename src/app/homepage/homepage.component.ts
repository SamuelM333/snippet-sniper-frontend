import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-homepage',
    template: '<app-floating-nav></app-floating-nav><app-slides></app-slides>'
})

export class HomepageComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('authUser')) {
            this.router.navigateByUrl('/snippets');
        }
    }

}
