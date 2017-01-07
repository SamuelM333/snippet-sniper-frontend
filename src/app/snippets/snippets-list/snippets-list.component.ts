import { Component, Input } from '@angular/core';
import { apiUrl } from "../../api.service";


@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    styleUrls: ['./snippets-list.component.sass']
})
export class SnippetsListComponent {

    url: string = apiUrl;

    @Input()
    snippetList: any[];

    @Input()
    loading: boolean = true;

    @Input()
    bigLoading: boolean = false;

    @Input()
    emptyMessage: string = "";

}
