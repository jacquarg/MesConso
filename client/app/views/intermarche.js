var ReceiptView = require('./receipt');

module.exports = IntermarcheView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/brandpanel'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onReceiptAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Courses"}));

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
