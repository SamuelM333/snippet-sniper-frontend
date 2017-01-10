import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
const bcrypt = require('bcryptjs');
declare const Materialize: any;


@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.sass']
})
export class AdminPanelComponent implements OnInit {

    totalSnippetCount: number = 0;
    totalFragmentsCount: number = 0;
    publicSnippetCount: number = 0;
    privateSnippetCount: number = 0;
    closedSnippetCount: number = 0;

    totalUserCount: number = 0;
    totalRegularUserCount: number = 0;
    totalAdminCount: number = 0;
    totalActiveUserCount: number = 0;
    totalInactiveUserCount: number = 0;

    activeState: boolean;
    adminState: boolean;
    password: string = '';
    password_rpt: string = '';
    valid: boolean = true;
    loading: boolean = false;

    authUser = JSON.parse(localStorage.getItem('authUser'));

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        // Snippets Statistics
        this.apiService.getSnippetsStatistic('total', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalSnippetCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getSnippetsStatistic('fragments', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalFragmentsCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );
        this.apiService.getSnippetsStatistic('public', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.publicSnippetCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getSnippetsStatistic('closed', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.closedSnippetCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getSnippetsStatistic('private', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.privateSnippetCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getUsersStatistic('total', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalUserCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getUsersStatistic('admins', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalAdminCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getUsersStatistic('users', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalRegularUserCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getUsersStatistic('active', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalActiveUserCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );

        this.apiService.getUsersStatistic('inactive', this.authUser.email, this.authUser.password).subscribe(
            data => {
                this.totalInactiveUserCount = data._meta.total
            },
            error => {
                Materialize.toast('Error', 4000);
            }
        );
    }

    onSubmitNewUser(form: NgForm) {
        this.loading = true;
        let hashed_password = bcrypt.hashSync(form.value.password.trim(), 10);
        this.apiService.insertUser(form.value.name.trim(), form.value.last_name.trim(), form.value.email.trim(),
            hashed_password).subscribe(
            data => {
                // Redirect to user profile?
                this.router.navigateByUrl('/user/' + data.email);
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

    onSubmitDeleteSnippet(form: NgForm) {
        if (this.authUser) {
            this.apiService.deleteSnippet(form.value.snippet_id, this.authUser.email, this.authUser.password).subscribe(
                data => {
                    Materialize.toast('Snippet deleted', 4000);
                    form.reset();
                },
                error => {
                    if (error.status === 404) {
                        Materialize.toast('Snippet not found', 4000);
                    } else if (error.status === 401) {
                        Materialize.toast('Not allowed to do that', 4000);
                    } else {
                        Materialize.toast('Error', 4000);
                    }
                }
            );
        }
    }

    onSubmitDeleteUser(form: NgForm) {
        if (this.authUser) {
            this.apiService.changeUserState(form.value.email, form.value.state, this.authUser.email, this.authUser.password)
                .subscribe(
                    data => {
                        Materialize.toast('User active state changed', 4000);
                        form.reset();
                    },
                    error => {
                        if (error.status === 404) {
                            Materialize.toast('User not found', 4000);
                        } else if (error.status === 401) {
                            Materialize.toast('Not allowed to do that', 4000);
                        } else {
                            Materialize.toast('Error', 4000);
                        }
                    }
                );
        }
    }

    onSubmitMakeAdmin(form: NgForm) {
        if (this.authUser) {
            this.apiService.changeUserAdmin(form.value.email, form.value.state, this.authUser.email, this.authUser.password)
                .subscribe(
                    data => {
                        Materialize.toast('User admin state changed', 4000);
                        form.reset();
                    },
                    error => {
                        if (error.status === 404) {
                            Materialize.toast('User not found', 4000);
                        } else if (error.status === 401) {
                            Materialize.toast('Not allowed to do that', 4000);
                        } else {
                            Materialize.toast('Error', 4000);
                        }
                    }
                );
        }
    }

}
