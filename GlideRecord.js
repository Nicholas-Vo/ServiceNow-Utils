/* Query the CSM case table using an encoded query (SN Utils allows you to grab these easily from lists). */
var gr = new GlideRecord('sn_customerservice_case');

var serviceNowAssignGroupSysId = 'df6a7c00db253b407d2859b2ca961961';
gr.addEncodedQuery('active=true^assignment_group=' + serviceNowAssignGroupSysId);
gr.query();

gs.info('Found ' + gr.getRowCount() + ' records');

var array = [];
while (gr.next()) {
    array.push(gr.getDisplayValue('number'));
}

gs.info(array.join(' - '));
