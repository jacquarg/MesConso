//var SectionView = require('./section');
//var SectionCollection = require('../collections/sections');

var ReceiptAggergate = require('../models/receiptaggregate');

module.exports = ReceiptMonth = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receiptmonth'),
    templateAggregate : require('../templates/receiptaggregate'),
    events: {
        "click .receipt": "toggleSections",    
        //"click .toggle": "toggleSectionsNoDefault"    
    },

    initialize: function() {
    },

    render: function() {
        this.$el.html(this.template({
            kv: this.model.toJSON()
        }));

    },
    

    toggleSections: function(event) {
        if (!this.open) {
            this.open = true;
            // submit button reload the page, we don't want that
            //event.preventDefault();
            
            // get the object / Instantiate it's view.
            //ra = new ReceiptAggregate({id : this.model.key });
            //ra.fetch();
            that = this;
            ra = new ReceiptAggregate();
            ra.fetch({ 
                url: 'receipts/aggregates/' + this.model.attributes.key,
                success: function() {
                    console.log(ra.toJSON());
                    that.$el.find('.sections').append(that.templateAggregate({
                        kv: ra.toJSON()
                    }));
                }


            });

            this.$el.find('.toggle-btn').attr('src', "img/moins.png");

        } else {
            this.stopListening(this.collection);
            this.$el.find('.sections').empty();
            this.$el.find('.toggle-btn').attr('src', "img/plus.png");

            this.open = false;
        }
    },

});

