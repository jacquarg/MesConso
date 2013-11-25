ReceiptDetail = require('../models/receiptdetail')


module.exports.list = function(req, res) {
    ReceiptDetail.all(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
};

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

module.exports.byTimestamp = function(req, res) {
    ReceiptDetail.byTimestamp(function(err, instances) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(200, instances);
        }
    });
}

/*module.exports.list = function(req, res) {
  ReceiptDetail.all(function(err, instances) {
    if(err != null) {
      res.send(500, "An error has occurred -- " + err);
    }
    else {
      data = {"receiptDetails": instances};
      html = render(data);
      res.send(200, html);
    }
  });
};*/

function render(data) {

    receiptDetailsHtml = ''
    for (idx in data.receiptDetails) {
        receiptDetail = data.receiptDetails[idx];
        receiptDetailsHtml +=
'        <div class="col-md-6">\n' +
'          <div class="thumbnail row">\n' +            
'            <div class="col-md-2 text-center">\n' +
'              <img class="img-responsive" src="' +
          'http://drive.intermarche.com/ressources/images/produit/vignette/0' + receiptDetail.barcode + '.jpg"/>\n' + 
'              <h4>' + receiptDetail.price + ' €</h4>\n' +
'            </div>\n' +
'            <div class="col-md-10">\n' +
'              <h4>' + receiptDetail.label + '</h4>\n' +
'              <p>' + receiptDetail.sectionLabel + 
           ' &gt; ' + receiptDetail.familyLabel + ' &gt; ' +
          '<small>' + receiptDetail.barcode + '</small></p>\n' +
'              <p>' + receiptDetail.amount + ' X , Le ' + receiptDetail.timestamp.toDateString() + '</p>\n' +
'            </div>\n' +
'          </div>\n' +
'        </div>\n' ;

    }

    header = 
'<!DOCTYPE html>\n' +
'<html>\n' +
'  <head>\n' +
'    <meta charset="utf-8">\n' +
'    <title>Mes caddies !</title>\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +

'    <!-- Bootstrap -->\n' +
'    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" media="screen">\n' +
'  </head>\n' +
'  <body>\n' +
'    <div class="container">\n' +
'      <h1>Mes caddies !</h1>\n' +
'      <div class="row">\n' ;


    footer = 
'      </div>\n' +
'    </div>\n' +

'    <!-- jQuery (necessary for Bootstrap s JavaScript plugins) -->\n' +
'    <script src="http://code.jquery.com/jquery.js"></script>\n' +
'    <!-- Latest compiled and minified JavaScript -->\n' +
'    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>\n' +
'  </body>\n' +
'</html>\n'


    return header + receiptDetailsHtml + footer ;
}

