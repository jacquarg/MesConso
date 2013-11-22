/* 
* Set the routes of your app here.
*/ 

ReceiptDetails = require('./receiptdetails');
Receipts = require('./receipts');

module.exports = {
  'receiptdetails': {
      get: ReceiptDetails.list
  },
  'receiptdetailsbyts': {
      get: ReceiptDetails.byTimestamp

  },

  'receipts': {
      get: Receipts.list
  }
};

