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
/* To copy paste in desired views.
enrichReceiptDetail = function(rdet) {

    reg = /(?:(\d+)x|)(\d+)(cl|g|l|ml|m|kg)(?:x(\d+)|)/i ;

    grs = reg.exec(rdet.label);
    if (grs) {
        rdet.quantityUnity = (grs[3] == 'm') ? 'ml' : grs[3] ;
        rdet.quantityAmount = parseInt(grs[1]?grs[1]:grs[4]);
        rdet.quantityWeight = parseInt(grs[2]);
        rdet.quantityLabel = grs[0];

        if (rdet.quantityAmount) {
            rdet.quantityTotalWeight = rdet.quantityWeight * rdet.quantityAmount;
        } else {
            rdet.quantityTotalWeight = rdet.quantityWeight;   
        }
       
        // remove from label 
        rdet.name = rdet.label.substring(grs['index'], grs[0].length);


     } else if (rdet.label == "NR") {
        rdet.name = rdet.familyLabel;
     }

     return rdet;
};


// group by month and section
aggregateSections = function(sectionId) {

    var aggSectionMap = {

        //"VOLAILLE LS": "BOUCHERIE",
        '24': '200',
        //"BOUCHERIE LS": "BOUCHERIE",
        '20': '200',
        //"BOUCHERIE FRAIS EMB.": "BOUCHERIE",
        '22': '200', 
        //"BOUCHERIE / VOLAILLE TRAD": "BOUCHERIE",
        '2': '200',

        //"BOUL PAT TRAD": "BOULANGERIE",
        '12': '120',
        //"PAIN PAT LS INDUS": "BOULANGERIE",
        '32': '200',

        //"CHARCUTERIE TRAITEUR LS": "CHARCUTERIE",
        '26': '260',
        //"CHARCUTERIE TRAD": "CHARCUTERIE",
        '4': '260',

        //"PRODUITS DE LA MER TRAD": "POISSONERIE",
        '8': '280',
        //"SAURISSERIE": "POISSONERIE"
        '28': '280',

    };
    if (sectionId in aggSectionMap) {
        return aggSectionMap[sectionId];
    } else {
        return sectionId;
    }
};
*/

module.exports = {
    receiptdetail: {
        // Unused.
        //all: americano.defaultRequests.all,
        
        // Unused.
        //byTimestamp : byTimestamp,
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

        byReceiptIdBySection : function(doc) {
            if (!doc.receiptId) {
                // Old receiptDetail format.
                doc.receiptId = doc.ticketId;
            }

            emit([doc.receiptId, doc.aggregatedSection], doc);
        },

        /*totalsByMonthBySection : {
            map: byMonth,

            reduce: function(key, values, rereduce) {
                var sections = {};
                if (!rereduce) {
                    for (var idx=0; idx<values.length; idx++) {
                        rdet = values[idx];
                        //TODO aggregate hook.
                        if (!(rdet.section in sections)) {
                            sections[rdet.section] = {
                                count: 0,
                                total: 0
                            };
                        }

                        sections[rdet.section].count += 1;
                        sections[rdet.section].total += rdet.price;
                     }
                } else {

                    for (var idx=0; idx<values.length; idx++) {
                        v = values[idx]
                        for (sn in v) {
                            if (!(sn in sections)) {
                                sections[sn] = {
                                    count: 0,
                                    total: 0
                                };
                            }

                            sections[sn].count += v[sn].count;
                            sections[sn].total += v[sn].total;
                        }


                    }
                }
                return sections;
            }
            
        }, */
        totalsByMonthBySection : {
            map: function(doc) {
                


                emit([doc.timestamp.substring(0,7), aggregateSections(doc.section)], 
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
        //unused.
        //all: americano.defaultRequests.all,
        
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
