var bleno = require('bleno');
var util = require('util');

var WriteDataCharacteristic = require('./characteristics/WriteData');
var WriteNameDataCharacteristic = require('./characteristics/WriteName');

function SystemInformationService() {

  bleno.PrimaryService.call(this, {
    uuid: 'ff51b30e-d7e2-4d93-8842-a7c4a57dfb07',
    characteristics: [
	      new WriteNameDataCharacteristic(),
        new WriteDataCharacteristic()
    ]
  });
};

util.inherits(SystemInformationService, bleno.PrimaryService);
module.exports = SystemInformationService;
