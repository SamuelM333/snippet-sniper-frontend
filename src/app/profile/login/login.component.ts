import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";


import { ApiService } from '../../api.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent {
	
	constructor(private router: Router, private apiService: ApiService) { }
		
	onSubmit(form: NgForm) {
		
		this.apiService.getUserByEmail(form.value.email).subscribe(
			data => {
				if (form.value.password === data.password) {
					let authUser = {
						"id": data.id,
						"name": data.name,
						"email": data.email,
						"password": data.password,
						"admin": data.admin,
					}
					console.log(authUser);
					localStorage.setItem("authUser", JSON.stringify(authUser));
					this.router.navigateByUrl("/profile");
				}
				
				else
					console.log("Wrong credentials :(");
			}
		);
		
	}
	
}
