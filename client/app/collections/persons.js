Person = require('../models/person');
module.exports = Persons = Backbone.Collection.extend({

    url: 'persons',
    model: Person

});
