var bleno = require('bleno');
var os = require('os');
var util = require('util');
var globalVar = require('./globalVar');

var BlenoCharacteristic = bleno.Characteristic;

var WriteNameDataCharacteristic = function() {
    WriteNameDataCharacteristic.super_.call(this, {
	uuid: '0d2d4533-2c92-4b43-94f7-43a466b5f07b',
	properties: ['write'],
    });

};

WriteNameDataCharacteristic.prototype.onWriteRequest = function(file_name, offset, withoutResponse, callback) {

  if (offset > 0) {
    callback(BlenoCharacteristic.RESULT_INVALIDEOFFSET)
  }
  else {
    globalVar.globalName = file_name+'.mid'
    console.log('response -> : '+file_name+' '+offset+' '+withoutResponse+' '+callback);
    callback(BlenoCharacteristic.RESULT_SUCCESS)
  }
}

util.inherits(WriteNameDataCharacteristic, BlenoCharacteristic);
module.exports = WriteNameDataCharacteristic;
