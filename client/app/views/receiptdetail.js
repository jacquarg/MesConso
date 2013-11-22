module.exports = ReceiptDetail = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receiptdetail'),
//    events: {
//        'click a.delete': 'deleteBookmark'
//    },

    render: function() {
        this.$el.html(this.template({
            receiptDetail: this.model.toJSON()
        }));
    },

//    deleteBookmark: function() {
//        this.model.destroy();
//        this.remove();
//    }
});
