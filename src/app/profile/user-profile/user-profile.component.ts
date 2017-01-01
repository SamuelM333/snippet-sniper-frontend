import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { NgUploaderOptions } from 'ngx-uploader';

import { ApiService, apiUrl } from '../../api.service';

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

    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: NgUploaderOptions;
    sizeLimit = 1000000;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        if (this.authUser) {
            this.name = this.authUser.name;
            this.last_name = this.authUser.last_name;
            this.email = this.authUser.email;
            this.admin = this.authUser.admin;
            if (this.authUser.picture === '') {
                this.profilePicture = 'assets/img/generic_profile.png';
            } else {
                this.profilePicture = this.authUser.picture;
            }
            
            this.options = {
              url: apiUrl + '/image/' + this.authUser.id
            };
            
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    ngAfterViewInit() { this.onResize(); }

    onResize() {
        $('ul.tabs').tabs();
        $('ul.tabs').tabs('select_tab', 'tab3');
    }

    submitProfilePicture() {
        if (this.profilePicture !== '') {
            this.apiService.changeProfilePicture(this.authUser.id, this.authUser.email, this.profilePicture).subscribe(
                data => {
                    console.log(data);
                    if (data._status === 'OK') {
                        // window.location.reload();
                    } else { console.log('Error'); }
                }
            );
        }
    }

    onSubmitForm(form: NgForm) {
        console.log(form);
    }

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    }

    fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile): void {
        console.log(uploadingFile);
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            alert('File is too large');
        }
    }

    fileChangeEvent(fileInput: any) {

        // Check file size
        if (fileInput.target.files[0].size > 1000000) {
            Materialize.toast('File bigger than 1Mb', 4000);
        } else {

            let file = fileInput.dataTransfer ? fileInput.dataTransfer.files[0] : fileInput.target.files[0];
            let pattern = /image-*/;
            let reader = new FileReader();

            if (!file.type.match(pattern)) {
                Materialize.toast('File isn\'t a image', 4000);
                return;
            }

            reader.onload = function (e) {
                let reader = e.target;
                this.profilePicture = reader.result;
                // console.log(this.profilePicture);
            }.bind(this);

            reader.readAsDataURL(file);
            this.profilePictureChanged = true;
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
        if (this.name !== this.authUser.name || this.last_name !== this.authUser.last_name || this.email !== this.authUser.email) {
            this.updateInformationEnabled = true;
        } else {
            this.updateInformationEnabled = false;
        }
    }

}
