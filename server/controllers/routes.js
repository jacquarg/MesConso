/* 
* Set the routes of your app here.
*/ 

ReceiptDetails = require('./receiptdetails');
Receipts = require('./receipts');
Persons = require('./persons');
PhoneCommunicationLogs = require('./phonecommunicationlogs');

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

  'receipts/totalsbymonth': {
    get: Receipts.totalsByMonth
  },



  'persons': {
    get: Persons.one
  },

  'pcls/:date': {
    get: PhoneCommunicationLogs.withDate    
  },
  'pcabstracts': {
    get: PhoneCommunicationLogs.dayAbstract    
  },

};

