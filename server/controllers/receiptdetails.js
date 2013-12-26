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

                // Parse quantity
                // Match parterns : 3x20cl ; 8x1l ; 70cl ; 6x50 cl ; 180gx3
                
                // 3x : (\d+)x
                // 3x or not : (?:(\d+)x|())
                // 
                // units : (cl|g|l|ml|m)
                //
                // x3 : (?:x(\d+)|())
                
                // g1 : mult
                // g2 : quantity
                // g3 : unit
                // g4 : mult
                reg = /(?:(\d+)x|)(\d+)(cl|g|l|ml|m|kg)(?:x(\d+)|)/i ;

                grs = reg.exec(rdet.label);
                console.log(grs);
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
                console.log(rdet.quantityLabel);
                console.log(rdet);
                // remove from label 
                rdet.name = rdet.label.substring(grs['index'], grs[0].length);
                rdet.label = rdet.name;
                }


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
                var sectionNumber = rdet.section;

                // Aggregate somme values
                // 24,2,20,22 (Boucherie)
                // 12, 32 (pain)
                // 26,4 (charcuterie)
                // 28, 8 : poisson / sauricerie.
                var aggSectionLabelMap = {
                    "VOLAILLE LS": "BOUCHERIE",
                    "BOUCHERIE LS": "BOUCHERIE",
                    "BOUCHERIE FRAIS EMB.": "BOUCHERIE",
                    "BOUCHERIE / VOLAILLE TRAD": "BOUCHERIE",

                    "BOUL PAT TRAD": "BOULANGERIE",
                    "PAIN PAT LS INDUS": "BOULANGERIE",

                    "CHARCUTERIE TRAITEUR LS": "CHARCUTERIE",
                    "CHARCUTERIE TRAD": "CHARCUTERIE",

                    "PRODUITS DE LA MER TRAD": "POISSONERIE",
                    "SAURISSERIE": "POISSONERIE"
                };

                var aggSectionNumberMap = {
                    "BOUCHERIE": 20,
                    "BOULANGERIE": 12,
                    "CHARCUTERIE": 26,
                    "POISSONERIE": 8

                };


                if (sectionLabel in aggSectionLabelMap) {
                    sectionLabel = aggSectionLabelMap[sectionLabel];
                    sectionNumber = aggSectionNumberMap[sectionLabel];
                }
                //
              

                var section = undefined;
                if (sectionLabel in sections) {
                    section = sections[sectionLabel];
                } else {
                    section = {
                        sectionLabel: sectionLabel,
                        section: sectionNumber,
                        receiptDetails: []
                    }
                    sections[sectionLabel] = section;
                }
                section.receiptDetails.push(rdet)

            }

            sectionLabels = [
//'BOUL PAT TRAD',
'BOULANGERIE',
'FROMAGE TRAD',
'NON COMMERCIALE',
'SURGELES',
'PRESTATION DE SERVICE',
'TEXTILE',
//'SAURISSERIE',
'ALIMENTATION POUR ANIMAUX',
'D.P.H.',
'BAZAR LEGER',
'CREMERIE LS',
//'BOUCHERIE FRAIS EMB.',
'BOUCHERIE',
//'PAIN PAT LS INDUS',
//'BOUCHERIE LS',
'FRUITS ET LEGUMES',
//'CHARCUTERIE TRAITEUR LS',
'CHARCUTERIE',
'FLEURS ET PLANTES',
//'VOLAILLE LS',
//'BOUCHERIE / VOLAILLE TRAD',
'LIQUIDES',
//'CHARCUTERIE TRAD',
'TRAITEUR TRAD',
'BOUTIQUE SERVICES',
//'PRODUITS DE LA MER TRAD',
'POISSONERIE',
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
