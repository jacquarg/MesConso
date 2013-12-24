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
        
        byTimestamp : byTimestamp,

        monthTotal : {
            map: function(doc) {
                // group by month
                emit(doc.timestamp.substring(0,7), doc);
            },
            
            reduce : function(key, values, rereduce) {
                var sums = {
                    total: 0
                };

                for (var idx=0; idx<values.length; idx++) {
                    sums.total += values[idx].total ;
                }
                return sums;

            }
        }
    },

    person: {
        all: americano.defaultRequests.all
        
    },

    phonecommunicationlog: {
        byTimestamp: function(doc) {
            if (doc.type == 'VOICE' || doc.type == 'SMS-C') {
                emit(doc.timestamp, doc);
            }
        },

        dayAbstract: {
            map: function(doc) {
                emit(doc.timestamp.substring(0,10), doc);
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                       calls: 0,
                       callsDuration: 0,
                       sms : 0,
                       data : 0
                    }
                if (!rereduce) {
                    for (var idx=0; idx<values.length; idx++) {
                        v = values[idx];
                        
                        if (v.type == 'VOICE') {
                            sums.calls += 1;
                            sums.callsDuration += v.chipCount;

                        } else if (v.type == 'SMS-C') {
                            sums.sms += 1;
                        } else if (v.type == 'DATA') {
                            sums.data += v.chipCount;
                        }

                        // else :SMS-C ? , MMS ? SERVICE ?
                    }

                } else { // rereduce
                    for (var j=0; j<values.length; j++) {
                        v = values[j];
                        sums.calls += v.calls;
                        sums.callsDuration += v.callsDuration;
                        sums.sms += v.sms;
                        sums.data += v.data;

                    }
                }
                
                return sums;
            }

        }
    }

};
