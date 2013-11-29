PCAbstract = require('../models/pcabstract');
module.exports = PCAbstracts = Backbone.Collection.extend({

    url: 'pcabstracts',
    model: PCAbstract,

});
