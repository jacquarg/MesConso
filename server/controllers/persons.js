Person = require('../models/person')





module.exports.one = function(req, res) {
    Person.one(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
}

module.exports.touch = function(req, res) {
    require('../models/receiptdetail').touch();
    require('../models/receipt').touch();
    require('../models/phonecommunicationlog').touch();

    res.send(200);
}
