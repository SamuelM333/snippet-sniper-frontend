import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../api.service';

declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    authUser = JSON.parse(localStorage.getItem('authUser'));
    profilePicture: File = null;
    name: string = '';
    last_name: string = '';
    email: string = '';
    password: string = '';
    password_rpt: string = '';
    admin: number = 0;
    updateInformationEnabled: boolean = false;
    changePasswordEnabled: boolean = false;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        if (this.authUser) {
            this.name = this.authUser.name;
            this.last_name = this.authUser.last_name;
            this.email = this.authUser.email;
            this.admin = this.authUser.admin;
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    ngAfterViewInit() { this.onResize(); }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab1');
    }

    onSubmitForm(form: NgForm) {
        console.log(form);
    }

    fileChangeEvent(fileInput: any) {
        this.profilePicture = fileInput.target.files[0];
        console.log(this.profilePicture);
    }

    passwordFormUpdated(event: any) {
        if (this.password === this.password_rpt && this.password !== '') {
            this.changePasswordEnabled = true;
        } else {
            this.changePasswordEnabled = false;
        }
    }

    profileInformationFormUpdated(event: any) {
        if (this.name !== this.authUser.name || this.last_name !== this.authUser.last_name || this.email !== this.authUser.email) {
            this.updateInformationEnabled = true;
        } else {
            this.updateInformationEnabled = false;
        }
    }

}
