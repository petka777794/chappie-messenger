import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({ 
	name: 'messagesFilter',
	pure: false
})

export class MessagesFilterPipe implements PipeTransform{
	transform(dialog) {
		if(dialog == null) return null;	

		return dialog
			.filter((phrase) =>  phrase.message !== '');
	}
}  