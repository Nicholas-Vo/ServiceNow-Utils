/* Submit an incident record programtically */

var NickIncidentUtil = Class.create();
NickIncidentUtil.prototype = {
    initialize: function() {},

    type: 'NickIncidentUtil'
};

NickIncidentUtil.createIncident = function(short_desc, caller, category, assignment_group, impact, urgency) {
    var incident_gr = new GlideRecord('incident');

    // Prevent any business rules from executing
    incident_gr.setWorkFlow(false);

    incident_gr.initialize();
    incident_gr.setValue('short_description', short_desc);
    incident_gr.setValue('caller_id', caller);
    incident_gr.setValue('category', category);
    incident_gr.setValue('assignment_group', assignment_group);

    if (impact) {
        incident_gr.setValue('impact', impact);
    }

    if (urgency) {
        incident_gr.setValue('urgency', urgency);
    }

	incident_gr.setValue('contact_type', 'automation');

    // Returns the sys_id of the record if successful, or null if fail
    return incident_gr.update();
};