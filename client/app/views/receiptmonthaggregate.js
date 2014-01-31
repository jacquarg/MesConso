
var ReceiptAggergate = require('../models/receiptaggregate');

module.exports = ReceiptMonthAggregate = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receiptmonthaggregate'),

    initialize: function() {
        this.model = new ReceiptAggregate({id : this.month });

    }, 

    render: function() {
        this.$el.html(this.template({
            kv: this.model.toJSON()
        }));
    },

});

