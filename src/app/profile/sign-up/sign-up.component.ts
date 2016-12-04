import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { ApiService } from "../../api.service";

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent {
	@ViewChild('passwordRepeatLabel') passwordRepeatLabel;
	@ViewChild('email') email;
	@ViewChild('emailLabel') emailLabel;
	// gender: string = '';
	password: string = '';
	password_rpt: string = '';
	valid: boolean = true;
	
	constructor(private router: Router, private apiService: ApiService) { }
	
	onSubmit(form: NgForm) {
		
		this.apiService.insertUser(form.value.name, form.value.last_name, form.value.email,
			form.value.password).subscribe(
			data => {
				if (data._status === 'OK') {
					let authUser = {
						"id": null,
						"name": form.value.name,
						"last_name": form.value.last_name,
						"email": form.value.email,
						"password": form.value.password,
						"admin": 0,
					}
					console.log(authUser);
					localStorage.setItem("authUser", JSON.stringify(authUser));
					this.router.navigateByUrl("/profile");
				}
				
				else
					console.log("Error on sign up");
			}
		);
		
	}
	
	onKey(event: any) {
		// console.log("pass: " + this.password);
		// console.log("pass rpt: " + this.password_rpt);
		// console.log(this.passwordRepeatLabel);
		// console.log(this.email);
		// console.log(this.emailLabel);
		if (this.password === this.password_rpt && this.password !== '')
			this.valid = true
		else
			this.valid = false
		
	}
	
	
}
