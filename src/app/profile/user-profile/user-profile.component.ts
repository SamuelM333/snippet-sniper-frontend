import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements AfterViewInit {
    
    authUser = JSON.parse(localStorage.getItem('authUser'));
    profilePicture: File = null;
    name = this.authUser.name;
    last_name = this.authUser.last_name;
    email = this.authUser.email;
    password: string = '';
    password_rpt: string = '';
    updateInformationEnabled: boolean = false;
    changePasswordEnabled: boolean = false;
    
    ngAfterViewInit() { this.onResize(); }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab1');
    }

    onSubmitForm(form: NgForm) {
        console.log(form);
    }
    
    fileChangeEvent(fileInput: any){
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
