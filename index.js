#!/usr/bin/env node --harmony

var program = require("commander");
var co = require("co");
var prompt = require("co-prompt")

var IOTA = require("iota.lib.js");
var ccurl = require("./js/ccurl-interface");
const path = require("path");

global.iota = new IOTA({
  'provider': 'http://yourhost:yourport'
});

var connection = {
  'ccurlPath': path.join("", "ccurl", "mac")
};

var depth = 3;
var minWeightMagnitude = 15;

connection.ccurlProvider = ccurl.ccurlProvider(connection.ccurlPath);

program
  .arguments('<amount>')
  .option('-s, --seed <seed>', 'The seed of your wallet')
  .option('-a, --address <addr>', 'The address you want to send')
  .action(function(amount) {
    co(function *() {
      var seed = yield prompt.password('seed: ');
      var addr = yield prompt('address: ');

      iota.api.sendTransfer(seed, depth, minWeightMagnitude, [{"address": addr, "value": parseInt(amount), "message": "", "tag": ""}], function(error, success) {
        if (!error) {
          console.log(success)
          console.log("no error");
          process.exit(0)
        } else {
          console.log("we have error: " + error);
          process.exit(1)
        }
      });
    });

  })
  .parse(process.argv);

iota.api.attachToTangle = function(trunkTransaction, branchTransaction, minWeightMagnitude, trytes, callback) {
  console.log("Light Wallet: iota.api.attachToTangle");

  ccurl.ccurlHashing(connection.ccurlProvider, trunkTransaction, branchTransaction, minWeightMagnitude, trytes, function(error, success) {
    console.log("Light Wallet: ccurl.ccurlHashing finished:");
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
    if (callback) {
      return callback(error, success);
    } else {
      return success;
    }
  })
};

iota.api.interruptAttachingToTangle = function(callback) {
  console.log("Light Wallet: iota.api.interruptAttachingToTangle");

  ccurl.ccurlInterrupt(connection.ccurlProvider);

  if (callback) {
    return callback();
  }
};

