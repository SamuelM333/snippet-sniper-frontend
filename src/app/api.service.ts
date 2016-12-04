import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ApiService {
	
	// apiUrl = "http://127.0.0.1:5000";
	// apiUrl = "http://api.snippet-sniper.samuelmurillo.me";
	apiUrl = "http://snippetsniperphp-samuelm333.rhcloud.com";
	
	constructor(private http: Http) { }
	
	getSnippets() {
		return this.http.get(this.apiUrl + '/snippet?embedded={"owner":1}').map(
			(response: Response) => response.json()
		);
	}
	
	getSnippetByID(id: String) {
		return this.http.get(this.apiUrl + '/snippet/' + id + '?embedded={"owner":1}').map(
			(response: Response) => response.json()
		);
	}
	
	getUserByEmail(id: String) {
		return this.http.get(this.apiUrl + '/user/' + id).map(
			(response: Response) => response.json()
		);
	}
	
	insertUser(name: String, last_name: String, email: String, hashed_password: String) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		
		let user = {
			"name": name,
			"last_name": last_name,
			"email": email,
			"password": hashed_password,
			"date": new Date().toISOString().slice(0, 19).replace('T', ' ')
		}
		
		return this.http.post(this.apiUrl + '/user', JSON.stringify(user), {
			headers: headers
		}).map((data: Response) => data.json());
	}
	
}
