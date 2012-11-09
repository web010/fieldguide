/* db_jason.js */

App.DataProvider = (function(){
	
	// myprivatevar_1 : true,
	// myprivatefunction : function(){},
	
	// elke var of function die niet in het return block zitten zijn
	// private voor App.DataProvider en dus niet bereikbaar van buitenaf	
	return {
		
		typeDataProvider: 'Jason',
		
		/*
		 *  INTERFACE init()
		 */
		init: function() {
			
			console.log('init DataProvider van het type ' + this.typeDataProvider);
			
		},
		/*
		 * INTERFACE find()
		 *
		 * @param model: string hash array, App.Config.models[string modelname]
		 * @param type: string, type first|count|all|list|
		 * @param options: string hash array , ['conditions'] = {  'Model.field' : 'value'}}, ['field'] = {'Model.field1', 'Model.field2'}, order|limit|recursive Extra: distinct
		 * 
		 */
		find: function (model, type, options, callback){
			
			var model = model || 'undefined';
			var type = type || 'undefined';
			var options = options || 'undefined';
			var retval;
			if(type == 'list'){
				retval = App.Config.masterData[model];			
			}
			callback(retval);
			console.log('model: ' + model + ' type:' + type + ' options' + options);
			
		}
	}
	
})();

