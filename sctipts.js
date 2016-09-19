function geolocationSuccess(position) {
	getWeatherDataWithCoords(position.coords.latitude, position.coords.longitude)
}
  
function geolocationError(err) {
	alert("Your current location is impossible to define. Check your location privacy settings.\n"+"Failure reason: "+err.message+"\nError code: "+err.code);
}

function locateMe() {
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	} 
}

function locateMeAfterWebsiteLoad() {
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(geolocationSuccess);
	} 
}

var weekday = []; weekday[0]=  "Sunday"; weekday[1] = "Monday"; weekday[2] = "Tuesday"; weekday[3] = "Wednesday"; weekday[4] = "Thursday"; weekday[5] = "Friday"; weekday[6] = "Saturday";
var month = []; month[0] = "January"; month[1] = "February"; month[2] = "March"; month[3] = "April"; month[4] = "May"; month[5] = "June"; month[6] = "July"; month[7] = "August"; month[8] = "September"; month[9] = "October"; month[10] = "November"; month[11] = "December";

function getPresentDate() {
	var presentDate = new Date();
	$(".secondRow .el1 .position .date").html(weekday[presentDate.getDay()]+",&nbsp;"+month[presentDate.getMonth()]+"&nbsp;"+presentDate.getDate());
}

function replaceValues(values) {
	$(values).find('current').each(function(){
		$(".temp .currentTemp .currentTempValue").html(Number($(this).children('temperature').attr('value')).toFixed(1));
		$(".temp .otherTemp .min .minValue").html(Math.round($(this).children('temperature').attr('min')));
		$(".temp .otherTemp .max .maxValue").html(Math.round($(this).children('temperature').attr('max')));
		var sunrise = new Date($(this).find('city').children('sun').attr('rise')+"Z");
		var sunset = new Date($(this).find('city').children('sun').attr('set')+"Z");

			if(sunrise.getMinutes() <=9) {
				$(".other .sunrise .sunriseValue").html(sunrise.getHours()+":0"+sunrise.getMinutes());
			} else {
				$(".other .sunrise .sunriseValue").html(sunrise.getHours()+":"+sunrise.getMinutes());
			}
			if(sunset.getMinutes() <=9) {
				$(".other .sunset .sunsetValue").html(sunset.getHours()+":0"+sunset.getMinutes());
			} else {
				$(".other .sunset .sunsetValue").html(sunset.getHours()+":"+sunset.getMinutes());	
			}
			
		$(".other .iconForMobile").html("<i class=\"owf owf-5x owf-"+$(this).children('weather').attr('number')+"\"></i>");
		$(".firstRow .el1").html("<i class=\"owf owf-5x owf-"+$(this).children('weather').attr('number')+"\"></i>");
		$(".secondRow .el1 .main").html($(this).children('weather').attr('value'));
		$(".cityValue").html($(this).children('city').attr('name'));
		$(".country").html($(this).find('city').children('country').text());				
		$(".pressure .pressureValue").html($(this).children('pressure').attr('value'));
		$(".cloud .cloudValue").html($(this).children('clouds').attr('value'));
		$(".cloud .cloudNameValue").html($(this).children('clouds').attr('name'));
		$(".humidity .humidityValue").html($(this).children('humidity').attr('value'));
		$(".wind .windName").html($(this).find('wind').children('speed').attr('name'));
		$(".wind .windSpeed").html($(this).find('wind').children('speed').attr('value'));
		$(".windDirection .windDirectionValue").html($(this).find('wind').children('direction').attr('name'));
	})
}

function replaceValuesForecast(valueForecast) {
	var forecastDay = [];
	var forecastIconValue = [];
	var forecastName = [];
	var forecastTempValue = [];
				
	$(valueForecast).find('weatherdata').each(function(){
		$(this).children('forecast').find('time').each(function(){
			var data = new Date(Date.parse($(this).attr('from')));
			if(data.getHours() == 12 || data.getUTCHours() == 12) {
				forecastDay.push(data);
				forecastIconValue.push($(this).children('symbol').attr('number'));
				forecastName.push($(this).children('symbol').attr('name'));
				forecastTempValue.push($(this).children('temperature').attr('value'));
			}
		});
		for(var i=0; i<5; i++) {
			if((Number(forecastDay[i].getMonth())+1)<=9) {
				$(".days .day"+(i+1)+" .dayDate").html(forecastDay[i].getDate()+".0"+(Number(forecastDay[i].getMonth())+1));
			} else {
				$(".days .day"+(i+1)+" .dayDate").html(forecastDay[i].getDate()+"."+(Number(forecastDay[i].getMonth())+1));	
			}
			$(".days .day"+(i+1)+" .dayIcon").html("<i class=\"owf owf-"+forecastIconValue[i]+"-d owf-3x\"></i>");
			$(".days .day"+(i+1)+" .dayDesc").html(forecastName[i]);
			$(".days .day"+(i+1)+" .dayTemp .dayTempValue").html(Math.round(forecastTempValue[i]));
		}
	})
}

function getWeatherData(location) {
	$.ajax({
		url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?",
		data: {
			appid: "d61ab39e194601d1b22900cb1c698aa5",
			q: location,
			units: "metric",
			mode: "xml"
		},
		success: function(apiResponse) {
			console.log(apiResponse);
			replaceValues(apiResponse);
		},		
	})
	getPresentDate();
		
	$.ajax({
		url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast?",
		data: {
			appid: "d61ab39e194601d1b22900cb1c698aa5",
			q: location,
			units: "metric",
			mode: "xml"
		},
		success: function(apiResponse2) {
			replaceValuesForecast(apiResponse2)
		},		
	})	
}

function getWeatherDataWithCoords(latitude, longitude) {
	$.ajax({
		url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?",
		data: {
			appid: "d61ab39e194601d1b22900cb1c698aa5",
			lat: latitude,
			lon: longitude,
			units: "metric",
			mode: "xml"
		},
		success: function(apiResponse) {
			replaceValues(apiResponse);
		},		
	})
	getPresentDate();
		
	$.ajax({
		url: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast?",
		data: {
			appid: "d61ab39e194601d1b22900cb1c698aa5",
			lat: latitude,
			lon: longitude,
			units: "metric",
			mode: "xml"
		},
		success: function(apiResponse2) {
			replaceValuesForecast(apiResponse2)
		},		
	})
}

function inputActions(elem, event) {
	event.stopPropagation();
	$(elem).parents(".input-form").children("label").css({
		"font-size" : "13px"
	})
	$(elem).parents(".input-form").children("label").addClass("labelActive");
	$(elem).parents(".input-form").children(".prefix").addClass("prefixActive");
}

var regex = /^[a-z]|\s[a-z]|-[a-z]/gm;

function filterValue(input) {
	input.value = input.value.replace(regex, function(match) {
		return correct(match);
	});
};

function correct(word) {
	var corrected = word.toUpperCase();
	return corrected;
};
	
$(document).ready(function() {
 	getWeatherData("Warszawa");
	locateMeAfterWebsiteLoad();

	$( ".input-form input" ).focus(function(event) { //in case of going to the next input by tab key
		inputActions(this, event)
	});
	$( ".input-form input" ).click(function(event) {
		inputActions(this, event)
	});
	
	$("body").click(function() {
		if($(".inp").val() == "") {	
			$(".input-form:first-child label").css({
				"font-size" : "16px" })
			$(".input-form:first-child label").removeClass("labelActive");
			$(".input-form:first-child .prefix").removeClass("prefixActive")
		} 
		if($(".inp2").val() == "") {	
			$(".input-form:nth-child(2) label").css({
				"font-size" : "16px" })
			$(".input-form:nth-child(2) label").removeClass("labelActive");
			$(".input-form:nth-child(2) .prefix").removeClass("prefixActive")
		}
	});
	
	$(".runSearching").click(function() {
		if($(".inp").val() == "") {
			alert('WARNING!\nYou have to select some location or use navigation icon to display weather for your current location.');	
		} else {
			if($(".inp2").val() == "") {
				getWeatherData($(".inp").val());
			} else {
				getWeatherData($(".inp").val()+","+$(".inp2").val());
			}	
		}
	});
	
	$("body").keypress(function(e) {
		if(e.keyCode === 13) {
			if($("form #inp1").val() !== "" ) {
				if($(".inp2").val() == "") {
					getWeatherData($(".inp").val());
				} else {
					getWeatherData($(".inp").val()+","+$(".inp2").val());
				}	
			}
		} 
	});
	
	$(".navIcon").click(function() {
		locateMe();
	});
	
	$(".button").css({
		"backgroundColor": "#505053",
		"color": "white"
		})
	
	$("input").keyup(function(){
		filterValue(this);
	})
	
});