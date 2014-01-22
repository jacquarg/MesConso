americano = require('americano');
//require('date');

module.exports = PhoneCommunicationLog = americano.getModel('phonecommunicationlog', {
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

PhoneCommunicationLog.touch = function() {
    var cbGen = function(reqName) {
        var startTime = Date.now();

        return function() {
            console.log("Touch " + reqName + " in " + (Date.now() - startTime) + "ms");
        };
    };

    var params = { 
        limit: 1,
        reduce: false
    };

    PhoneCommunicationLog.rawRequest("byTimestamp", params, cbGen("phonecommunicationlog/byTimestamp"));
    PhoneCommunicationLog.rawRequest("dayAbstract", params, 
   cbGen("phonecommunicationlog/dayAbstract"));

};

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


