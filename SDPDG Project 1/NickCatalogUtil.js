/* NickCatalogUtil - Script Include */
/* Very simple Catalog Utility class. Uses CartJS to submit a catalog item */

var NickCatalogUtil = Class.create();
NickCatalogUtil.prototype = {
    initialize: function() {},

    type: 'NickCatalogUtil'
};

NickCatalogUtil.submitCatalogItem = function(catalog_item_id, variables_obj, quantity) {
    var cart_js = new sn_sc.CartJS();

    var order_obj = {
        'sysparm_id': catalog_item_id,
        'sysparm_quantity': String(quantity),
        'variables': variables_obj
    };

    cart_js.orderNow(order_obj);
};