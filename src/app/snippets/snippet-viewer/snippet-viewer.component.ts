import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../../api.service';
import { Snippet, serializeSnippet } from '../snippet';

declare const Prism: any;

@Component({
    selector: 'app-snippet-viewer',
    templateUrl: './snippet-viewer.component.html',
    styleUrls: ['./snippet-viewer.component.sass'],
})
export class SnippetViewerComponent implements OnInit, AfterViewChecked {

    idSnippet: string;
    snippet: Snippet;
    authUser = JSON.parse(localStorage.getItem('authUser'));

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
        this.idSnippet = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        if (this.authUser) {
            console.log(this.authUser);
            this.apiService.getSnippetByID(this.idSnippet, this.authUser.email, this.authUser.password).subscribe(
                data => this.snippet = data
            );
        } else {
            this.apiService.getSnippetByID(this.idSnippet, null, null).subscribe(
                data => this.snippet = data
            );
        }

    }

    // Called a lot, fix
    ngAfterViewChecked() { Prism.highlightAll(); }

}
