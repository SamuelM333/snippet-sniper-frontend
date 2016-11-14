import { Component, OnInit } from '@angular/core';
declare var Prism: any;

@Component({
	selector: 'app-snippet-viewer',
	templateUrl: './snippet-viewer.component.html',
	styleUrls: ['./snippet-viewer.component.sass']
})

export class SnippetViewerComponent implements OnInit {
	
	constructor() { }
	
	ngOnInit() {
		Prism.highlightAll();
	}
	
}
