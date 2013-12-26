americano = require('americano');

module.exports = ReceiptDetail = americano.getModel('ReceiptDetail', {
 'origin': String,
 'order': Number,
 'barcode': String,
 'label': String,
 'family': String,
 'familyLabel': String,
 'section': String,
 'sectionLabel': String,
 'amount': Number,
 'price': Number,
 'type': String,
 'typeLabel': String,
 'receiptId': String,
 'intermarcheShopId': String,
 'timestamp': Date,
 'isOnlineBuy': Boolean,

//
 'quantityUnity': String,
 'quantityAmount': Number,
 'quantityWeight': String,
 'quantityLabel': String,
 'name': String


 });

ReceiptDetail.sectionsIdLabelMap = {
'12' :'BOUL PAT TRAD',
'10' :'FROMAGE TRAD',
'70' :'NON COMMERCIALE',
'38' :'SURGELES',
'66' :'PRESTATION DE SERVICE',
'50' :'TEXTILE',
'28' :'SAURISSERIE',
'44' :'ALIMENTATION POUR ANIMAUX',
'48' :'D.P.H.',
'60' :'BAZAR LEGER',
'30' :'CREMERIE LS',
'22' :'BOUCHERIE FRAIS EMB.',
'32' :'PAIN PAT LS INDUS',
'20' :'BOUCHERIE LS',
'34' :'FRUITS ET LEGUMES',
'26' :'CHARCUTERIE TRAITEUR LS',
'36' :'FLEURS ET PLANTES',
'24' :'VOLAILLE LS',
'2' :'BOUCHERIE / VOLAILLE TRAD',
'46' :'LIQUIDES',
'4' :'CHARCUTERIE TRAD',
'6' :'TRAITEUR TRAD',
'88' :'BOUTIQUE SERVICES',
'8' :'PRODUITS DE LA MER TRAD',
'40' :'EPICERIE SUCREE',
'42' :'EPICERIE SALEE',
'64' :'PRODUITS CULTURELS',
'80' :'BOUTIQUE STATION',
'82' :'BOUTIQUE PRESSE',
'62' :'BAZAR TECHNIQUE',
'200': 'BOUCHERIE',
'120': 'BOULANGERIE',
'260': 'CHARCUTERIE',
'280': 'POISSONERIE'
};

ReceiptDetail.getSectionLabel = function(sectionId) {
    if (sectionId in ReceiptDetail.sectionsIdLabelMap) {
        return ReceiptDetail.sectionsIdLabelMap[sectionId];
    } else {
        return 'AUTRE';
    }

};

ReceiptDetail.aggregateSections = function(sectionId) {

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

// Unused
//ReceiptDetail.all = function(callback) {
//    ReceiptDetail.request(
//        "all", 
//        {},
//        function(err, instances) {
//            callback(null, instances);
//        }
//    );
//};

ReceiptDetail.getOneByBarCode = function(barcode, callback) {
    ReceiptDetail.request(
        "byBarcode", 
        { key: barcode, limit: 1 },
        callback
    );
}; 

ReceiptDetail.withReceiptId = function(receiptId, callback) {
    ReceiptDetail.request(
        "byReceiptId", 
        {
            key: receiptId

            },
        function(err, instances) {
            callback(null, instances);
        }
    );
};

// Unused.
//ReceiptDetail.byTimestamp = function(callback) {
//    ReceiptDetail.request(
//        "byTimestamp", 
//        {
//            descending: true
//
//            },
//        function(err, instances) {
//            callback(null, instances);
//        }
//    );
//};


ReceiptDetail.sectionsTotalsOfMonth = function(month, callback) {
   ReceiptDetail.rawRequest(
        "totalsByMonthBySection", 
        {
             group: true,
             startkey: [month, null],
             endkey: [month, {}]
        },
        callback
    );
};
/*
ReceiptDetail.totalsByMonthByProduct = function(callback) {
   ReceiptDetail.rawRequest(
        "totalsByMonthByProduct", 
        {
             'descending': true,
             'group': true

            },
        callback
    );
}; */

//ReceiptDetail.totalsByMonthByProduct = function(callback) {
//   var month = '2013-10';
ReceiptDetail.mostBoughtProductOfMonth = function(month, callback) {
   ReceiptDetail.rawRequest(
        "totalsByMonthByProduct", 
        {
         descending: false,
         group: true,
         startkey: [month, null],
         endkey: [month, {}]
            
            },
        function(err, kvs) {
            if (err) {
                callback(err, null);
            } else {
                if (kvs.length == 0) {
                    callback(null, null);
                } else {
                    var max = kvs[0];
                    for (var idx=0; idx<kvs.length; idx++) {
                        if (max.value.count < kvs[idx].value.count) {
                            max = kvs[idx];
                        }
                    }

                    callback(null, max);
                }

            }
                
        }
    );
}
