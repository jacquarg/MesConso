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
    
    showLoader: function(show) {
        if (show) {
            this.$el.find('#loader').show();
        } else {
            this.$el.find('#loader').hide();
        }
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
        this.showLoader(true);
    },

    collectionFetch: function() {
        var that = this;
        this.collection.fetch({ 
            success : function(collection, response, options) {
                that.showLoader(false);
        
                if (collection.length == 0) {
                    that.$el.find('.nodata').show();
                }
            },
            error: function(collection, response, options) {
                that.stopLoader();
            }
        });
    },

    getDays : function() {
        if (this.state == '#day') {
            return;
        }
        this.state = '#day';
        this.toggleList('#day');

        this.collection = new ReceiptCollection();
        this.listenTo(this.collection, "add", this.onReceiptAdded);
        //this.collection.fetch();
        this.collectionFetch();
    },

    onReceiptAdded: function(receipt) {
        this.showLoader(false);
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    },



    getMonths : function() {
        if (this.state == '#month') {
            return;
        }
        this.state = '#month';

        this.toggleList('#month');

        this.collection = new ReceiptTotalsCollection();
        this.listenTo(this.collection, "add", this.onReceiptTotalAdded);
        //this.collection.fetch();
        this.collectionFetch();
    },

    onReceiptAdded: function(receipt) {
        //this.showLoader(false);
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    }, 
    
    onReceiptTotalAdded: function(data) {
        //this.showLoader(false);
        // render the specific element
        rtView = new ReceiptTotalView({
            model: data
        });
        rtView.render();
        this.$el.find('#list').append(rtView.$el);
        
    } 


});
