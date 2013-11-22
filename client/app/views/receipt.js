var SectionView = require('./section');
var SectionCollection = require('../collections/sections');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    events: {
        "click .receipt": "toggleSections"    
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
            event.preventDefault();
        
            this.listenTo(this.collection, "add", this.onSectionAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();

        } else {
            this.stopListening(this.collection);
            this.$el.find('.sections').empty();

            this.open = false;
        }
    },

    onSectionAdded: function(section) {
        console.log("added section");
        // render the specific element
        sectionView = new SectionView({
            model: section
        });
        sectionView.render();
        this.$el.find('.sections').append(sectionView.$el);
    }
    


    /*render: function() {

        // we render the template
        this.$el.html(this.template(
            {
                receipt: JSON.dumps(this.receipt)
            }
            )
        );

        for (var idx=0; idx<this.receipt.sections.length; idx++) {
            receiptDetail = this.receipt.sections[idx];

            // render the specific element
            sectionView = new SectionView({
                section: section
            });

            sectionView.render();
            this.$el.find('#list').append(receiptDetailView.$el);
        }
     }*/

});

