import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
	
	constructor() { }
	
	ngOnInit() { $(".button-collapse").sideNav(); }
	
}
