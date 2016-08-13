import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import { Form } from '../models/form';

import { Router } from '@angular/router';
import { UserAuthenticateService } from '../services/user-authenticate.service';

declare let $: any;

@Component({
	selector: 'sing-in',
	templateUrl: './templates/sing-in.html',
	directives: [],
	host: {'class': 'ng-sing-in'},
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

export class SingInComponent implements OnInit{
	form: any;
	loginWithOwn: Boolean;
	constructor(private userAuthenticateService: UserAuthenticateService, private router: Router){
		this.form = new Form();
	}

	ngOnInit(){}

	testLogin(){
		let self = this; 
		this.userAuthenticateService.testLogin()
			.subscribe(function(result) {
				if (result.authenticated) {
					self.router.navigate(['/chat']);
				} else{
					console.log(result.authError);
				}
			});
	}
	logInByOwn(){
		this.loginWithOwn = true;
		this.openForm();
	}
	logInByNew(){
		this.loginWithOwn = false;
		this.openForm();
	}
	onSubmit() {
		let self = this; 
		let username = this.form.name.value;
		let password = this.form.password.value;
		if(this.form.name.isValid() && this.form.password.isValid()){
			if(this.loginWithOwn){
				this.userAuthenticateService.login(username, password)
				.subscribe(function(result) {
					self.onSubmitResult(result, self);
				});
			} else{
				this.userAuthenticateService.createAccount(username, password)
				.subscribe(function(result) {
					self.onSubmitResult(result, self);
				});
			}
		} else{
			$('.input__wrap--username').addClass('error');
			$('.input__wrap--password').addClass('error');
		}
		
	}

	onSubmitResult(result, self){
		if (result.authenticated) {
			self.router.navigate(['/chat']);
		} else{
			if(result.authError == 'username'){
				$('.input__wrap--username').addClass('error');
			}
			if(result.authError == 'password'){
				$('.input__wrap--password').addClass('error');
			}
		}
	}
	openForm(){
		$('.login__item').addClass('login__item--hided');
		$('.form__wrap').addClass('form__wrap--show');
		$('.login__title').text('Enter your data:');
	}
	closeForm(){
		this.form.name.value = '';
		this.form.password.value = '';
		$('.input__wrap').removeClass('error');
		$('.form__wrap').removeClass('form__wrap--show');
		$('.login__item').removeClass('login__item--hided');
		$('.login__title').text('How do you want to login?');
	}
	removeErrorClass(){
		$('.input__wrap').removeClass('error');
	}
	setFocusOnPassword(){
		$('.input__wrap--password input').focus();
	}
}  

