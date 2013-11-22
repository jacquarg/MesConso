//var ReceiptDetailView = require('./receiptdetail');

module.exports = Section = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/section'),

    render: function() {
        this.$el.html(this.template({
            section: this.model.toJSON()
        }));
    },

    /*render: function() {

        // we render the template
        this.$el.html(this.template(
            {
                section: JSON.dumps(this.section)
            }
            )
        );

        for (var idx=0; idx<this.section.receiptDetails.length; idx++) {
            receiptDetail = this.section.receiptDetails[idx];

            // render the specific element
            receiptDetailView = new ReceiptDetailView({
                model: receiptDetail
            });

            receiptDetailView.render();
            this.$el.find('#list').append(receiptDetailView.$el);
        }
     }*/

});

