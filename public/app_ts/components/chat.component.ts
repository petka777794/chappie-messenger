import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';


import { ChatFieldComponent } from './chat-field.component';
import { ChatListComponent } from './chat-list.component';
import { User } from '../models/user';

@Component({
	selector: 'chat',
	templateUrl: './templates/chat.html',
	providers: [UserDataService],
	directives: [ChatFieldComponent, ChatListComponent],
	animations: [
	trigger('fadeIn', [
		state('in', style({transform: 'translateY(0)', opacity: 1})),
		transition('void => *', [
			style({transform: 'translateY(10px)', opacity: 0}),
			animate('250ms linear')
			]),
		transition('* => void', [
			animate('250ms linear', style({opacity: 1}))
			])
		])
	]
})

export class ChatComponent implements OnInit{ 
	currentOpponent: User;
	disconnection: Boolean;
	constructor(
		private userAuthenticateService: UserAuthenticateService, 
		private router: Router, 
		private userDataService: UserDataService)
	{
		this.currentOpponent = this.userDataService.currentOpponent;
		this.disconnection = false;
	}
	onChangeCurrentOpponent(event){
		this.currentOpponent = this.userDataService.currentOpponent;
	}
	onLogOut(event){
		this.disconnection = true;
	}
	ngOnInit(){
		this.isLoggedIn(); 
	}
	isLoggedIn(){
		if(!this.userAuthenticateService.isLoggedInWithoutRequest()){
			this.router.navigate(['/sing-in']);
		}
	}
}