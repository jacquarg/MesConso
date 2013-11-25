var IntermarcheView = require('./intermarche');
var IntermarcheWSubsView = require('./intermarchewsubs');
var ReceiptDetailCollection = require('collections/receiptdetails');
var ReceiptCollection = require('collections/receipts');
var PersonView = require('./person');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize")
    },
    events: {
        "click #courses": "getCourses"
    },
    
 /*   getList: function() {
        var receiptDetails = new ReceiptDetailCollection();
        intermarcheView = new IntermarcheView({
            collection: receiptDetails
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);
        
    }, */

    getCourses: function() {
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

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});
