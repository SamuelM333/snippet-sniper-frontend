import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

    authUser = localStorage.getItem('authUser');

    ngOnInit() {
        if (this.authUser) { this.authUser = JSON.parse(this.authUser); }

        $('ul.tabs').tabs();

    }

}
