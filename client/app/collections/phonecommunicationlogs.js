Receipt = require('../models/phonecommunicationlog');
module.exports = PhoneCommunicationLogs = Backbone.Collection.extend({

    initialize: function(models, options) {
        this.date = options.date;
    },
    
    url: function() {
        return 'pcls/' + this.date ;
    },
    model: PhoneCommunicationLog,

});
