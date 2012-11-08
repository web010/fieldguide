/* db_websql.js */


App.DataProvider = (function(){
	
	// myprivatevar_1 : true,
	// myprivatefunction : function(){}
	
	// elke var of function die niet in het return block zitten zijn
	// private voor App.DataProvider en dus niet bereikbaar van buitenaf
	
	return {
		
		typeDataProvider: 'WebSQL',
		
		/*
		 *  INTERFACE init()
		 */
		init: function() {
			this.db = window.openDatabase(App.Config.dbName, App.Config.dbVersion, App.Config.dbDisplayName, App.Config.dbMaxSize);
			console.log(App.Config.rootObjects);
		},
		/*
		 *  INTERFACE find()
		 *
		 * @param model: string hash array, App.Config.models[string modelname]
		 * @param type: string, type first|count|all|list|
		 * @param options: string hash array , ['conditions'] = {  'Model.field' : 'value'}}, ['field'] = {'Model.field1', 'Model.field2'}, order|limit|recursive Extra: distinct
		 * 
		 */
		find: function (model, type, options){
			
			var model = model || 'undefined';
			var type = type || 'undefined';
			var options = options || 'undefined';
			
			
			console.log('model: ' + model + ' type:' + type + ' options' + options);
			
		}

	}
	
})();

