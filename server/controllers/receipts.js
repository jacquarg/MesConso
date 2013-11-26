ReceiptDetail = require('../models/receiptdetail')
Receipt = require('../models/receipt')

module.exports.newest = function(req, res) {
    Receipt.newest(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};


// Deprecated.
//module.exports.list = function(req, res) {
//    ReceiptDetail.all(function(err, instances) {
//        if(err != null) {
//            res.send(500, "An error has occurred -- " + err);
//        }
//        else {
//            /* Build a struct :
//             { ticketId : 
//                    {
//                        ticketId,
//                        timestamp,
//                        sections :
//                            {
//                                sectionLabel,
//                                receiptDetails : []
//                            }
//
//                    }
//               }
//              */
//                
//
//            // All receipts, by ticketId.
//            receipts = {}
//            
//            for (idx in instances) {
//                rdet = instances[idx];
//                //var dateStr = rdet.timestamp.toISOString();
//                //var ticketId = rdet.ticketId;
//                // TODO
//                var ticketId = rdet.timestamp.toISOString();
//                var receipt = undefined;
//                if (ticketId in receipts) {
//                    receipt = receipts[ticketId];
//                } else {
//                    receipt = {
//                        timestamp: rdet.timestamp,
//                        ticketId: rdet.ticketId,
//                        sections: {}
//                    }
//                    receipts[ticketId] = receipt;
//                }
//
//                var sectionLabel = rdet.sectionLabel;
//                var section = undefined;
//                if (sectionLabel in receipt.sections) {
//                    section = receipt.sections[sectionLabel];
//                } else {
//                    section = {
//                        sectionLabel: sectionLabel,
//                        receiptDetails: []
//                    }
//                    receipt.sections[sectionLabel] = section;
//                }
//                section.receiptDetails.push(rdet)
//
//            }
//
//            receiptList = []
//            for (var key in receipts) {
//                receiptList.push(receipts[key]);
//            }
//            res.send(200, receiptList);
//        }
//    });
//};
