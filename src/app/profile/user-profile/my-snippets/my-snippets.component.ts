import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-my-snippets',
  templateUrl: './my-snippets.component.html',
  styleUrls: ['./my-snippets.component.sass']
})
export class MySnippetsComponent implements OnInit {

    snippets: any[];
    loading: boolean = true;

    @Input()
    authUser;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.loading = true;
        this.apiService.getSnippetsByUser(this.authUser.email, this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.snippets = data._items;
                this.loading = false;
            }
        );
    }

}
