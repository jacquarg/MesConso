/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

byTimestamp = function(doc) {
    emit(doc.timestamp, doc);
}

module.exports = {
    receiptdetail: {
        all: americano.defaultRequests.all,
        
        // useless.
   //     byTimestamp : function(doc) {
   //             emit(doc.timestamp, doc);
   //     }
        byTimestamp : byTimestamp,

        byReceiptId : function(doc) {
            emit(doc.receiptId, doc);
        }
    },

    receipt: {
        all: americano.defaultRequests.all,
        
        byTimestamp : byTimestamp
    },


};
