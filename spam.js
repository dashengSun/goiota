var IOTA = require("iota.lib.js")
var iota = new IOTA({
  'provider': 'http://yourhost:yourport'
});

var depth = 3;
var minWeightMagnitude = 15;
var spamTag = '';
iota.api.sendTransfer("999999999999999999999999999999999999999999999999999999999999999999999999999999999", depth, minWeightMagnitude, [{"address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999", "value": 0, "tag": spamTag}], function(error, success) {
  if (!error) {
    console.log(success)
    console.log("no error");
  } else {
    console.log("we have error: " + error);
  }
});
