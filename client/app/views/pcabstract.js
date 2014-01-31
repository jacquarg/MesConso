var ItemView = require('./phonecommunicationlog');
var Collection = require('../collections/phonecommunicationlogs');


module.exports = PCAbstractView = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/pcabstract'),
    events: {
        "click .item_a": "toggleList",    
        //"click .toggle": "toggleSectionsNoDefault"    
    },
    
    initialize: function() {
//        this.collection = new Collection([], { date: this.model.attributes.key });
       
        
    },

    render: function() {
        this.$el.html(this.template({
            pcabstract: this.model.toJSON()
        }));

        if ((this.model.attributes.value.calls + this.model.attributes.value.sms) == 0) {
            this.btnState('hidden');
          //  delete this.events["click .item_a"];
            this.noOpen = true;
        } 
    },

    btnState: function(state) {
        var states = {
            'opened': "img/moins.png",
            'closed': "img/plus.png",
            'loading': "img/ajax-loader_b.gif",
            'hidden': "img/none.png",
        };
        this.$el.find('.toggle-btn').attr('src', states[state]);
    },

    toggleList: function(event) {
        if (this.noOpen) return;

        if (!this.open) {
            this.open = true;
            // submit button reload the page, we don't want that
            //event.preventDefault();

            this.btnState('loading');

            //Seems dirty..
            this.collection = new Collection([], { date: this.model.attributes.key });
            
            this.listenTo(this.collection, "add", this.onItemAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();
            //this.$el.find('.toggle-btn').attr('src', "img/moins.png");

        } else {

            this.btnState('closed');
            this.stopListening(this.collection);
            this.$el.find('.list_b').empty();

            this.open = false;
        }
    },

    onItemAdded: function(item) {
        this.btnState('opened');

        // render the specific element
        var itemView = new ItemView({
            model: item
        });
        itemView.render();
        this.$el.find('.list_b').append(itemView.$el);
    }
    
    
});

