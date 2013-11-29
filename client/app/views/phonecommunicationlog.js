module.exports = PhoneCommunicationLog = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/phonecommunicationlog'),

    render: function() {
        this.$el.html(this.template({
            pcl: this.model.toJSON()
        }));
    },

});

