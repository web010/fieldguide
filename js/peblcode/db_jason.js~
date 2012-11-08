
/*
 * Constructor lijkt nu niet nodig. Het is of jason of websql js die ingeladen wordt. 
 * In dat geval kan het object meteen in de flow geinit worden zonder een new constructor
 * MAAR dan moeten de namen van de objecten precies het zelfde zijn.
 * var dbObj = new db_jason is niet meet mogelijk
 * en verder zou ik eigenlijk het object een onderdeel willen zijn van de app namespace
 * dus eerst moet het app object ingeladen worden (maar maakt geen onderdeel uit van dit bestand)
 * Het is allemaal experimenteel dus ik moet eerst de principe werking uit testen
 * 
 */



App.DataProvider = (function(){
	
	
	return {
		
		typeDataProvider: 'Jason',
		
		init: function() {
			
			console.log('init DataProvider van het type ' + this.typeDataProvider);
			
		}

	}
	
})();






/*
App.dataProvider = {};





var DataProvider = {};

DataProvider.Beneficials = {
	
	find: function(){
		App.Config.rootTables['beneficials']; // voor jason arrys deze concrere implementatie
		sql = 'Select * From beneficials';	// voor web sql db  deze concrere implementatie
	}	
}; 


DataProvider.Chemicals = {};
DataProvider.Tradenames = {};

var Models = {
	"Beneficials" : DataProvider.Beneficials,
	"Chemicals" : DataProvider.Chemicals,
	
};



DataProvider.prototype.find(model, type, options){
	var obj = Models[model];
	
	return //returnType resultset
}

*/