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

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
        this.idSnippet = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.apiService.getSnippetByID(this.idSnippet).subscribe(
            data => this.snippet = data
        );
    }

    // Called a lot, fix
    ngAfterViewChecked() { Prism.highlightAll(); }

}
