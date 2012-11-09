/* /js/peblcode/config.js */


 App.Config =  {
    syncURL: "/api/koppertfieldguide",
    dbName: "koppertfieldguide",
    dbVersion: "1.0",
    dbDisplayName: "Koppert Field Guide",
    dbMaxSize: "65536",
    masterModels: ['beneficials','chemicals','tradenames','pestgroups','pests'],
    masterData: {},//wordt gevuld in app/View/Mobile/jqueryMobile.ctp
    referenceModels: ['tradename_beneficials','beneficial_pests','beneficial_chemicals'],
    modifiedTables: ['lastmodified'],
};
