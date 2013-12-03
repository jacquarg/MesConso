(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {

    initialize: function() {
        var Router = require('router');
        this.router = new Router();
        Backbone.history.start();
    }
};
});

;require.register("collections/pcabstracts", function(exports, require, module) {
PCAbstract = require('../models/pcabstract');
module.exports = PCAbstracts = Backbone.Collection.extend({

    url: 'pcabstracts',
    model: PCAbstract,

});

});

;require.register("collections/persons", function(exports, require, module) {
Person = require('../models/person');
module.exports = Persons = Backbone.Collection.extend({

    url: 'persons',
    model: Person

});

});

;require.register("collections/phonecommunicationlogs", function(exports, require, module) {
Receipt = require('../models/phonecommunicationlog');
module.exports = PhoneCommunicationLogs = Backbone.Collection.extend({

    initialize: function(models, options) {
        this.date = options.date;
    },
    
    url: function() {
        return 'pcls/' + this.date ;
    },
    model: PhoneCommunicationLog,

});

});

;require.register("collections/receipts", function(exports, require, module) {
Receipt = require('../models/receipt');
module.exports = ReceiptDetails = Backbone.Collection.extend({
    model: Receipt,
    url: 'receipts'
})

});

;require.register("collections/sections", function(exports, require, module) {
Receipt = require('../models/section');
module.exports = Sections = Backbone.Collection.extend({

    initialize: function(models, options) {
        this.receiptId = options.receiptId;
    },
    
    url: function() {
        return 'receipts/' + this.receiptId + '/sections';
    },
    model: Section,

});

});

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()
});

});

;require.register("models/pcabstract", function(exports, require, module) {
module.exports = PCAbstract = Backbone.Model.extend({

})

});

;require.register("models/person", function(exports, require, module) {
module.exports = Person = Backbone.Model.extend({

});

});

;require.register("models/phonecommunicationlog", function(exports, require, module) {
module.exports = PhoneCommunicationLog = Backbone.Model.extend({

});


});

;require.register("models/receipt", function(exports, require, module) {
module.exports = Receipt = Backbone.Model.extend({

})

});

;require.register("models/section", function(exports, require, module) {
module.exports = Section = Backbone.Model.extend({

});


});

;require.register("router", function(exports, require, module) {
var AppView = require('views/app_view');
//var ReceiptDetailCollection = require('collections/receiptdetails');

//var receiptDetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
  //          collection: receiptDetails
        });
        mainView.render();
    }
});

});

;require.register("templates/brandpanel", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="consocontainer"><div class="consoheader"><h3>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h3></div><div id="list" class="consoinner"></div></div>');
}
return buf.join("");
};
});

;require.register("templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><div id="fix"></div><div class="miframe"><div class="miframeheader"><h2>MesInfos de consommation</h2></div><div class="miframeinner"><div class="row"><div class="col-xs-6 text-center"><img id="courses" src="img/Intermarche.png" class="brand"/></div><div class="col-xs-6 text-center"><img id="cra" src="img/Orange.png" class="brand"/></div></div><div id="content"></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/pcabstract", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row item_a pcabstract"><div class="col-md-6"><div class="row"><div class="col-xs-5 box date">');
 var d = new Date(pcabstract.key)
var __val__ = d.toString('dd/MM')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="col-xs-3 box">');
var __val__ = pcabstract.value.calls
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;<img src="img/Tel.png"/></div><div class="col-xs-4 box callsduration">');
 var min = Math.floor(pcabstract.value.callsDuration / 60)
 var sec = pcabstract.value.callsDuration % 60
var __val__ = min
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('’');
var __val__ = sec
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('”</div></div></div><div class="col-md-6"><div class="row"><div class="col-xs-3 box">');
var __val__ = pcabstract.value.sms
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;<img src="img/SMS.png"/></div><div class="col-xs-6 box">');
 var total = pcabstract.value.data ;
 var unity = 'o';
 var totalStr = total;
 if (total > 1000000)
{
 total = total / 1000000 ;
 totalStr = total.toFixed(2);
 unity = 'Mo';
}
 else if (total > 1000)
{
 total = pcabstract.value.data/1000;
 totalStr = total.toFixed(2);
 unity = 'ko';
}
var __val__ = totalStr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<span class="unity">');
var __val__ = unity
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>&nbsp;<img src="img/Data.png"/></div><div class="col-xs-1 box"></div><div class="col-xs-2 box toggle"><img src="img/plus.png" class="toggle-btn"/></div></div></div></div><div class="row list_b pcls"></div>');
}
return buf.join("");
};
});

;require.register("templates/pcldata", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="col-md-3">');
 var dt = new Date(pcl.timestamp)
buf.push('<p>');
var __val__ = dt.getHours()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(':');
var __val__ = dt.getMinutes()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.timestamp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.latitude
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(',');
var __val__ = pcl.longitude
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.type
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.direction
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.correspondantNumber
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = pcl.chipCount
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<p>');
var __val__ = pcl.chipType
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></p></div>');
}
return buf.join("");
};
});

;require.register("templates/person", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="miframe"><div class="miframeheaderhid"></div><div class="miframeinner"><div class="row person"><div class="col-md-5"><div class="row"><div class="col-xs-3"><img src="img/Bonhomme.png" class="img-responsive"/></div><div class="col-xs-9"><p class="nomprenom">');
var __val__ = person.firstname.toLowerCase()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;');
var __val__ = person.lastname.toLowerCase()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
 var bDate = new Date(person.birthdate)
 //p= person.birthdate
buf.push('<p>');
var __val__ = bDate.toString('dddd d MMMM yyyy')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p class="address">');
var __val__ = person.address1.toLowerCase()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<br/>');
var __val__ = person.postcode
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;');
var __val__ = person.city.toLowerCase()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<br/>');
 if (person.countryCode = 'FR')
{
buf.push('France');
}
 else
{
var __val__ = person.countryCode
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</p></div></div></div><div class="col-md-7"><div class="row"><div class="col-sm-6">');
 if (person.phoneNumber && person.phoneNumber.length == 9)
{
 var numStr = '0' + person.phoneNumber.substring(0, 1) +'&thinsp;' + person.phoneNumber.substring(1, 3) + '&thinsp;' + person.phoneNumber.substring(3, 5) + '&thinsp;' + person.phoneNumber.substring(5, 7) + '&thinsp;'+ person.phoneNumber.substring(7, 9)
buf.push('<p>');
var __val__ = numStr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
else
{
buf.push('<p>');
var __val__ = person.phoneNumber
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
buf.push('<p>');
var __val__ = person.email
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.csp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.maritalStatus
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div><div class="col-sm-6"><p>');
 if (person.childrenCount == 0)
{
buf.push('Aucun enfant');
}
 else
{
var __val__ = person.childrenCount
buf.push(escape(null == __val__ ? "" : __val__));
 if (person.childrenCount == 1)
{
buf.push('&nbsp; enfant :');
}
 else
{
buf.push('&nbsp; enfants :');
}
}
 for (var i=1; i<6; i++)
{
 if (person['birthdateChild' + i])
{
 var cBD = new Date(person['birthdateChild' + i])
buf.push('<br/>');
var __val__ = i
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('° enfant né le ');
var __val__ = cBD.toString('dddd d MMMM yyyy')
buf.push(escape(null == __val__ ? "" : __val__));
}
}
buf.push('</p><p>');
var __val__ = person.drivingLicence
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div></div></div></div><div class="origin"><img');
buf.push(attrs({ 'src':("img/" + (person.origin.toLowerCase()) + "nb.png"), "class": ('img-responsive') }, {"src":true}));
buf.push('/></div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/phonecommunicationlog", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="col-md-3 pcl">');
 var dt = new Date(pcl.timestamp)
buf.push('<div class="time">');
var __val__ = dt.toString('H:mm')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div>');
 if (pcl.longitude)
{
buf.push('<a');
buf.push(attrs({ 'href':("http://www.openstreetmap.org/?mlat=" + (pcl.latitude) + "&mlon=" + (pcl.longitude) + "#map=17/" + (pcl.latitude) + "/" + (pcl.longitude) + ""), 'target':("_blank") }, {"href":true,"target":true}));
buf.push('><img src="img/Geoloc.png"/></a>');
}
buf.push('<img');
buf.push(attrs({ 'src':("img/" + (pcl.type) + ".png") }, {"src":true}));
buf.push('/><img');
buf.push(attrs({ 'src':("img/" + (pcl.direction) + ".png") }, {"src":true}));
buf.push('/>');
 if (pcl.correspondantNumber && pcl.correspondantNumber.length == 11 && pcl.correspondantNumber.startsWith('33'))    
{
 var numStr = '+33' + '&thinsp;' + pcl.correspondantNumber.substring(2, 3) + '&thinsp;' + pcl.correspondantNumber.substring(3, 5) + '&thinsp;' + pcl.correspondantNumber.substring(5, 7) + '&thinsp;'+ pcl.correspondantNumber.substring(7, 9) + '&thinsp;' + pcl.correspondantNumber.substring(9, 11)
buf.push('<div class="correspondantNumber">');
var __val__ = numStr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
 else
{
buf.push('<div class="correspondantNumber">');
var __val__ = pcl.correspondantNumber
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
}
buf.push('</div><div class="quantity">');
 if (pcl.type == 'VOICE')
{
 var min = Math.floor(pcl.chipCount / 60)
 var sec = pcl.chipCount % 60
var __val__ = min
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('’');
var __val__ = sec
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('”');
}
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("templates/receipt", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row item_a receipt"><div class="col-md-6"><div class="row"><div class="col-xs-2 box map"><a');
buf.push(attrs({ 'href':("http://fc1.1bis.com/intermarche/map.asp?id=IMARC" + (receipt.intermarcheShopId) + ""), 'target':("_blank") }, {"href":true,"target":true}));
buf.push('><img src="img/pin.png"/></a></div><div class="col-xs-5 box">');
 var dt = new Date(receipt.timestamp)
var __val__ = dt.toString('d/MM')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div><div class="col-xs-5 box">');
var __val__ = dt.toString('H:mm')
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div></div></div><div class="col-md-6"><div class="row"><div class="col-xs-5 box">');
var __val__ = receipt.articlesCount
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp; articles</div><div class="col-xs-5 box price">');
var __val__ = receipt.total
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('€</div><div class="col-xs-2 box toggle"><img src="img/plus.png" class="toggle-btn"/></div></div></div></div><div class="sections"></div>');
}
return buf.join("");
};
});

;require.register("templates/receiptdetail", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="col-md-4"><div class="row"><div class="receiptdetail"><img');
buf.push(attrs({ 'src':('http://drive.intermarche.com/ressources/images/produit/vignette/0' + (receiptDetail.barcode) + '.jpg'), "class": ('image') }, {"src":true}));
buf.push('/><div class="detail">');
 var label = receiptDetail.label.toLowerCase();
 if (label == "nr")
    label = receiptDetail.familyLabel.toLowerCase();
 var parts = label.split(' ');
 var vol = parts.pop();
 parts.join(' ');
buf.push('<div class="lab">');
var __val__ = label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
 //p.vol= vol
 //p= receiptDetail.amount 
 //   | X
buf.push('<div class="price">');
var __val__ = receiptDetail.price
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;€ </div></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/section", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="sectionhead"><img');
buf.push(attrs({ 'src':("img/Sections/" + (section.section) + ".png"), "class": ('sectionlogo') }, {"src":true}));
buf.push('/></div><div class="sectioninner"><div class="row section">');
 for (var i2 in section.receiptDetails) {
   var receiptDetail = section.receiptDetails[i2];
buf.push('<div class="col-md-4"><div class="row"><div class="receiptdetail"><img');
buf.push(attrs({ 'src':('http://drive.intermarche.com/ressources/images/produit/vignette/0' + (receiptDetail.barcode) + '.jpg'), "class": ('image') }, {"src":true}));
buf.push('/><div class="detail">');
 var label = receiptDetail.label.toLowerCase();
 if (label == "nr")
    label = receiptDetail.familyLabel.toLowerCase();
 var parts = label.split(' ');
 var vol = parts.pop();
 parts.join(' ');
buf.push('<div class="lab">');
var __val__ = label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</div>');
 //p.vol= vol
 //p= receiptDetail.amount 
 //   | X
buf.push('<div class="price">');
var __val__ = receiptDetail.price
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;€ </div></div></div></div></div>');
 }
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("views/app_view", function(exports, require, module) {
var IntermarcheView = require('./intermarche');
var ReceiptCollection = require('collections/receipts');
var OrangeView = require('./orange');
var PCAbstractCollection = require('collections/pcabstracts');
var PersonView = require('./person');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize")
    },
    events: {
        "click #courses": "getCourses",
        "click #cra": "getCRA"
    },
    
    toggleSelection: function(brand) {
        var other_map = {
            '#courses': '#cra',
            '#cra': '#courses'
        };

        this.$el.find(brand).attr('class', 'brand-selected');
        this.$el.find(other_map[brand]).attr('class', 'brand');

    },
    getCourses: function() {
        var receipts = new ReceiptCollection();
        intermarcheView = new IntermarcheView({
            collection: receipts
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);
        this.toggleSelection('#courses');
    },

    getCRA: function() {
        var pcAbstracts = new PCAbstractCollection();
        var orangeView = new OrangeView({
            collection: pcAbstracts
        });

        orangeView.render()
        this.$el.find('#content').append(orangeView.$el);
        this.toggleSelection('#cra');

    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});

});

;require.register("views/intermarche", function(exports, require, module) {
var ReceiptView = require('./receipt');

module.exports = IntermarcheView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/brandpanel'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onReceiptAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Courses"}));

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onReceiptAdded: function(receipt) {
        // render the specific element
        receiptView = new ReceiptView({
            model: receipt
        });
        receiptView.render();
        this.$el.find('#list').append(receiptView.$el);
    }


});

});

;require.register("views/orange", function(exports, require, module) {
var PCAbstractView = require('./pcabstract');

module.exports = OrangeView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/brandpanel'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onPCAbstractAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template({'title': "Mes Communications"}));

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onPCAbstractAdded: function(item) {
        // render the specific element
        itemView = new PCAbstractView({
            model: item
        });
        itemView.render();
        this.$el.find('#list').append(itemView.$el);
    }


})

});

;require.register("views/pcabstract", function(exports, require, module) {
var ItemView = require('./phonecommunicationlog');
var Collection = require('../collections/phonecommunicationlogs');


module.exports = PCAbstractView = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/pcabstract'),
    events: {
        "click .item_a": "toggleList",    
        //"click .toggle": "toggleSectionsNoDefault"    
    },

    initialize: function() {
//        this.collection = new Collection([], { date: this.model.attributes.key });
        
    },

    render: function() {
        this.$el.html(this.template({
            pcabstract: this.model.toJSON()
        }));
    },

    toggleList: function(event) {
        if (!this.open) {
            this.open = true;
            // submit button reload the page, we don't want that
            //event.preventDefault();
            //Seems dirty..
            this.collection = new Collection([], { date: this.model.attributes.key });
            
            this.listenTo(this.collection, "add", this.onItemAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();
            this.$el.find('.toggle-btn').attr('src', "img/moins.png");

        } else {
            this.stopListening(this.collection);
            this.$el.find('.list_b').empty();
            this.$el.find('.toggle-btn').attr('src', "img/plus.png");

            this.open = false;
        }
    },

    onItemAdded: function(item) {
        // render the specific element
        var itemView = new ItemView({
            model: item
        });
        itemView.render();
        this.$el.find('.list_b').append(itemView.$el);
    }
    
    
});


});

;require.register("views/person", function(exports, require, module) {
var PersonCollection = require('../collections/persons');

module.exports = Person = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/person'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.collection = new PersonCollection();
        this.listenTo(this.collection, "add", this.onPersonAdded);
    },

    render: function() {

 //       // we render the template

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onPersonAdded: function(person) {
        if (this.oneTime) {
            return;
        }
        this.oneTime = true;

        this.$el.html(this.template({
            person: person.toJSON()
        }));

    }

});

});

;require.register("views/phonecommunicationlog", function(exports, require, module) {
module.exports = PhoneCommunicationLog = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/phonecommunicationlog'),

    render: function() {
        this.$el.html(this.template({
            pcl: this.model.toJSON()
        }));
    },

});


});

;require.register("views/receipt", function(exports, require, module) {
var SectionView = require('./section');
var SectionCollection = require('../collections/sections');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    events: {
        "click .receipt": "toggleSections",    
        //"click .toggle": "toggleSectionsNoDefault"    
    },

    initialize: function() {
        this.collection = new SectionCollection([], { receiptId: this.model.attributes.receiptId });
        
    },

    render: function() {
        this.$el.html(this.template({
            receipt: this.model.toJSON()
        }));


    
    },
    

    toggleSections: function(event) {
        if (!this.open) {
            this.open = true;
            // submit button reload the page, we don't want that
            //event.preventDefault();
        
            this.listenTo(this.collection, "add", this.onSectionAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();

            this.$el.find('.toggle-btn').attr('src', "img/moins.png");

        } else {
            this.stopListening(this.collection);
            this.$el.find('.sections').empty();
            this.$el.find('.toggle-btn').attr('src', "img/plus.png");

            this.open = false;
        }
    },

    onSectionAdded: function(section) {
        // render the specific element
        sectionView = new SectionView({
            model: section
        });
        sectionView.render();
        this.$el.find('.sections').append(sectionView.$el);
    }
    
});


});

;require.register("views/section", function(exports, require, module) {
module.exports = Section = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/section'),

    render: function() {
        this.$el.html(this.template({
            section: this.model.toJSON()
        }));
    },

});


});

;
//# sourceMappingURL=app.js.map