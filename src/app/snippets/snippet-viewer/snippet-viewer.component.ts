import { Component, OnInit, AfterViewChecked, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, apiUrl } from '../../api.service';
import { Snippet } from '../snippet';
import { MaterializeAction } from "angular2-materialize";

declare const Prism: any;

@Component({
    selector: 'app-snippet-viewer',
    templateUrl: './snippet-viewer.component.html',
    styleUrls: ['./snippet-viewer.component.sass'],
})
export class SnippetViewerComponent implements OnInit, AfterViewChecked {

    url = apiUrl;
    loading: boolean = false;
    idSnippet: string;
    snippet: Snippet;
    authUser = JSON.parse(localStorage.getItem('authUser'));

    shareModal = new EventEmitter<string|MaterializeAction>();
    editModal = new EventEmitter<string|MaterializeAction>();
    deleteModal = new EventEmitter<string|MaterializeAction>();

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
        this.idSnippet = activatedRoute.snapshot.params['id'];
    }

    ngOnInit() {
        this.loading = true;
        if (this.authUser) {
            this.apiService.getSnippetByID(this.idSnippet, this.authUser.email, this.authUser.password).subscribe(
                data => {
                    this.snippet = data;
                    this.loading = false;
                }
            );
        } else {
            this.apiService.getSnippetByID(this.idSnippet, null, null).subscribe(
                data => {
                    this.snippet = data;
                    this.loading = false;
                }
            );
        }

    }

    // Called a lot, fix
    ngAfterViewChecked() { Prism.highlightAll(); }

    openShareModal() { this.shareModal.emit({ action: 'modal', params: ['open'] }); }
    openEditModal() { this.editModal.emit({ action: 'modal', params: ['open'] }); }
    openDeleteModal() { this.deleteModal.emit({ action: 'modal', params: ['open'] }); }

    closeModal() { this.shareModal.emit({ action: 'modal', params: ['close'] }); }

}
