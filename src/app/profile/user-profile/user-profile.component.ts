import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    authUser = localStorage.getItem('authUser');

    ngOnInit() {
        if (this.authUser) { this.authUser = JSON.parse(this.authUser); }

        $('ul.tabs').tabs();

    }

    ngAfterViewInit() {
        // $('ul.tabs').tabs('select_tab', 'tab1');
    }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab1');

    }

}
