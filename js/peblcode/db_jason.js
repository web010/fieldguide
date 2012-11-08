/* db_jason.js */

App.DataProvider = (function(){	
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
		find: function (model, type, options){
			
			var model = model || 'undefined';
			var type = type || 'undefined';
			var options = options || 'undefined';
			
			
			console.log('model: ' + model + ' type:' + type + ' options' + options);
			
		}
	}
	
})();

