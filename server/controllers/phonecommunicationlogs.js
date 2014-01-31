PhoneCommunicationLog = require('../models/phonecommunicationlog')


module.exports.withDate = function(req, res) {

    PhoneCommunicationLog.withDate(req.params.date, function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    }); 
};

module.exports.dayAbstract = function(req, res) {

    PhoneCommunicationLog.dayAbstract(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    }); 
};
