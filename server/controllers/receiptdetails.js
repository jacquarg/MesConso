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
                //var dateStr = rdet.timestamp.toISOString();
                //var ticketId = rdet.ticketId;
                // TODO
                //var ticketId = rdet.timestamp.toISOString();
                //var receipt = undefined;
                /*if (ticketId in receipts) {
                    receipt = receipts[ticketId];
                } else {
                    receipt = {
                        timestamp: rdet.timestamp,
                        ticketId: rdet.ticketId,
                        sections: {}
                    }
                    receipts[ticketId] = receipt;
                }*/

                var sectionLabel = rdet.sectionLabel;
                var section = undefined;
                if (sectionLabel in sections) {
                    section = sections[sectionLabel];
                } else {
                    section = {
                        sectionLabel: sectionLabel,
                        section: rdet.section,
                        receiptDetails: []
                    }
                    sections[sectionLabel] = section;
                }
                section.receiptDetails.push(rdet)

            }


            sectionLabels = [
'BOUL PAT TRAD',
'FROMAGE TRAD',
'NON COMMERCIALE',
'SURGELES',
'PRESTATION DE SERVICE',
'TEXTILE',
'SAURISSERIE',
'ALIMENTATION POUR ANIMAUX',
'D.P.H.',
'BAZAR LEGER',
'CREMERIE LS',
'BOUCHERIE FRAIS EMB.',
'PAIN PAT LS INDUS',
'BOUCHERIE LS',
'FRUITS ET LEGUMES',
'CHARCUTERIE TRAITEUR LS',
'FLEURS ET PLANTES',
'VOLAILLE LS',
'BOUCHERIE / VOLAILLE TRAD',
'LIQUIDES',
'CHARCUTERIE TRAD',
'TRAITEUR TRAD',
'BOUTIQUE SERVICES',
'PRODUITS DE LA MER TRAD',
'EPICERIE SUCREE',
'EPICERIE SALEE',
'PRODUITS CULTURELS',
'BOUTIQUE STATION',
'BOUTIQUE PRESSE',
'BAZAR TECHNIQUE'
] ;
            
            
            sectionList = []
            for (var i=0; i< sectionLabels.length; i++) {
                sLab = sectionLabels[i];
                if (sLab in sections) {
                   sectionList.push(sections[sLab]);
                }

            }
            res.send(200, sectionList);
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
