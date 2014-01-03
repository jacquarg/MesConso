Receipt = require('../models/receipttotal');
module.exports = ReceiptTotals = Backbone.Collection.extend({
    model: ReceiptTotal,
    url: 'receipts/totalsbymonth'
})
