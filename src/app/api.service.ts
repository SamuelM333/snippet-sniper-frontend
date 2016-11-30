import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ApiService {
	
	apiUrl = "http://127.0.0.1:5000";
	// apiUrl = "http://api.snippet-sniper.samuelmurillo.me";
	
	constructor(private http: Http) { }
	
	getSnippets() {
		return this.http.get(this.apiUrl+'/snippet?embedded={"owner":1}').map(
			(response: Response) => response.json()
		);
	}
	
	getSnippetByID(id: String) {
		return this.http.get(this.apiUrl+'/snippet/' +id + '?embedded={"owner":1}').map(
			(response: Response) => response.json()
		);
	}
	
	getUserByID(id: String) {
		return this.http.get(this.apiUrl+'/user/' + id).map(
			(response: Response) => response.json()
		);
	}
	
}
