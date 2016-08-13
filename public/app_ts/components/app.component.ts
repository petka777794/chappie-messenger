import { Component, OnInit, Inject } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { AppLoadComponent } from './app-load.component'
import { SingInComponent } from './sing-in.component';
import { ChatComponent } from './chat.component';
import { UserAuthenticateService } from '../services/user-authenticate.service';
@Component({
	selector: 'ng-app',
	template: `
		<router-outlet></router-outlet>
	`,
	directives: [ChatComponent, SingInComponent, ROUTER_DIRECTIVES ],
	providers: [UserAuthenticateService],
	precompile: [AppLoadComponent, ChatComponent, SingInComponent]
})

export class AppComponent implements OnInit{
	constructor(private UserAuthenticateService: UserAuthenticateService, private router: Router){}
	isLoggedIn(res){
		let self = this;
		res.subscribe(function(result){
			let haveASession = result;
			if(!haveASession){
			self.router.navigate(['/sing-in']);
		} else {
			self.router.navigate(['/chat']);
		}
		});
	}
	ngOnInit(){
		this.isLoggedIn(this.UserAuthenticateService.isLoggedIn());
	}
}  