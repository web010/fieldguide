/* /fieldguide/js/peblcode/db_websql.js */

App.DataProvider = (function(){
	
	
	return {
		
		typeDataProvider: 'WebSQL',
		init: function() {
			this.db = window.openDatabase(App.Config.dbName, App.Config.dbVersion, App.Config.dbDisplayName, App.Config.dbMaxSize);
			console.log(App.Config.rootObjects);
		}

	}
	
})();

