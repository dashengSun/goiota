// Create IOTA instance with host and port as provider
//var iota = new IOTA({
//    'host': 'http://localhost',
//    'port': 14265
//});
//
// Create IOTA instance directly with provider

var IOTA = require("iota.lib.js")
var iota = new IOTA({
    'provider': 'http://yourhost:yourport'
});

// now you can start using all of the functions
iota.api.getNodeInfo(function(error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log(success);
    }
})


// you can also get the version
// iota.version
