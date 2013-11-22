/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');

module.exports = {
    receiptdetail: {
        all: americano.defaultRequests.all,
        
        // useless.
        byTimestamp : function(doc) {
                emit(doc.timestamp, doc);
        }


    }

};
