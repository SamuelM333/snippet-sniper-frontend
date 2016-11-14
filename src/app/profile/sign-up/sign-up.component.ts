import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
	@ViewChild('passwordRepeatLabel') passwordRepeatLabel;
	@ViewChild('email') email;
	@ViewChild('emailLabel') emailLabel;
	gender: string = '';
	password: string = '';
	password_rpt: string = '';
	valid: boolean = true;
	
	constructor() { }
	
	ngOnInit() { }
	
	onSubmit(form: NgForm) {
		console.log(form.value);
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
