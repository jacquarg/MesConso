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
        //console.log("Initialize")
        
        //update view in db.
        $.get('touch');
    },
    events: {
        "click #courses": "getCourses",
        "click #cra": "getCRA"
    },

    
    toggleSelection: function(brand) {
        var other_map = {
            '#courses': '#cra',
            '#cra': '#courses'
        };

        this.$el.find(brand).attr('class', 'brand-selected');
        this.$el.find(other_map[brand]).attr('class', 'brand');
        this.$el.find('#content').empty();
        if (this.view) {
            this.view.remove();
        }
    },
    getCourses: function() {
        this.toggleSelection('#courses');
        var receipts = new ReceiptCollection();
        this.view = new IntermarcheView({
            collection: receipts
        });

        this.view.render()
        this.$el.find('#content').append(this.view.$el);
    },

    getCRA: function() {
        this.toggleSelection('#cra');
        var pcAbstracts = new PCAbstractCollection();
        this.view = new OrangeView({
            collection: pcAbstracts
        });

        this.view.render()
        this.$el.find('#content').append(this.view.$el);

    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});
