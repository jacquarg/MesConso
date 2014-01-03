ReceiptDetail = require('../models/receiptdetail')
Receipt = require('../models/receipt')
async = require('async')

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


module.exports.totalsByMonth = function(req, res) {
    Receipt.totalsByMonth(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    }); 
}

// total,
// foodTotal,
// notFoodTotal,
// 
// sectionsCount : [
//   { section : ID,
//    sectionLabel : ...},
//   ... (2, 3)
// ],
//
// topProduct : { 
//    count,
//    total,
//    ''receiptDetail'' },
// sectionsTotal : [
//  { section : ID,
//    sectionLabel : ...},
//     ....
// }



module.exports.totalsOfMonth = function(req, res) {
    var month = req.params.month;
    
    var data = {
        total : 0,
        foodTotal: 0,
        notFoodTotal : 0
    };
    kv2Section = function(kv) {
        return {
            section: kv.key[1],
            sectionLabel : ReceiptDetail.getSectionLabel(kv.key[1]),
            count : kv.value.count, 
            total : kv.value.total
        };
    }

    async.parallel([

    function(callback) {

    // Top product :
    // 1. count, total, barcode :
    ReceiptDetail.mostBoughtProductOfMonth(month, 
      function(err, topProd) {
        topProduct = {
            count: topProd.value.count,
            total: topProd.value.total
        };
        data.topProduct = topProduct;

    // 2. receiptdetails :
        ReceiptDetail.getOneByBarCode(topProd.key[1], 
          function(err, rdet) {
            topProduct.receiptDetail = rdet[0];

            callback(null);
          }
        );
      }
    );
    },

    // Sections
    function(callback) {

    ReceiptDetail.sectionsTotalsOfMonth(month, 
      function(err, sections) {
    // Sort by count, take the 3 first.
        sections.sort(function(kvA, kvB) {
            var a = kvA.value.count;
            var b = kvB.value.count;
            if (a < b) {
                return 1 ;
            } else if (a > b) {
                return -1 ;
            } else {
                return 0 ; 
            }
          }
        );
        data.sectionsCount = sections.slice(0,3).map(kv2Section);

    // Sort by total,
        sections.sort(function(kvA, kvB) {
            var a = kvA.value.total;
            var b = kvB.value.total;
            if (a < b) {
                return 1 ;
            } else if (a > b) {
                return -1 ;
            } else {
                return 0 ; 
            }
          }
        );

        data.sectionsTotal = sections.map(kv2Section);

    // Aggragate total by food, no food.
        sections.map(function(kv) {
            total = kv.value.total;
            data.total += total;

            if (['12', '10', '38', '28', '30', '22', '32', '20', '34', '26', '24', '2', '4', '6', '8', '40', '42'].indexOf(kv.key[1]) != -1) {
                data.foodTotal += total;
            } else {
                data.notFoodTotal += total;
            }
          }
        );
        callback(null);
      }
    );

    }
    ],
    function(err, results) {
       if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, data);
        } 
    });



}
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
