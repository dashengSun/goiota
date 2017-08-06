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
});
