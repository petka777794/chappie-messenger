import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import {localStorage} from 'localStorage';   
 
@Injectable()
export class UserAuthenticateService{
	private authenticated = false;   

	constructor(private http: Http) {
		// this.authenticated = !!localStorage.getItem('auth_token');
	}

	login(username, password) {
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
			.post( 'authentication/login', JSON.stringify({ username, password, question: 'May I come in?' }), { headers })
			.map(function(res){
				self.authenticated = res.json().authenticated;
				return res.json();
			});
	}
	testLogin(){
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
		.post( 'authentication/testLogin', JSON.stringify({question: 'May I come in?' }), { headers })
		.map(function(res){
			self.authenticated = res.json().authenticated;
			return res.json();
		});
	}
	createAccount(username, password){
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
		.post( 'authentication/create', JSON.stringify({ username, password, question: 'May I come in?' }), { headers })
		.map(function(res){
			self.authenticated = res.json().authenticated;
			return res.json();
		});
	}

	logout() {
		// localStorage.removeItem('auth_token');
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		return this.http.post('authentication/log-out', JSON.stringify({question: 'May I go out?'}), { headers })
			.map(function(res){
				self.authenticated = res.json().authenticated;
				return self.authenticated;
			}); 

	}
	isLoggedInWithoutRequest(){
		return this.authenticated;
	}
	isLoggedIn() {
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		
		return this.http.post('authentication/inspection', JSON.stringify({question: 'Is logged in?'}), { headers })
			.map(function(res){
				self.authenticated = res.json().authenticated;
				return self.authenticated;
			});
	}
}