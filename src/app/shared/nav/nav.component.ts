import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

declare var $: any;

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
	
	authUser = localStorage.getItem("authUser");
	
	constructor(private router: Router) { }
	
	ngOnInit() {
		$(".button-collapse").sideNav();
		
		if (this.authUser) this.authUser = JSON.parse(this.authUser);
	}
	
	logout() {
		localStorage.removeItem("authUser");
		this.router.navigateByUrl('/');
	}
	
}
