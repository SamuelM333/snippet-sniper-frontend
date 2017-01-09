import { Component, Input } from '@angular/core';
import { apiUrl } from '../../api.service';


@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    styleUrls: ['./snippets-list.component.sass']
})
export class SnippetsListComponent {

    url: string = apiUrl;

    @Input()
    public snippetList: any[];

    @Input()
    public loading: boolean = true;

    @Input()
    public bigLoading: boolean = false;

    @Input()
    public emptyMessage: string = '';

}
