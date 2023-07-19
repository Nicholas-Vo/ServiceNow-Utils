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

/* GlideQuery is another option. It's a wrapper of GlideRecord, GlideRecordSecure, or GlideAggregate depending on 
functions used. Due to this it is not as performant. GlideQuery is more about readability, best practices and consistency.*/
new GlideQuery('change_request')
    .select()
    .forEach(function (foo) {
        gs.info(foo.sys_id);
    });

// It's more reminiscent of SQL.
new GlideQuery('task')
    .where('priority', 'IN', [1,2])
    .select('short_description', 'opened_at')
    .forEach(function (task) {
        gs.info('Task "' + task.short_description + '" was opened at ' + task.opened_at);
    });
