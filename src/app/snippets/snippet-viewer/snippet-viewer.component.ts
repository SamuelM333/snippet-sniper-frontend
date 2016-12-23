import { Component, OnInit, AfterViewChecked } from '@angular/core';

import { ApiService } from '../../api.service';
import { Snippet, serializeSnippet } from '../snippet';

declare const Prism: any;

@Component({
    selector: 'app-snippet-viewer',
    templateUrl: './snippet-viewer.component.html',
    styleUrls: ['./snippet-viewer.component.sass'],
})
export class SnippetViewerComponent implements OnInit, AfterViewChecked {

    snippet: Snippet;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getSnippetByID("9").subscribe(
        	data => {
        	    this.snippet = data;
        	    console.log(this.snippet);
            }
        );
    }

    // Called a lot, fix
    ngAfterViewChecked() { Prism.highlightAll(); }

}
