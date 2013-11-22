var ReceiptDetailView = require('./receiptdetail');

module.exports = IntermarcheView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/intermarche'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize intermarche")
        this.listenTo(this.collection, "add", this.onReceiptDetailAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onReceiptDetailAdded: function(receiptDetail) {
        // render the specific element
        receiptDetailView = new ReceiptDetailView({
            model: receiptDetail
        });
        receiptDetailView.render();
        this.$el.find('#list').append(receiptDetailView.$el);
    }

});

