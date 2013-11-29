var IntermarcheView = require('./intermarche');
var ReceiptCollection = require('collections/receipts');
var OrangeView = require('./orange');
var PCAbstractCollection = require('collections/pcabstracts');
var PersonView = require('./person');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize")
    },
    events: {
        "click #courses": "getCourses",
        "click #cra": "getCRA"
    },
    
    getCourses: function() {
        var receipts = new ReceiptCollection();
        intermarcheView = new IntermarcheView({
            collection: receipts
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);

    },

    getCRA: function() {
        var pcAbstracts = new PCAbstractCollection();
        var orangeView = new OrangeView({
            collection: pcAbstracts
        });

        orangeView.render()
        this.$el.find('#content').append(orangeView.$el);

    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});
