import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ 
	name: 'userlistFilter',
	pure: false
})

export class UserlistFilterPipe implements PipeTransform{
	transform(userlist, args) {
		if(userlist == null) return null;	
		var newUserList = userlist.filter(user => user.username.toLowerCase().indexOf(args.toLowerCase()) !== -1);
		function sortUserlist(a,b){
			if(~a.username.indexOf('Your Chappie')) return -1;
			return 1;
		}
		return newUserList.sort(sortUserlist);
	} 
} 