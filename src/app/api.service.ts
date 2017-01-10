import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Snippet } from './snippets/snippet';
import { User } from './profile/user';

export const apiUrl = 'https://snippetsniperphp-samuelm333.rhcloud.com';

@Injectable()
export class ApiService {

    // apiUrl = 'http://127.0.0.1:5000';
    // apiUrl = 'http://api.snippet-sniper.samuelmurillo.me';


    constructor(private http: Http) { }

    getSnippets() {
        return this.http.get(apiUrl + '/snippet').map(
            (response: Response) => response.json()
        );
    }

    getSnippetByID(idSnippet: string, authEmail: string, password: string) {

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (authEmail && authEmail !== '') {
            headers.append('Authorization', 'Basic ' + btoa(authEmail + ':' + password));
        }

        return this.http.get(apiUrl + '/snippet/' + idSnippet, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    getSnippetsSharedWithMe(email: string, password: string) {

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ':' + password)
        });

        return this.http.get(apiUrl + '/snippet?shared=' + email, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    getSnippetsByUser(email: string, authEmail: string, password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(authEmail + ':' + password)
        });

        return this.http.get(apiUrl + '/snippet?owner=' + email, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    submitSnippet(snippet: Snippet, type: string, allowed_users: User[]) {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let data = {
            'user': snippet.idUser,
            'title': snippet.title,
            'type': type,
            'created': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'edited': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'fragments': snippet.body,
            'allowed_users': allowed_users
        };

        return this.http.post(apiUrl + '/snippet', JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    deleteSnippet(idSnippet: string, authEmail: string, password: string) {

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (authEmail && authEmail !== '') {
            headers.append('Authorization', 'Basic ' + btoa(authEmail + ':' + password));
        }

        return this.http.delete(apiUrl + '/snippet/' + idSnippet, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    getSnippetsStatistic(statistic: string, authEmail: string, password: string){
        // statistic can be public, closed or private

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (authEmail && authEmail !== '') {
            headers.append('Authorization', 'Basic ' + btoa(authEmail + ':' + password));
        }

        return this.http.get(apiUrl + '/snippet?statistics=' + statistic, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    getUserByEmail(email: string) {
        return this.http.get(apiUrl + '/user/' + email).map(
            (response: Response) => response.json()
        );
    }

    insertUser(name: string, last_name: string, email: string, hashed_password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let data = {
            'name': name,
            'last_name': last_name,
            'email': email,
            'password': hashed_password,
            'date': new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        return this.http.post(apiUrl + '/user', JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    updateProfileInformation(name: string, last_name: string, email: string, new_email: string, password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ':' + password)
        });

        let data = {
            'name': name,
            'last_name': last_name,
            'email': new_email
        };

        return this.http.patch(apiUrl + '/user/' + email, JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    updatePassword(email: string, old_password: string, new_password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(email + ':' + old_password)
        });

        let data = {
            'old_password': old_password,
            'new_password': new_password
        };

        return this.http.patch(apiUrl + '/user/' + email, JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    changeUserState(email: string, state: boolean, authEmail: string, password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(authEmail + ':' + password)
        });

        let data = {
            'state': state ? 1 : 0
        };

        return this.http.patch(apiUrl + '/user/' + email, JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    changeUserAdmin(email: string, admin: boolean, authEmail: string, password: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(authEmail + ':' + password)
        });

        let data = {
            'admin': admin ? 1 : 0
        };

        return this.http.patch(apiUrl + '/user/' + email, JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

    getUsersStatistic(statistic: string, authEmail: string, password: string){
        // statistic can be public, closed or private

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (authEmail && authEmail !== '') {
            headers.append('Authorization', 'Basic ' + btoa(authEmail + ':' + password));
        }

        return this.http.get(apiUrl + '/user?statistics=' + statistic, { headers: headers }).map(
            (response: Response) => response.json()
        );
    }


    sendMail(name: string, email: string, message: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        let data = {
            'name': name,
            'email': email,
            'message': message
        };

        return this.http.post(apiUrl + '/mail', JSON.stringify(data), { headers: headers }).map(
            (response: Response) => response.json()
        );
    }

}
