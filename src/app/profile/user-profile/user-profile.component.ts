import { Component, OnInit, AfterViewInit, EventEmitter, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { NgUploaderOptions } from 'ngx-uploader';

import { ApiService, apiUrl } from '../../api.service';
import { location } from "@angular/platform-browser/src/facade/browser";

const bcrypt = require('bcryptjs');

declare const $: any;
declare const Materialize: any;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit, AfterViewInit {

    authUser = JSON.parse(localStorage.getItem('authUser'));
    profilePicture: string = '';
    profilePictureChanged: boolean = false;
    name: string = '';
    last_name: string = '';
    email: string = '';
    password: string = '';
    password_rpt: string = '';
    admin: number = 0;
    updateInformationEnabled: boolean = false;
    changePasswordEnabled: boolean = false;

    events: EventEmitter<any> = new EventEmitter();
    zone: NgZone;
    response: any;
    options: NgUploaderOptions;
    sizeLimit = 1000000;
    progress: number = 0;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        if (this.authUser) {
            this.name = this.authUser.name;
            this.last_name = this.authUser.last_name;
            this.email = this.authUser.email;
            this.admin = this.authUser.admin;

            this.zone = new NgZone({ enableLongStackTrace: false });
            this.options = {
                autoUpload: false,
                url: apiUrl + '/image/' + this.authUser.id,
                previewUrl: '/preview'
            };

            if (this.authUser.picture.url === '' || this.authUser.picture.url === null) {
                this.profilePicture = 'assets/img/generic_profile.png';
            } else {
                this.profilePicture = apiUrl + this.authUser.picture.url;
            }
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    ngAfterViewInit() { this.onResize(); }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab1');
    }

    onSubmitChangePassword(form: NgForm) {
        if (bcrypt.compareSync(form.value.old_password, this.authUser.password)) {

            let hashed_password = bcrypt.hashSync(form.value.new_password, 10);

            if (bcrypt.compareSync(form.value.password_rpt, hashed_password)) {

                this.apiService.updatePassword(this.authUser.email, form.value.old_password, hashed_password).subscribe(
                    data => {
                        this.authUser.password = hashed_password;
                        localStorage.setItem('authUser', JSON.stringify(this.authUser));
                        // loader and toast here
                        location.reload();
                    }
                );
            } else {
                Materialize.toast('New password does not match', 4000);
            }
        } else {
            // wrong old password
            Materialize.toast('Old password does not match', 4000);

        }
    }

    onSubmitUpdateProfileForm(form: NgForm) {
        console.log(form);
        this.apiService.updateProfileInformation(form.value.name, form.value.last_name,
            this.authUser.email, form.value.email, this.authUser.password).subscribe(
            data => {
                this.authUser.name = form.value.name;
                this.authUser.last_name = form.value.last_name;
                this.authUser.email = form.value.email;
                localStorage.setItem('authUser', JSON.stringify(this.authUser));
                // loader and toast here
                location.reload();
            }
        );
    }

    beforeUpload(uploadingFile): void {
        console.log(uploadingFile);
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            Materialize.toast('File bigger than 1Mb', 4000);
        } else {
            this.profilePictureChanged = true;
        }
    }

    handlePreviewData(event) { this.profilePicture = event; }

    submitProfilePicture() { this.events.emit('startUpload'); }

    handleUpload(data): void {

        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent;
        });

        if (data && data.response) {
            data = JSON.parse(data.response);
            this.response = data;
            // update authUser picture
            this.authUser.picture.url = data.picture;
            localStorage.setItem('authUser', JSON.stringify(this.authUser));
        }
    }

    passwordFormUpdated(event: any) {
        if (this.password === this.password_rpt && this.password !== '') {
            this.changePasswordEnabled = true;
        } else {
            this.changePasswordEnabled = false;
        }
    }

    profileInformationFormUpdated(event: any) {
        if (this.name !== this.authUser.name || this.last_name !== this.authUser.last_name ||
            this.email !== this.authUser.email) {
            this.updateInformationEnabled = true;
        } else {
            this.updateInformationEnabled = false;
        }
    }

}
