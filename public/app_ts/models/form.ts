export class Form{
	name: Object;
	password: Object;
	constructor(name = '', password = ''){
		this.name = {
			value: name,
			valid: true,
			isValid: function(){
				if (this.value.length > 2) {
					return true;
				}  else{
					return false;
				} 
			}
		};
		this.password = {
			value: password,
			valid: true,
			isValid: function(){
				if (this.value.length > 2) {
					return true;
				}  else{
					return false;
				} 
			}
		}
	}
}