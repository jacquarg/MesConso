var ReceiptView = require('./receipt');
var ReceiptCollection = require('collections/receipts');
var ReceiptTotalView = require('./receiptmonth');
var ReceiptTotalsCollection = require('collections/receipttotals');

module.exports = IntermarcheView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/intermarche'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.getDays();
    },

    events: {
        "click #day": "getDays",
        "click #month": "getMonths"
    },
    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Courses"}));

        // fetch the bookmarks from the database
//        this.collection.fetch();
    },
    
    stopLoader: function() {
        this.$el.find('#loader').hide()
    },
    
    toggleList: function(period) {
        
        var other_map = {
            '#month': '#day',
            '#day': '#month'
        };
        this.$el.find(period).toggleClass("period_button period_button-selected");
        this.$el.find(other_map[period]).toggleClass("period_button-selected period_button");
        
        //this.$el.find(period).removeClass("period_button").addClass("period_button-selected"); 


        //this.$el.find(other_map[period]).removeClass("period_button-selected").addClass("period_button"); 

        this.stopListening(this.collection);
        this.$el.find('#list').empty();
        
    },


    getDays : function() {
        this.toggleList('#day');

        this.collection = new ReceiptCollection();
        this.listenTo(this.collection, "add", this.onReceiptAdded);
        this.collection.fetch();
    },

    onReceiptAdded: function(receipt) {
        this.stopLoader();
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    },

    getMonths : function() {
        this.toggleList('#month');

        this.collection = new ReceiptTotalsCollection();
        this.listenTo(this.collection, "add", this.onReceiptTotalAdded);
        this.collection.fetch();
    },

    onReceiptAdded: function(receipt) {
        this.stopLoader();
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    }, 
    
    onReceiptTotalAdded: function(data) {
        this.stopLoader();
        // render the specific element
        rtView = new ReceiptTotalView({
            model: data
        });
        rtView.render();
        this.$el.find('#list').append(rtView.$el);
        
    } 


});
