/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

byTimestamp = function(doc) {
    emit(doc.timestamp, doc);
}

module.exports = {
    receiptdetail: {
        // Unused.
        //all: americano.defaultRequests.all,
        
        // Unused.
        //byTimestamp : byTimestamp,

        byReceiptId : function(doc) {
            if (!doc.receiptId) {
                // Old receiptDetail format.
                //doc.receiptId = doc.ticketId;
                emit(doc.ticketId, doc);
            } else {
                emit(doc.receiptId, doc);
            }
        }
    },

    receipt: {
        //unused.
        //all: americano.defaultRequests.all,
        
        byTimestamp : byTimestamp
    },

    person: {
        all: americano.defaultRequests.all
        
    }


};
