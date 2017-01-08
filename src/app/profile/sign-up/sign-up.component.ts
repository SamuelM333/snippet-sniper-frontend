import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
const bcrypt = require('bcryptjs');

declare const Materialize: any;

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
    // gender: string = '';
    password: string = '';
    password_rpt: string = '';
    valid: boolean = true;
    loading: boolean = false;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() { if (localStorage.getItem('authUser')) { this.router.navigateByUrl('/profile'); } }

    onSubmit(form: NgForm) {
        this.loading = true;
        let hashed_password = bcrypt.hashSync(form.value.password.trim(), 10);
        this.apiService.insertUser(form.value.name.trim(), form.value.last_name.trim(), form.value.email.trim(),
            hashed_password).subscribe(
            data => {
                let authUser = {
                    'id': data.idUser,
                    'name': form.value.name.trim(),
                    'last_name': form.value.last_name.trim(),
                    'email': form.value.email.trim(),
                    'password': hashed_password,
                    'picture': {
                        'url': null,
                        'uploaded': null,
                    },
                    'admin': 0,
                };
                localStorage.setItem('authUser', JSON.stringify(authUser));
                this.router.navigateByUrl('/profile');
            },
            error => {
                Materialize.toast('Email already in use', 4000);
                this.loading = false;
            }
        );

    }

    onKey(event: any) {
        this.valid = false;
        if (this.password === this.password_rpt && this.password !== '') { this.valid = true; }

    }


}
