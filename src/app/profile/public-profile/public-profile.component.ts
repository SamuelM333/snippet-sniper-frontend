import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService, apiUrl } from '../../api.service';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
    selector: 'app-public-profile',
    templateUrl: './public-profile.component.html',
    styleUrls: ['./public-profile.component.sass']
})
export class PublicProfileComponent implements OnInit, AfterViewInit {

    userEmail: string = '';
    userName: string = '';
    userLastName: string = '';
    userImage: string = '';
    userDate: string = ''
    snippets = [];

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
        this.userEmail = activatedRoute.snapshot.params['email'];
    }

    ngOnInit() {

        this.apiService.getUserByEmail(this.userEmail).subscribe(
            data => {
                this.userName = data.name;
                this.userLastName = data.last_name;
                this.userImage = apiUrl + data.picture.url;
                this.userDate = data.registered
            },
            error => {
                // handle 404
            }
        );

        this.apiService.getSnippetsByUser(this.userEmail, null, null).subscribe(
            data => {
                this.snippets = data._items;
            },
            error => {

            }
        );
    }

    ngAfterViewInit() { $('ul.tabs').tabs(); }


}
