var bleno = require('bleno');
var os = require('os');
var util = require('util');
var globVar = require('./globalVar')
var fs = require('fs');

var BlenoCharacteristic = bleno.Characteristic;

var WriteDataCharacteristic = function() {
 WriteDataCharacteristic.super_.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb11',
    properties: ['write'],
  });
};

WriteDataCharacteristic.prototype.onWriteRequest = function(Data, offset, withoutResponse, callback) {

  if (globVar.globalName) {
    console.log('response DATA -> : '+offset+' '+withoutResponse+' '+callback);

     fs.writeFile('./song/'+globVar.globalName, Data, {flag: "w+"}, (err) => {
	      if (err) return console.error(err);
	       console.log('It\'s saved!');
	   });
   }
    callback(BlenoCharacteristic.RESULT_SUCCESS);
}

util.inherits(WriteDataCharacteristic, BlenoCharacteristic);
module.exports = WriteDataCharacteristic;
