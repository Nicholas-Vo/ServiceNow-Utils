/*
Catalog Client Script
*/
function onLoad() {
    var a_glide_ajax = new GlideAjax('NickAJAXUtil');
    a_glide_ajax.addParam('sysparm_name', 'getUserLocation');
    a_glide_ajax.addParam('sysparm_user', g_form.getValue('requested_for'));

    a_glide_ajax.getXMLAnswer(function (response) {
        g_form.setValue('location', response);
    });
}

/*
AbstractAjaxProcessor utility Script Include
*/
var NickAJAXUtil = Class.create();
NickAJAXUtil.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    getUserLocation: function () {
        var user = this.getParameter('sysparm_user');

        var gr_user = new GlideRecord('sys_user');
        if (gr_user.get(user)) {
            return gr_user.location;
        }
    },

    type: 'NickAJAXUtil'
});
