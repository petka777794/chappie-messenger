import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { Router } from '@angular/router';
import { UserlistFilterPipe } from '../pipes/userlist-filter.pipe';
import { User } from '../models/user';

declare let $: any;
declare let io: any;

@Component({
	selector: 'chat-list',
	templateUrl: './templates/chat-list.html',
	pipes: [UserlistFilterPipe], 

})

export class ChatListComponent implements OnInit{
	searchInputQuery = '';
	userlist: User[];
	@Output() onChangeCurrentOpponent = new EventEmitter();
	@Output() onLogOut = new EventEmitter();
	constructor(
		private userDataService: UserDataService, 
		private userAuthenticateService: UserAuthenticateService, 
		private router: Router)
	{

	}
	ngOnInit(){
		this.getUserList();
		this.includeFrontendPlugins();
	}
	getUserList(){
		let self = this;
		this.userDataService.getUserList().subscribe(function(result){
			self.userlist = result;
		});
	}
	logOut(){
		let self = this;
		this.onLogOut.emit({disconnected: true});
		this.userAuthenticateService.logout().subscribe(function(results){
			if(!results){
				self.router.navigate(['/sing-in']);
			}
		});
	}
	changeCurrentOpponent(data){
		this.userDataService.changeCurrentOpponent(data);
		this.onChangeCurrentOpponent.emit(data);
		this.closeMenu();
	}
	closeMenu(){
		document.querySelector('.menu__wrap').classList.remove('visable');
		setTimeout(function(){
			document.querySelector('.main__menu').classList.remove('main__menu--open');
		}, 300);
	}
	includeFrontendPlugins(){
		$('.menu__users.custom-scroll').niceScroll({
			cursorcolor: '#fefefe',
			hidecursordelay: 200,
			cursorwidth: 3,
			cursorborderradius: 0
		});
	}
}