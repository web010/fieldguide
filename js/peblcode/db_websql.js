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
			console.log(App.Config.masterData);
		},
		/*
		 *  INTERFACE find()
		 *
		 * @param model: string hash array, App.Config.masterModels[string modelname]
		 * @param type: string, type first|count|all|list|
		 * @param options: string hash array , ['conditions'] = {  'Model.field' : 'value'}}, ['field'] = {'Model.field1', 'Model.field2'}, order|limit|recursive Extra: distinct
		 * 
		 */
		find: function (model, type, options, koe){
			
			var model = model || 'undefined';
			var type = type || 'undefined';
			var options = options || 'undefined';
			
			this.db.transaction(
            function(tx) {
                var sql = "SELECT * FROM "+model;
                tx.executeSql(sql, this.txErrorHandler,
                    function(tx, results) {
                    	if(type == 'list'){// list vraagt retval[id] = name
                    		var len = results.rows.length,
                        retval = {},
                            i = 0;
                        for (; i < len; i = i + 1) {
                            retval[results.rows.item(i).id] = results.rows.item(i).name;
                        }
                      }else{
                      	var len = results.rows.length,
                        retval = [],
                            i = 0;
                      	for (; i < len; i = i + 1) {
                            retval[i] = results.rows.item(i);
                        }
                      }
                      koe(retval);
                    }
                );
            }
        );
			console.log('model: ' + model + ' type:' + type + ' options' + options);
			
		}

	}
	
})();
