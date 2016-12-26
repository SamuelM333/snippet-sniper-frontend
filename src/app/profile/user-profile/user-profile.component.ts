import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";

declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    authUser = JSON.parse(localStorage.getItem('authUser'));
    password: string = '';
    password_rpt: string = '';
    valid: boolean = true;

    ngOnInit() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab3');
    }

    ngAfterViewInit() { Materialize.updateTextFields(); }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab3');
    }

    changeProfilePicture() {
        console.log('click on photo');
    }

    onSubmitForm(form: NgForm) {
        console.log(form);
    }

    onKey(event: any) {
        this.valid = false;
        if (this.password === this.password_rpt && this.password !== '') { this.valid = true; }

    }

}
