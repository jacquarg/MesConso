var PCAbstractView = require('./pcabstract');

module.exports = OrangeView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/orange'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onPCAbstractAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Communications"}));

        var that = this;
        // fetch the bookmarks from the database
        this.collection.fetch({ 
            success : function(collection, response, options) {
                that.stopLoader();
        
                if (collection.length == 0) {
                    that.$el.find('.nodata').show();
                }
            },
            error: function(collection, response, options) {
                that.stopLoader();
            }
        });
    },
    
    stopLoader: function() {
        this.$el.find('#loader').hide();
    },

    onPCAbstractAdded: function(item) {
        //this.stopLoader();

        // render the specific element
        itemView = new PCAbstractView({
            model: item
        });
        itemView.render();
        this.$el.find('#list').append(itemView.$el);
    }


})
