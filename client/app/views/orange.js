var PCAbstractView = require('./pcabstract');

module.exports = OrangeView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/brandpanel'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onPCAbstractAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Communications"}));

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onPCAbstractAdded: function(item) {
        // render the specific element
        itemView = new PCAbstractView({
            model: item
        });
        itemView.render();
        this.$el.find('#list').append(itemView.$el);
    }


})
