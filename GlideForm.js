/*
  ServiceNow GlideForm and GlideAJAX Example
  Author: Nick Voss
  Date: August 8, 2023
  Description: This script demonstrates the usage of the GlideForm and GlideAJAX APIs.
*/

/* Below line grabs the label from a Choice field, not the value
Does NOT work in the service portal and does not appear to work in agent workspace either.

g_form.getDisplayValue() is an option that does work in workspace.

https://www.servicenow.com/community/developer-forum/g-form-get-label-of-choice/m-p/1729044
*/
var foo = g_form.getOption("type", g_form.getValue("type")).text;

/* g_aw is glide agent workspace. openRecord() takes in the table name, sys id (-1 for new) and optional paramaters. 

https://developer.servicenow.com/dev.do#!/reference/api/tokyo/client/GlideAgentWorkspaceAPI
*/
g_aw.openRecord('task', // Table name
                '-1', // Sysid
                { 
                  "query": query,
                  "foo": bar
                } // Params
               );

// Another example
var params = {
  readOnlyForm: true,        // Whether the form should be read-only
  defaultTab: "details",     // The default tab to open (replace with actual tab name)
  hideDetails: false         // Whether to hide the record details
};

g_aw.openRecord("incident", "1234567890abcde2341f", params);
