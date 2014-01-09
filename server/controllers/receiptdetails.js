ReceiptDetail = require('../models/receiptdetail')


module.exports.sections = function(req, res) {
    ReceiptDetail.withReceiptId(req.params.receiptid, function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            /* Build a struct :
                [{
                    sectionLabel,
                    receiptDetails : []
                }]
            */
                
            // All receipts, by ticketId.
            sections = {}
            
            for (idx in instances) {
                rdet = instances[idx];

                var sectionNumber = rdet.aggregatedSection;
                var sectionLabel = ReceiptDetail.getSectionLabel(sectionNumber);
                
                var section = undefined;
                if (sectionNumber in sections) {
                    section = sections[sectionNumber];
                } else {
                    section = {
                        sectionLabel: sectionLabel,
                        section: sectionNumber,
                        receiptDetails: []
                    }
                    sections[sectionNumber] = section;
                }
                section.receiptDetails.push(rdet);

            }
            
            sectionList = []

            sectionNumbers = Object.keys(sections).sort();
            for (var i=0; i< sectionNumbers.length; i++) {
                sectionList.push(sections[sectionNumbers[i]]);

            }
            res.send(200, sectionList);
        }
    }); 
};


module.exports.totalsByMonthBySection = function(req, res) {
    ReceiptDetail.totalsByMonthBySection(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};

module.exports.totalsByMonthByProduct = function(req, res) {
    ReceiptDetail.totalsByMonthByProduct(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};


// Unused.
//module.exports.list = function(req, res) {
//    ReceiptDetail.all(function(err, instances) {
//        if(err != null) {
//            res.send(500, "An error has occurred -- " + err);
//        }
//        else {
//            res.send(200, instances);
//        }
//    });
//};

// Unused.
//module.exports.byTimestamp = function(req, res) {
//    ReceiptDetail.byTimestamp(function(err, instances) {
//        if(err != null) {
//            res.send(500, "An error has occurred -- " + err);
//        }
//        else {
//            res.send(200, instances);
//        }
//    });
//}
