var IntermarcheView = require('./intermarche');
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

    toggleSelection: function(brand) {
         //var other_map = {
         //    '#courses': '#cra',
         //    '#cra': '#courses'
         //};
 
         this.$el.find(brand).attr('class', 'brand-selected');
         //this.$el.find(other_map[brand]).attr('class', 'brand');
 
     },
    
    
    getCourses: function() {
        var receipts = new ReceiptCollection();
        intermarcheView = new IntermarcheView({
            collection: receipts
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);
        this.toggleSelection('#courses');
        
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});
