var ccurl = require("./js/ccurl-interface");
var IOTA = require("iota.lib.js")

global.iota = new IOTA({
  'provider': 'http://wudanyu.xicp.net:39999'
});

var depth = 3;
var minWeightMagnitude = 15;
var spamTag = '';
var i = 0;
sendSpam()
// iota.api.sendTransfer("999999999999999999999999999999999999999999999999999999999999999999999999999999999", depth, minWeightMagnitude, [{"address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999", "value": 0, "tag": spamTag}], function(error, success) {
//   if (!error) {
//     console.log(success)
//     // console.log("no error");
//   } else {
//     console.log("we have error: " + error);
//   }
// });

function sendSpam() {
  i++;
  iota.api.sendTransfer("999999999999999999999999999999999999999999999999999999999999999999999999999999999", depth, minWeightMagnitude, [{"address": "999999999999999999999999999999999999999999999999999999999999999999999999999999999", "value": 0, "tag": spamTag}], function(error, success) {
    if (!error) {
      console.log("success");
      if (i >= 600) {
        return;
      }
      sendSpam();
    } else {
      console.log("we have error: " + error);
    }
  });
}

iota.api.attachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
  console.log("Light Wallet: localAttachToTangle");

  ccurl.ccurlHashing(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, function(error, success) {
    console.log("Light Wallet: ccurl.ccurlHashing finished:");
    if (error) {
      console.log(error);
    }
    if (callback) {
      return callback(error, success);
    } else {
      return success;
    }
  })
};