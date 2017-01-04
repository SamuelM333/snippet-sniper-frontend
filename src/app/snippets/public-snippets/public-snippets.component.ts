import { Component, OnInit } from '@angular/core';

import { ApiService, apiUrl } from "../../api.service";
import { Snippet } from "../snippet";

@Component({
    selector: 'app-public-snippets',
    templateUrl: './public-snippets.component.html',
    styleUrls: ['./public-snippets.component.sass']
})
export class PublicSnippetsComponent implements OnInit {

    snippets: any[];
    url = apiUrl;
    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getSnippets().subscribe(
            data => this.snippets = data._items
        );
    }

}
