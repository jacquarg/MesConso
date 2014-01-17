/*
* Put here the requests to the DataSystem.
*/

americano = require('americano');




byTimestamp = function(doc) {
    emit(doc.timestamp, doc);
};

byMonth = function(doc) {
    // group by month
    emit(doc.timestamp.substring(0,7), doc);
};

module.exports = {
    receiptdetail: {
        byBarcode : function(doc) {
            emit(doc.barcode, doc);
        },

        byReceiptId : function(doc) {
            if (!doc.receiptId) {
                // Old receiptDetail format.
                //doc.receiptId = doc.ticketId;
                emit(doc.ticketId, doc);
            } else {
                emit(doc.receiptId, doc);
            }
        },

        totalsByMonthBySection : {
            map: function(doc) {
                var aggSectionMap = {
                    '24': '200', '20': '200', '22': '200', '2': '200',
                    '12': '120', '32': '120',  '26': '260',
                    '4': '260',
                    '8': '280', '28': '280',
                };

                section = (doc.section in aggSectionMap) ? aggSectionMap[doc.section] : doc.section ;

                emit([doc.timestamp.substring(0,7), section], 
                    { count: 1, total: doc.price }
                );
            },
            
            reduce: function(key, values, rereduce) {
                var sums = {
                    count: 0,
                    total: 0
                };

                for (var idx=0; idx<values.length; idx++) {
                    sums.count += values[idx].count ;
                    sums.total += values[idx].total ;
                }
                return sums;
            }
        },

        totalsByMonthByProduct : {
            map: function(doc) {
                emit([doc.timestamp.substring(0,7), doc.barcode], 
                     {
                        count: 1,
                        total: doc.price
                    });   
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    count: 0,
                    total: 0
                };
                
                for (var idx=0; idx<values.length; idx++) {
                    sums.count += values[idx].count ;
                    sums.total += values[idx].total ;
                }
                return sums;
            }
        }
    },
    

    receipt: {
        byTimestamp : byTimestamp,

        monthTotal : {
            map: byMonth,
            
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
            // exclude floody DATA docs.
            if (doc.type == 'VOICE' || doc.type == 'SMS-C') {
                emit(doc.timestamp, doc);
            }
        },

        dayAbstract_1: {
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

        },


        dayAbstract: {
            map: function(doc) {
                var sums = {
                    calls: 0,
                    callsDuration: 0,
                    sms : 0,
                    data : 0
                };

                if (doc.type == 'VOICE') {
                    sums.calls += 1;
                    sums.callsDuration += doc.chipCount;
                } else if (doc.type == 'SMS-C') {
                    sums.sms += 1;
                } else if (doc.type == 'DATA') {
                    sums.data += doc.chipCount;
                }

                emit(doc.timestamp.substring(0,10), sums);
            },

            reduce: function(key, values, rereduce) {
                var sums = {
                    calls: 0,
                    callsDuration: 0,
                    sms : 0,
                    data : 0
                };

                for (var j=0; j<values.length; j++) {
                    v = values[j];
                    sums.calls += v.calls;
                    sums.callsDuration += v.callsDuration;
                    sums.sms += v.sms;
                    sums.data += v.data;
                }
                return sums;
            }
        }
    }

};
