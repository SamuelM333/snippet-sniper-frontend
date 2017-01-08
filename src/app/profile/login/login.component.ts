import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';

const bcrypt = require('bcryptjs');

declare const Materialize: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    private loading: boolean = false;

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() { if (localStorage.getItem('authUser')) { this.router.navigateByUrl('/profile'); } }

    onSubmit(form: NgForm) {
        this.loading = true;
        this.apiService.getUserByEmail(form.value.email.trim()).subscribe(
            data => {
                if (bcrypt.compareSync(form.value.password.trim(), data.password)) {
                    let authUser = {
                        'id': data.id,
                        'name': data.name,
                        'last_name': data.last_name,
                        'email': data.email,
                        'password': data.password,
                        'picture': {
                            'url': data.picture.url,
                            'uploaded': data.picture.uploaded,
                        },
                        'admin': data.admin,
                    };
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.router.navigateByUrl('/profile');
                } else { Materialize.toast('Wrong credentials', 4000); }
                this.loading = false;
            },
            error => {
                Materialize.toast('Wrong credentials', 4000);
                this.loading = false;
            }
        );

    }

}
