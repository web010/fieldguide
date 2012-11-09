/* /js/peblcode/app.js */


$(document).bind( "pageinit", function() {
	/*
		* if statement heeft 3 opties:
		* 1. Bekende user is gebruiker van webSQL
		* 2. Nieuwe user met browser met webSQL; user heeft dan keuze dit al of niet te gebruiken
		* 3. User kan of wil webSQL niet gebruiken; is de rest	
	*/
	if(useDB){
		$('h1').append(' (off-line)');
		App.Config.masterData = {};
	}else if(Modernizr.websqldatabase){
		$('#useDB').css({'visibility' : 'visible', 'display' : 'block'});
		$('#noDB').empty();		
	}else{
		$('#noDB').css({'visibility' : 'visible', 'display' : 'block'});
		$('#useDB').empty();
		$('h1').append(' (on-line)');
	}
});


$('#initDB').on('click', function() {
    App.dao.initialize(function() {
    		console.log('database initialized');
    		useDB = true;
    		userPreference['useDB'] = true;	
    		localStorage.userPreference = JSON.stringify(userPreference);
    });
});
// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
		
		if ( typeof data.toPage === "string" ) {
			var u = $.mobile.path.parseUrl( data.toPage );
			
			if ( u.pathname.search("products") !== -1 || u.pathname.search("pests") !== -1 || u.pathname.search("sideeffects") !== -1) {
				if ( u.pathname.search("products") !== -1)
				{
					getSourceData('tradenames', function(contentAr){
							buildList( u.href, data.options, contentAr, 'product');
					});
					e.preventDefault();
				}else if(u.pathname.search("pests") !== -1){
					getSourceData('pestgroups', function(contentAr){
							buildList( u.href, data.options, contentAr, 'pest');
					});
					e.preventDefault();
				}else if(u.pathname.search("sideeffects") !== -1){
					getSourceData('beneficials', function(contentAr){							
							buildList( u.href, data.options, contentAr, 'beneficial');
					});
					e.preventDefault();
				}
			}else if(u.pathname.search("product") !== -1){
				showDetail( u, data.options,'product');
				
				e.preventDefault();
			}else if(u.pathname.search("pest") !== -1){
				showDetail( u, data.options,'pest');
				
				e.preventDefault();
			}else if(u.pathname.search("beneficial") !== -1){
				showDetail( u, data.options,'beneficial');
				
				e.preventDefault();
			}
			$.mobile.silentScroll();
		}
});

function getSourceData(model, callback){
	var searchOptions = {};
	App.DataProvider.find(model,'list',searchOptions,function(retval){//list levert array[id] = name	
				callback(retval);
		});
}

function buildList( url, options, contentAr, linkname)
{
	var list = '<div class="ui-block-a"><ul data-role="listview" data-inset="true" data-filter="true">';
	$.each(contentAr, function(key,val){
			list += '<li><a href="/'+linkname+'/'+key+'">'+val+'</a></li>';
	});
	list += '</ul></div><div class="ui-block-b" id="myDetail">...</div>';
	
	var $page = $( "#myPage" ),
	
	$header = $page.children( ":jqmData(role=header)" ),
	
	$content = $page.children( ":jqmData(role=content)" ),
	
	markup = list;

	//$header.find( "h1" ).html('hoi');
	
	$content.html( markup );

	$page.page();

	// Enhance the listview we just injected.
	$content.find( ":jqmData(role=listview)" ).listview();

	// We don't want the data-url of the page we just modified
	// to be the url that shows up in the browser's location field,
	// so set the dataUrl option to the URL for the category
	// we just loaded.
	options.dataUrl = url;

	// Now call changePage() and tell it to switch to
	// the page we just modified.
	$.mobile.changePage( $page, options );
}

function showDetail( u, options,item)
{
	var path = u.pathname.split('/');
	var detail = '';
	var detail_id = path[path.length-1];
	if(item == 'product'){
		
		if(detail_id in tradenameBeneficials){
			buildProduct(u, options,detail_id);
		}else{
				tradenameBeneficials[detail_id] = [];
				$.getJSON( '/product.json?id='+detail_id,function( data ) {
				if ( data['tradenameBeneficials']) {
					$.each(data['tradenameBeneficials'][detail_id], function(key,beneficial_id){
							
							tradenameBeneficials[detail_id].push(beneficial_id);
							if(beneficial_id in beneficialPests){
								//beneficialPests.push(beneficial_id);
								beneficialPests[beneficial_id] = [];
								
								//beneficialChemicals.push(beneficial_id);
								beneficialChemicals[beneficial_id] = [];
								$.getJSON( '/beneficial.json?id='+beneficial_id,function( data ) {
									if ( data['beneficialPests']) {
										$.each(data['beneficialPests'][beneficial_id], function(key,pest_id){
												beneficialPests[beneficial_id].push(pest_id);
										});
										}
										if ( data['beneficialChemicals']) {
										$.each(data['beneficialChemicals'][beneficial_id], function(key,chemical_id){
												beneficialChemicals[beneficial_id].push(chemical_id);
										});
										}
									});	
							}
					});
					buildProduct(u, options,detail_id);
					}
				});
			}
		
		
	}else if(item == 'pest'){
		buildPest(u, options,detail_id);
	}else if(item == 'beneficial'){
		if(detail_id in beneficialChemicals){
			buildBeneficial(u, options,detail_id);
		}else{
				beneficialChemicals[detail_id] = [];
				$.getJSON( '/beneficial.json?id='+detail_id,function( data ) {
						if ( data['beneficialChemicals']) {
							$.each(data['beneficialChemicals'][detail_id], function(key,chemical_id){
									beneficialChemicals[detail_id].push(chemical_id);
							});
							buildBeneficial(u, options,detail_id);
						}
				});	
		}
	}
	
}
function forLoop(fillArray, forArray, sourceArray, callback) {
	var t;
	for (t = 0; t < forArray.length; ++t) {
		var myItem = sourceArray[forArray[t]];
		
		if($.inArray(myItem,fillArray) == -1){
			fillArray.push(myItem);
		}		
	}
	if(t == forArray.length)
	{
		callback(fillArray);
	}
} 
function buildProductArrays(detail_id, callback) { 
	var lists = {};
	lists['myPests'] = [];
	lists['myBeneficials'] = [];
	lists['myChemicals'] = [];
	var i;
	for (i = 0; i < tradenameBeneficials[detail_id].length; ++i) {
		var myBeneid = tradenameBeneficials[detail_id][i];		
		forLoop(lists['myPests'], beneficialPests[myBeneid], pests, function(retval) {  
				forLoop(lists['myChemicals'], beneficialChemicals[myBeneid], chemicals, function(retval2) { 
						lists['myPests'] = retval;
						lists['myChemicals'] = retval2; 
						lists['myBeneficials'].push(beneficials[myBeneid]);
				});
			}); 
		
  }
  if(lists['myBeneficials'].sort() && lists['myPests'].sort() && lists['myChemicals'].sort())
  {
  	callback(lists);
  }
} 
function buildBeneficialArray(detail_id, callback) { 
	var myChemicals = [];
	var i;
	forLoop(myChemicals, beneficialChemicals[detail_id], chemicals, function(retval) { 
						myChemicals = retval;
				});
  if(myChemicals.sort())
  {
  	callback(myChemicals);
  }
}
function buildProductDetail(detail_id,listArrays, callback) { 
	var detail;
	buildProductDetailList(listArrays['myBeneficials'], function(beneficialList) {
			buildProductDetailList(listArrays['myPests'], function(pestList) {
					buildProductDetailList(listArrays['myChemicals'], function(chemicalList) {
							detail = '<h3>'+tradenames[detail_id]+'</h3><h4>Natuurlijke vijanden</h4><p>'+beneficialList+'</p><h4>Tegen</h4><p>'+pestList+'</p><h4>Neveneffecten</h4><p>'+chemicalList+'</p>';
					});
			});
  }); 
	callback(detail);
}
function buildBeneficialDetail(detail_id,myChemicals, callback) {
	var detail = '<h3>Neveneffecten met '+beneficials[detail_id] +'</h3><ul data-role="listview" data-inset="true" data-filter="true">';
	$.each(myChemicals, function(key,val){
			detail += '<li><a href="/'+key+'">'+val+'</a></li>';
	});
	detail += '</ul>';
	callback(detail);
}
function buildProductDetailList(listArray, callback) {
	var list = '';
	var br = "<br />";
	var i;
	for (i = 0; i < listArray.length; ++i) {
		list += listArray[i]+br;
	}
	callback(list);
}
function buildProduct( u, options,detail_id){
	
	buildProductArrays(detail_id, function(listArrays) {  
		buildProductDetail(detail_id,listArrays, function(detail) {
			var $page = $( "#myPage" );
			$( "#myDetail" ).html(detail);
			$( "#myDetail" ).css({'padding':'15px 0 0 15px'});
			$page.page();
			options.dataUrl = u.href;
			$.mobile.silentScroll();
			$.mobile.changePage( $page, options );
    });
  }); 
}
function buildPest( u, options,detail_id){
	detail = '<h3>'+pestgroups[detail_id]+'</h3>';
	// Get the page we are going to dump our content into.
	var $page = $( "#myPage" );
	$( "#myDetail" ).html(detail);
	$( "#myDetail" ).css({'padding':'15px 0 0 15px'});
	$page.page();
	options.dataUrl = u.href;
	$.mobile.changePage( $page, options );
}
function buildBeneficial( u, options,detail_id){
	
	buildBeneficialArray(detail_id, function(myChemicals) {  
		buildBeneficialDetail(detail_id,myChemicals, function(detail) {
			var $page = $( "#myPage" );
			$( "#myDetail" ).html(detail);
			$( "#myDetail" ).css({'padding':'15px 0 0 15px'});
			$page.page();
			options.dataUrl = u.href;
			$.mobile.silentScroll();
			$.mobile.changePage( $page, options );
    });
  }); 
}


