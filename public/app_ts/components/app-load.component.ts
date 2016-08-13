import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
	selector: 'app-load',
	templateUrl: `./templates/app-load.html`,
	styles: [`
	p{
		font-size: 30px;
		color: #fff;
		text-align: center;
	}
	`]
})

export class AppLoadComponent{
	constructor(private router: Router){} 
}  