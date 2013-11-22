var IntermarcheView = require('./intermarche');
var IntermarcheWSubsView = require('./intermarchewsubs');
var ReceiptDetailCollection = require('collections/receiptdetails');
var ReceiptCollection = require('collections/receipts');



module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize")
    },
    events: {
        "click #test1": "getList",
        "click #test2": "getTruc"
    },
    
    getList: function() {
        var receiptDetails = new ReceiptDetailCollection();
        intermarcheView = new IntermarcheView({
            collection: receiptDetails
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);
        
    },

    getTruc: function() {
        var receipts = new ReceiptCollection();
        intermarcheView = new IntermarcheWSubsView({
            collection: receipts
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);

    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
       // this.collection.fetch();
    },

});
