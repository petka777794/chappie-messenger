function validTime(time){
	if(time.length<2){
		time = '0' + time;
	}
	return time;
}
function getTime(wrap){
	var date = new Date();
	var hours = date.getHours()+'';
	var minutes = date.getMinutes()+'';
	hours = validTime(hours);
	minutes = validTime(minutes);
	var time = hours + ":" + minutes;
	$(wrap).text(time);
}
function getDate(wrap){
	var date = new Date();
	var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	var month = months[date.getMonth()];
	var week = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	var weekday = week[date.getDay()];
	var today = date.getDate();
	$(wrap).text(weekday + ', ' + today + ' ' + month);
}




window.onload = function(){
	setTimeout(function(){
		$('.loader').addClass('loader--fade')
		setTimeout(function(){
			$('.iphone').removeClass('loaded');
			$('.loader').addClass('loader--hide');
			setTimeout(function(){
				$('.main__message').removeClass('loaded');
				setTimeout(function(){
					$('.iphone').addClass('vibration');
					$('.iphone-vibration__wrap').addClass('iphone-vibration__wrap--animated');
					setTimeout(function(){
						$('.screen').removeClass('loaded');
						$('.iphone-vibration__wrap').addClass('hide');
						setTimeout(function(){
							$('.wrap').removeClass('loaded');
							$('.description').removeClass('loaded');
							$('html').removeClass('loaded');
							setTimeout(function(){
								$('body').removeClass('loaded');
							}, 600);
						}, 800);
					}, 1500);
				},1000);
			},900);
		},400);
	}, 1500)

	getTime('.main__time');
	getTime('.top__time');
	getDate('.main__date');
	setInterval(function(){
		getTime('.main__time');
		getTime('.top__time');
	}, 60000);
};