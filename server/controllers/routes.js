/* 
* Set the routes of your app here.
*/ 

ReceiptDetails = require('./receiptdetails');
Receipts = require('./receipts');
Persons = require('./persons');
PhoneCommunicationLogs = require('./phonecommunicationlogs');


// Test
TestModel = require('../models/receiptdetail');
test = function(req, res) {
    TestModel.test(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};
//


module.exports = {
    // unused :
//  'receiptdetails': {
//      get: ReceiptDetails.list
// },
//  'receiptdetailsbyts': {
//      get: ReceiptDetails.byTimestamp
//
//  },
  'test': {
    get: test
  },

  'receipts': {
      get: Receipts.newest
  },

  'receipts/:receiptid/sections': {
    get: ReceiptDetails.sections    
  },

  'receipts/totalsbymonth': {
    get: Receipts.totalsByMonth
  },

  'receiptdetails/totalsbymonthbysection': {
    get: ReceiptDetails.totalsByMonthBySection
  },

  'receiptdetails/totalsbymonthbyproduct': {
    get: ReceiptDetails.totalsByMonthByProduct
  },

  'receipts/aggregates/:month' : {
    get: Receipts.totalsOfMonth
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

