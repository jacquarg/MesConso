var SectionView = require('./section');
var SectionCollection = require('../collections/sections');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    events: {
        "click .receipt": "toggleSections",    
        //"click .toggle": "toggleSectionsNoDefault"    
    },

    initialize: function() {
        this.collection = new SectionCollection([], { receiptId: this.model.attributes.receiptId });
        
    },

    render: function() {
        this.$el.html(this.template({
            receipt: this.model.toJSON()
        }));


    
    },
    

    toggleSections: function(event) {
        if (!this.open) {
            this.open = true;
            // submit button reload the page, we don't want that
            //event.preventDefault();
        
            this.listenTo(this.collection, "add", this.onSectionAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();

            this.$el.find('.toggle-btn').attr('src', "img/moins.png");

        } else {
            this.stopListening(this.collection);
            this.$el.find('.sections').empty();
            this.$el.find('.toggle-btn').attr('src', "img/plus.png");

            this.open = false;
        }
    },

    onSectionAdded: function(section) {
        // render the specific element
        sectionView = new SectionView({
            model: section
        });
        sectionView.render();
        this.$el.find('.sections').append(sectionView.$el);
    }
    
});

