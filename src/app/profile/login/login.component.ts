import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../../api.service';

const bcrypt = require('bcryptjs');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private apiService: ApiService) { }

    ngOnInit() { if (localStorage.getItem('authUser')) { this.router.navigateByUrl('/profile'); } }

    onSubmit(form: NgForm) {

        this.apiService.getUserByEmail(form.value.email).subscribe(
            data => {
                if (bcrypt.compareSync(form.value.password, data.password)) {
                    let authUser = {
                        'id': data.id,
                        'name': data.name,
                        'last_name': data.last_name,
                        'email': data.email,
                        'password': data.password,
                        // 'picture': data.picture,
                        'picture': '',
                        'admin': data.admin,
                    };
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.router.navigateByUrl('/profile');
                } else { console.log('Wrong credentials :('); }
            }
        );

    }

}
