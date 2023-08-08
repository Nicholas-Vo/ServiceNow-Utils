/*
  ServiceNow GlideRecord and GlideQuery examples
  Author: Nick Voss
  Date: July 25th, 2023
  Description: This script demonstrates the usage of GlideRecord and GlideQuery.
*/

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

/* The get() method is a shorthand for a single-condition query. */
var gr = new GlideRecord('incident');

//gr.addQuery('sys_id', 'cb02fffc2fd831107ef4c786f699b667');
//gr.query();
//gr.next();

// This is the same as the above three lines.
gr.get('cb02fffc2fd831107ef4c786f699b667');

gs.info('Incident number is ' + gr.getValue('number'));

// get() should not be used client side as it cannot be called asynchronously.
// Instead, query() and setLimit(1) should be used. Client side GlideRecord objects
// support callback functions as seen below with this anonymous function within query():
var gr = new GlideRecord('incident');
gr.addQuery('sys_id', 'cb02fffc2fd831107ef4c786f699b667');
gr.setLimit(1);
gr.query(function(grInc) {
    if (grInc.next()) {
        // do something here
    }
});

/* GlideQuery is another option. It's a wrapper of GlideRecord, GlideRecordSecure, or GlideAggregate depending on 
methods used. Due to this it is not as performant. GlideQuery is more about readability, best practices and consistency.*/
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
