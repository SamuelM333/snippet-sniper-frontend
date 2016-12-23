import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { Snippet } from './snippets/snippet';

@Injectable()
export class ApiService {

    // apiUrl = 'http://127.0.0.1:5000';
    // apiUrl = 'http://api.snippet-sniper.samuelmurillo.me';
    apiUrl = 'http://snippetsniperphp-samuelm333.rhcloud.com';

    constructor(private http: Http) {
    }

    getSnippets() {
        return this.http.get(this.apiUrl + '/snippet?embedded={"idUser":1}').map(
            (response: Response) => response.json()
        );
    }

    getSnippetByID(id: string) {
        return this.http.get(this.apiUrl + '/snippet/' + id).map(
            (response: Response) => response.json()
        );
    }

    submitSnippet(snippet: Snippet){
        let headers = new Headers({'Content-Type': 'application/json'});

        let s = {
            'user': snippet.idUser,
            'title': snippet.title,
            'created': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'edited': new Date().toISOString().slice(0, 19).replace('T', ' '),
            'fragments': snippet.body
        };

        return this.http.post(this.apiUrl + '/snippet', JSON.stringify(s), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

    getUserByEmail(id: string) {
        return this.http.get(this.apiUrl + '/idUser/' + id).map(
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

        return this.http.post(this.apiUrl + '/idUser', JSON.stringify(user), {headers: headers}).map(
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

        return this.http.post(this.apiUrl + '/mail', JSON.stringify(mail), {headers: headers}).map(
            (data: Response) => data.json()
        );
    }

}
