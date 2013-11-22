var ReceiptView = require('./receipt');

module.exports = AppView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/intermarche'),

    /*render: function() {
        this.$el.html(this.template({
            receipts: this.collection.toJSON()
        }));

        return this;
    }*/


    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize intermarcheWSUBS")
        this.listenTo(this.collection, "add", this.onReceiptAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onReceiptAdded: function(receipt) {
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    }


});
