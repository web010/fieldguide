/* /js/peblcode/bootstrap.js */


var App = {};

var userPreference = {};//json object om preference van user (useDB or not) in localStorage te plaatsen/op te halen
var useDB;//database wordt wel of niet gebruikt?


if(localStorage.userPreference){
	var localStorageUserPreference = JSON.parse(localStorage.userPreference);
	useDB = localStorageUserPreference['useDB'];
}else if(!Modernizr.websqldatabase){
	useDB = false;
	userPreference['useDB'] = useDB;	
	localStorage.userPreference = JSON.stringify(userPreference);
}
