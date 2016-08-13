import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user'; 


@Injectable()
export class UserDataService{
	currentUser: User;
	currentOpponent: User;
	constructor(private http: Http){
		this.currentOpponent = new User('Your Chappie', '57af152f44cf04700a5e5828');

	}
	getCurrentUser(){
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http
			.post('chat/user', JSON.stringify({question: 'May I get current user?'}), { headers })
			.map(function(res){
				self.currentUser = new User(res.json()._id, res.json().username);
				return self.currentUser;
			})
	}
	getUserList(){
		let self = this;
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http
		.post( 'chat/userlist', JSON.stringify({question: 'May I get userlist?'}), { headers })
		.map(function(res){
			return res.json();
		})
	}
	changeCurrentOpponent(user){
		this.currentOpponent = user;
	}
}