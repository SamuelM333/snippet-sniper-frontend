import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.sass']
})
export class SharedWithMeComponent implements OnInit {

    snippets: any[];
    loading: boolean = true;

    @Input()
    authUser;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
      this.loading = true;
      this.apiService.getSnippetsSharedWithMe(this.authUser.email, this.authUser.password).subscribe(
          data => {
              this.snippets = data._items;
              this.loading = false;
          }
      );
  }

}
