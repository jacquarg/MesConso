//var SectionView = require('./section');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    
    render: function() {
        this.$el.html(this.template({
            receipt: this.model.toJSON()
        }));
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

