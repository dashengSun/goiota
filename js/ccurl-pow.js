var net = require('net');
require('buffer').Buffer

var ccurlPow = function(newTrytes, minWeightMagnitude, callback) {
  var client = new net.Socket();

  var trytesAfterPOW = '';

  client.connect(33333, 'wudanyu.xicp.net', function() {

    var bufSend = Buffer.allocUnsafe(16);

    bufSend.writeUInt32LE(999999, 0);
    bufSend.writeUInt32LE(123456, 4);
    bufSend.writeUInt32LE(2673, 8);
    bufSend.writeUInt32LE(1, 12);

    client.write(bufSend);

    client.write(newTrytes);
  });

  client.on('data', function (buf) {
    if (buf.length == 16) {

    } else if (buf.length == 2673) {
      trytesAfterPOW = buf.toString();
      client.destroy();

      callback(null, trytesAfterPOW)

    } else if (buf.length < 2673 && buf.length > 16) {
      if (trytesAfterPOW.length < 2673) {
        trytesAfterPOW += buf.toString();
      } else {
        console.log("error");
        console.log(trytesAfterPOW)
        client.destroy()

        callback("error")
      }
      if (trytesAfterPOW.length == 2673) {
        client.destroy();

        callback(null, trytesAfterPOW);
      }
    } else if (buf.length == 2689) {
      trytesAfterPOW = buf.toString('utf8', 16, 2689);
      client.destroy();

      callback(null, trytesAfterPOW)
    } else {
      console.log("error:" + buf.length);
      console.log(trytesAfterPOW)
      client.destroy()

      callback("error")
    }

    // console.log(buf.readInt32LE(0, 4));
    // console.log(buf.readInt32LE(4, 8));
    // console.log(buf.readInt32LE(8, 12));
    // console.log(buf.readInt32LE(12, 16));

  });

  client.on('close', function() {
  });
}

module.exports = {
  'ccurlPow': ccurlPow
}