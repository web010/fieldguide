/* /fieldguide/js/bootstrap.js */

var App = {};

var useDB;
console.log('xx useDB = ');
if (Modernizr.websqldatabase) {
	useDB = true;
	console.log(useDB);
} else {
	useDB = false;
	console.log(useDB);
}
