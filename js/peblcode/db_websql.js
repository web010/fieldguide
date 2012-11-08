/* /fieldguide/js/peblcode/db_websql.js */

App.DataProvider = (function(){
	
	
	return {
		
		typeDataProvider: 'WebSQL',
		init: function() {
			this.db = window.openDatabase(App.config.dbName, App.config.dbVersion, App.config.dbDisplayName, App.config.dbMaxSize);
			console.log(App.Config.rootObjects);
		}

	}
	
})();

