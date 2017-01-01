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
            (data: Response) => data.json()
        );
    }

    getSnippetByID(id: string) {
        return this.http.get(apiUrl + '/snippet/' + id).map(
            (data: Response) => data.json()
        );
    }

    submitSnippet(snippet: Snippet, allowed_users: User[]) {
        let headers = new Headers({'Content-Type': 'application/json'});

        let post_data = {
            'user': snippet.idUser,
            'title': snippet.title,
            'created': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'edited': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'fragments': snippet.body,
            'allowed_users': allowed_users
        };

        return this.http.post(apiUrl + '/snippet', JSON.stringify(post_data), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

    getUserByEmail(email: string) {
        return this.http.get(apiUrl + '/user/' + email).map(
            (response: Response) => response.json()
        );
    }

    insertUser(name: string, last_name: string, email: string, hashed_password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});

        let user = {
            'name': name,
            'last_name': last_name,
            'email': email,
            'password': hashed_password,
            'date': new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        return this.http.post(apiUrl + '/user', JSON.stringify(user), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

    changeProfilePicture(idUser: string, email:string, profilePicture: string) {
        let headers = new Headers({'Content-Type': 'application/json'});

        let user = {
            'idUser': idUser,
            'email': email,
            'picture': profilePicture,
            'date': new Date().toISOString().slice(0, 19).replace('T', ' ')
        };

        return this.http.patch(apiUrl + '/user/' + email, JSON.stringify(user), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

    sendMail(name: string, email: string, message: string) {
        let headers = new Headers({'Content-Type': 'application/json'});

        let mail = {
            'name': name,
            'email': email,
            'message': message
        };

        return this.http.post(apiUrl + '/mail', JSON.stringify(mail), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

}
