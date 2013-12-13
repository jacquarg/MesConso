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


//    // The data system listens to localhost:9101
//    dataSystem = new Client('http://localhost:9101/');

//    // In production we must authentificate the application
//    if (process.env.NODE_ENV === 'production') {
//        user = process.env.USER;
//        password = process.env.PASSWORD;
//        dataSystem.setBasicAuth(user, password);
//    }

//    // The request must be created first, let's say it is
//    dataSystem.post('request/phonecommunicationlog/dayabstract/', 
//            {  
//                descending: true,
//                'group': true
//             },
//             function(err, res, body) {
//        if(err !== null || (res !== null && res.statusCode != 200)) {
//            if(res !== null) {code = res.statusCode;} else { code = "no status code"; }
//
//                console.log("An error occurred -- [" + code + "] " + err);
//        }
//        else {
//            callback(null, body);
//        }
//    });
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


