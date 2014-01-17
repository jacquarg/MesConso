americano = require('americano');
//require('date');

module.exports = PhoneCommunicationLog = americano.getModel('PhoneCommunicationLog', {
    'origin': String,
    'idMesInfos': String,
    'direction': String,
    'timestamp': Date,
    'subscriberNumber': String,
    'correspondantNumber': String,
    'chipCount': Number,
    'chipType': String,
    'type': String,
    'imsi': { 'type': String, 'default': null },
    'imei': { 'type': String, 'default': null },
    'latitude': Number,
    'longitude': Number,
    'snippet': String
});

PhoneCommunicationLog.withDate = function(date, callback) {
    PhoneCommunicationLog.request(
        "byTimestamp", 
        {
            descending: true,
            startkey : date + 'U',
            endkey : date
            //key: date
            
            //startkey : "2013-09-02T11:46:16.000Z",
            //endkey : "2013-09-02T11:46:16.000Z1",

            },
        function(err, instances) {
            callback(null, instances);
        }
    );
};

//Client = require('request-json').JsonClient;

PhoneCommunicationLog.dayAbstract = function(callback) {
    PhoneCommunicationLog.rawRequest(
        "dayAbstract", 
        {
             'descending': true,
             'group': true

            },
        function(err, instances) {
            callback(null, instances);
        }
    );
};


