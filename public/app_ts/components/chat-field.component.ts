import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';

import { UserDataService } from '../services/user-data.service';
import { User } from '../models/user';
import { MessagesFilterPipe } from '../pipes/messages-filter.pipe';
import { Router } from '@angular/router';

declare let $: any;
declare let autosize: any;
declare let io: any;

@Component({
	selector: 'chat-field',  
	templateUrl: './templates/chat-field.html',
	pipes: [MessagesFilterPipe], 
	animations: [
	trigger('fadeIn', [
		state('in', style({transform: 'translateY(0)', opacity: 1})),
		transition('void => *', [
			style({transform: 'translateY(10px)', opacity: 0}),
			animate('250ms linear')
			]),
		transition('* => void', [
			animate('10ms linear', style({opacity: 0}))
			])
		])
	]
})


export class ChatFieldComponent implements OnInit, OnChanges{
	@Input() currentOpponent;
	@Input() disconnection;

	currentUser: User;
	messageInputQuery: string;
	socket: any;
	dialog: any[];

	connected: boolean;

	constructor(private router: Router, private userDataService: UserDataService){
		let self = this
		this.connected = false;
		this.messageInputQuery = '';
		this.socket = io.connect();
		this.socket.on('connect', () => this.joinDialog());
		this.socket.on('joined to dialog', (data) => this.getDialog(data)); 
		this.socket.on('message', (data) => this.getMessage(data));
		this.socket.on('disconnect dialog', () => this.router.navigate(['/sing-in']));
	}
	ngOnInit(){
		this.includeFrontendPlugins(); 
	}
	ngOnChanges(changes: {[propertyName: string]: SimpleChange}){

		if(changes['currentOpponent'] && this.connected){
			if(changes['currentOpponent'].currentValue){
				this.joinDialog(); 
			}
		}

		if (changes['disconnection']){
			if (changes['disconnection'].currentValue) {
				this.disconnectDialog();
			} 
		}
	}

	openMenu($event){
		document.querySelector('.main__menu').classList.add('main__menu--open');
		setTimeout(function(){
			document.querySelector('.menu__wrap').classList.add('visable');
			document.querySelector('.chat__search').focus(); 
		}, 300);
	}  

	includeFrontendPlugins(){
		$('.chat__history--wrap.custom-scroll').niceScroll({
			cursorcolor: '#fefefe',
			horizrailenabled: false,
			hidecursordelay: 200,
			railoffset: { 
				left: +(-4)
			},  
			cursorwidth: 3,
			cursorborderradius: 0
		});
		$('#chat__textarea').niceScroll({ 
			cursorcolor: '#db504a'
		});
		autosize($('#chat__textarea'));
	}

	joinDialog(){
		this.socket.emit('join dialog', this.userDataService.currentOpponent._id);
		this.connected = true;
	}
	// leaveDialog()

	disconnectDialog(){
		this.socket.emit('disconnect dialog');
		this.connected = false;
	}

	getDialog(data){
		let self = this;
		this.dialog = data;
		setTimeout(function(){
			self.scrollBottom();
		}, 1000)
	}

	sendMessage($event){
		$event.preventDefault();
		if (this.messageInputQuery !== ''){
			this.socket.emit('message', this.messageInputQuery);
		}
		this.messageInputQuery = '';
		$('#chat__textarea').css('height', '33px');
	}

	getMessage(data){
		this.dialog.push(data);
		$('.chat__history--wrap.custom-scroll').getNiceScroll().resize();
		this.scrollBottom();
	}

	addMessageClass(phrase){
		if (this.userDataService.currentOpponent._id == phrase.userId){
			return {textClass: 'messadge--get', iconClass: 'fa-user-secret'}
		} 
		else{
			return {textClass: 'messadge--send', iconClass: 'fa-user'}
		}
	}

	scrollBottom(){
		$('.chat__history--wrap.custom-scroll').animate({
			scrollTop: $('.chat__history').height()
		}, 1000);
	}
}  