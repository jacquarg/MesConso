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

;require.register("collections/persons", function(exports, require, module) {
Person = require('../models/person');
module.exports = Persons = Backbone.Collection.extend({

    url: 'persons',
    model: Person

});

});

;require.register("collections/receiptdetails", function(exports, require, module) {
ReceiptDetail = require('../models/receiptdetail');
module.exports = ReceiptDetails = Backbone.Collection.extend({
    model: ReceiptDetail,
    url: 'receiptdetails'
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
        return '/receipts/' + this.receiptId + '/sections';
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

;require.register("models/person", function(exports, require, module) {
module.exports = Person = Backbone.Model.extend({

});

});

;require.register("models/receipt", function(exports, require, module) {
module.exports = Receipt = Backbone.Model.extend({

})

});

;require.register("models/receiptdetail", function(exports, require, module) {
module.exports = ReceiptDetail = Backbone.Model.extend({

});

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

;require.register("templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><div id="fix"></div><h1 id="test1">Test1</h1><h1 id="test2">Mes caddies !</h1><div id="content"></div></div>');
}
return buf.join("");
};
});

;require.register("templates/intermarche", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="list" class="row"></div>');
}
return buf.join("");
};
});

;require.register("templates/intermarchewsubs", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="list" class="row"><p>');
var __val__ = receipts
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div>');
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
buf.push('<h2>MesDonnées «fixes»</h2><div class="row"><div class="col-md-4"><p>');
var __val__ = person.lastname
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;');
var __val__ = person.firstname
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.birthdate
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.adress1
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div><div class="col-md-4"><p>');
var __val__ = person.phoneNumber
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.email
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.hasChildren
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div><div class="col-md-4"><p>');
var __val__ = person.csp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.maritalStatus
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = person.drivingLicence
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div></div>');
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
buf.push('<div class="col-md-12"><h2 class="receipt">');
var __val__ = receipt.timestamp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h2>');
 var dt = new Date(receipt.timestamp)
var __val__ = dt.getDate()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('/');
var __val__ = dt.getMonth()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('h');
var __val__ = dt.getHours()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push(':');
var __val__ = dt.getMinutes()
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&nbsp;');
var __val__ = receipt.articlesCount
buf.push(escape(null == __val__ ? "" : __val__));
var __val__ = receipt.total
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('€<a');
buf.push(attrs({ 'href':("http://fc1.1bis.com/intermarche/map.asp?id=IMARC" + (receipt.intermarcheShopId) + "") }, {"href":true}));
buf.push('>magasin</a> infos supplémentaires');
var __val__ = receipt.receiptId
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<div class="thumbnail row sections"></div></div>');
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
buf.push('<div class="col-md-6"><div class="thumbnail row"><div class="col-md-2 text-center"><img');
buf.push(attrs({ 'src':('http://drive.intermarche.com/ressources/images/produit/vignette/0' + (receiptDetail.barcode) + '.jpg'), 'receiptDetail.barcode':(true), "class": ('img-responsive') }, {"src":true,"receiptDetail.barcode":true}));
buf.push('/><h4>');
var __val__ = receiptDetail.price
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4>&nbsp;€</div><div class="col-md-10">');
 var label = receiptDetail.label.toLowerCase();
 var parts = label.split(' ');
 var vol = parts.pop();
 parts.join(' ');
buf.push('<h4>');
var __val__ = label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4><p>');
var __val__ = receiptDetail.sectionLabel 
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&gt;');
var __val__ = receiptDetail.familyLabel
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&gt;<small>');
var __val__ = receiptDetail.barcode
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</small></p><p>');
var __val__ = receiptDetail.amount 
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('X</p><p>');
var __val__ = vol
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p> \nlibellé nice case\npods / volume\nprix\nimage</p></div></div></div>');
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
buf.push('<div class="col-md-10 col-md-offset-1"><h3>');
var __val__ = section.sectionLabel
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h3><div class="row">');
 for (var i2 in section.receiptDetails) {
   var receiptDetail = section.receiptDetails[i2];
buf.push('<div class="col-md-6"><div class="thumbnail row"><div class="col-md-2 text-center"><img');
buf.push(attrs({ 'src':('http://drive.intermarche.com/ressources/images/produit/vignette/0' + (receiptDetail.barcode) + '.jpg'), 'receiptDetail.barcode':(true), "class": ('img-responsive') }, {"src":true,"receiptDetail.barcode":true}));
buf.push('/><h4>');
var __val__ = receiptDetail.price
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4>&nbsp;€</div><div class="col-md-10">');
 var label = receiptDetail.label.toLowerCase();
 var parts = label.split(' ');
 var vol = parts.pop();
 parts.join(' ');
buf.push('<h4>');
var __val__ = label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4><p>');
var __val__ = receiptDetail.sectionLabel 
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&gt;');
var __val__ = receiptDetail.familyLabel
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('&gt;<small>');
var __val__ = receiptDetail.barcode
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</small></p><p>');
var __val__ = receiptDetail.amount 
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('X</p><p>');
var __val__ = vol
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p> \nlibellé nice case\npods / volume\nprix\nimage</p></div></div></div>');
 }
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("views/app_view", function(exports, require, module) {
var IntermarcheView = require('./intermarche');
var IntermarcheWSubsView = require('./intermarchewsubs');
var ReceiptDetailCollection = require('collections/receiptdetails');
var ReceiptCollection = require('collections/receipts');
var PersonView = require('./person');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize")
    },
    events: {
        "click #test1": "getList",
        "click #test2": "getTruc"
    },
    
    getList: function() {
        var receiptDetails = new ReceiptDetailCollection();
        intermarcheView = new IntermarcheView({
            collection: receiptDetails
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);
        
    },

    getTruc: function() {
        var receipts = new ReceiptCollection();
        intermarcheView = new IntermarcheWSubsView({
            collection: receipts
        });

        intermarcheView.render()
        this.$el.find('#content').append(intermarcheView.$el);

    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
       // this.collection.fetch();

        var personView = new PersonView();
        personView.render();

        this.$el.find('#fix').append(personView.$el);
    },

});

});

;require.register("views/intermarche", function(exports, require, module) {
var ReceiptDetailView = require('./receiptdetail');

module.exports = IntermarcheView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/intermarche'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize intermarche")
        this.listenTo(this.collection, "add", this.onReceiptDetailAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the bookmarks from the database
        this.collection.fetch();
    },


    onReceiptDetailAdded: function(receiptDetail) {
        // render the specific element
        receiptDetailView = new ReceiptDetailView({
            model: receiptDetail
        });
        receiptDetailView.render();
        this.$el.find('#list').append(receiptDetailView.$el);
    }

});


});

;require.register("views/intermarchewsubs", function(exports, require, module) {
var ReceiptView = require('./receipt');

module.exports = AppView = Backbone.View.extend({

    el: '#content',
    template: require('../templates/intermarche'),

    /*render: function() {
        this.$el.html(this.template({
            receipts: this.collection.toJSON()
        }));

        return this;
    }*/


    // initialize is automatically called once after the view is constructed
    initialize: function() {
        console.log("Initialize intermarcheWSUBS")
        this.listenTo(this.collection, "add", this.onReceiptAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

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

;require.register("views/person", function(exports, require, module) {
var PersonCollection = require('../collections/persons');

module.exports = Person = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/person'),

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.collection = new PersonCollection();
        console.log("Initialize persfs.createReadStreaon")
        this.listenTo(this.collection, "add", this.onPersonAdded);
    },

    render: function() {

 //       // we render the template
 //       this.$el.html(this.template());

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

;require.register("views/receipt", function(exports, require, module) {
var SectionView = require('./section');
var SectionCollection = require('../collections/sections');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    events: {
        "click .receipt": "toggleSections"    
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
            event.preventDefault();
        
            this.listenTo(this.collection, "add", this.onSectionAdded);
            // fetch the bookmarks from the database
            this.collection.fetch();

        } else {
            this.stopListening(this.collection);
            this.$el.find('.sections').empty();

            this.open = false;
        }
    },

    onSectionAdded: function(section) {
        console.log("added section");
        // render the specific element
        sectionView = new SectionView({
            model: section
        });
        sectionView.render();
        this.$el.find('.sections').append(sectionView.$el);
    }
    


    /*render: function() {

        // we render the template
        this.$el.html(this.template(
            {
                receipt: JSON.dumps(this.receipt)
            }
            )
        );

        for (var idx=0; idx<this.receipt.sections.length; idx++) {
            receiptDetail = this.receipt.sections[idx];

            // render the specific element
            sectionView = new SectionView({
                section: section
            });

            sectionView.render();
            this.$el.find('#list').append(receiptDetailView.$el);
        }
     }*/

});


});

;require.register("views/receiptdetail", function(exports, require, module) {
module.exports = ReceiptDetail = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receiptdetail'),
//    events: {
//        'click a.delete': 'deleteBookmark'
//    },

    render: function() {
        this.$el.html(this.template({
            receiptDetail: this.model.toJSON()
        }));
    },

//    deleteBookmark: function() {
//        this.model.destroy();
//        this.remove();
//    }
});

});

;require.register("views/section", function(exports, require, module) {
//var ReceiptDetailView = require('./receiptdetail');

module.exports = Section = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/section'),

    render: function() {
        this.$el.html(this.template({
            section: this.model.toJSON()
        }));
    },

    /*render: function() {

        // we render the template
        this.$el.html(this.template(
            {
                section: JSON.dumps(this.section)
            }
            )
        );

        for (var idx=0; idx<this.section.receiptDetails.length; idx++) {
            receiptDetail = this.section.receiptDetails[idx];

            // render the specific element
            receiptDetailView = new ReceiptDetailView({
                model: receiptDetail
            });

            receiptDetailView.render();
            this.$el.find('#list').append(receiptDetailView.$el);
        }
     }*/

});


});

;
//# sourceMappingURL=app.js.map