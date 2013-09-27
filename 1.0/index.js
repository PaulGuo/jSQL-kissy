/**
 * @fileoverview 
 * @author liuhuo.gk<badkaikai@gmail.com>
 * @module jSQL-kissy
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class JSQL-kissy
     * @constructor
     * @extends Base
     */
    function JSQL-kissy(comConfig) {
        var self = this;
        //调用父类构造函数
        JSQL-kissy.superclass.constructor.call(self, comConfig);
    }
    S.extend(JSQL-kissy, Base, /** @lends JSQL-kissy.prototype*/{

    }, {ATTRS : /** @lends JSQL-kissy*/{

    }});
    return JSQL-kissy;
}, {requires:['node', 'base']});



