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

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()
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
buf.push('<div class="container"><h1 id="test1">Test1</h1><h1 id="test2">Mes caddies !</h1><div id="content"></div></div>');
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

;require.register("templates/receipt", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="col-md-12"><h2>');
var __val__ = receipt.timestamp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h2>&nbsp;');
var __val__ = receipt.ticketId
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<div class="thumbnail row">');
 for(var i1 in receipt.sections) {
   var section = receipt.sections[i1];
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
buf.push('</h4>&nbsp;€</div><div class="col-md-10"><h4>');
var __val__ = receiptDetail.label
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
buf.push('X , Le');
var __val__ = receiptDetail.timestamp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div></div></div>');
 }
buf.push('</div></div>');
 }
buf.push('</div></div>');
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
buf.push('</h4>&nbsp;€</div><div class="col-md-10"><h4>');
var __val__ = receiptDetail.label
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
buf.push('X , Le');
var __val__ = receiptDetail.timestamp
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></div></div></div>');
}
return buf.join("");
};
});

;require.register("views/app_view", function(exports, require, module) {
var IntermarcheView = require('./intermarche');
var IntermarcheWSubsView = require('./intermarchewsubs');
var ReceiptDetailCollection = require('collections/receiptdetails');
var ReceiptCollection = require('collections/receipts');



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

;require.register("views/receipt", function(exports, require, module) {
//var SectionView = require('./section');

module.exports = Receipt = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/receipt'),
    
    render: function() {
        this.$el.html(this.template({
            receipt: this.model.toJSON()
        }));
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
var ReceiptDetailView = require('./receiptdetail');

module.exports = Section = Backbone.View.extend({

    tagName: 'div',
    template: require('../templates/section'),
    
    render: function() {

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
     }

});


});

;
//# sourceMappingURL=app.js.map