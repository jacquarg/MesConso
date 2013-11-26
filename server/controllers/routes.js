/* 
* Set the routes of your app here.
*/ 

ReceiptDetails = require('./receiptdetails');
Receipts = require('./receipts');
Persons = require('./persons');

module.exports = {
    // unused :
//  'receiptdetails': {
//      get: ReceiptDetails.list
// },
//  'receiptdetailsbyts': {
//      get: ReceiptDetails.byTimestamp
//
//  },

  'receipts': {
      get: Receipts.newest
  },

  'receipts/:receiptid/sections': {
    get: ReceiptDetails.sections    
  },

  'persons': {
    get: Persons.one
  },

};

