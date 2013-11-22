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
