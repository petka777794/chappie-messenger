import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ 
	name: 'userlistFilter',
	pure: false
})

export class UserlistFilterPipe implements PipeTransform{
	transform(userlist, args) {
		if(userlist == null) return null;	
		return userlist.filter(user => user.username.toLowerCase().indexOf(args.toLowerCase()) !== -1);
	}
} 