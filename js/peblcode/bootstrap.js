/* /js/peblcode/bootstrap.js */


var App = {};

App.userPreference = {};//json object om preference van user (useDB or not) in localStorage te plaatsen/op te halen
App.useDB;//database wordt wel of niet gebruikt?


if(localStorage.userPreference){
	var localStorageUserPreference = JSON.parse(localStorage.userPreference);
	App.useDB = localStorageUserPreference['useDB'];
}else if(!Modernizr.websqldatabase){
	App.useDB = false;
	App.userPreference['useDB'] = App.useDB;	
	localStorage.userPreference = JSON.stringify(App.userPreference);
}
