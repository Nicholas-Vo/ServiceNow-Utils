/* Create new users - Business Rule */
/* This is an after insert business rule that runs when the project catalog item is submitted.
The BR creates a new user in order to mimic a real-world scenario where a user is created in active directory by IT */
(function executeRule(current, previous) {
    var user_gr = new GlideRecord('sys_user');
    user_gr.addQuery('employee_number', current.variables.employee_number);
    user_gr.setLimit(1);
    user_gr.query();

    // Check if user with that employee number already exists
    if (user_gr.next()) {
        gs.error('User ' + user_gr.name + ' already exists!', 'Create new users BR');
        return;
    }

    user_gr.initialize();
	user_gr.setWorkflow(false); // Prevent BRs from running (prevents info message in portal)

    var catalog_variables = current.variables;

    for (var i in catalog_variables) {
        var field_name = catalog_variables[i].getName(); // the variable's internal name (ex. 'first_name')
        var field_value = catalog_variables[i]; // the variable's value (ex. 'Nick')

        user_gr.setValue(field_name, field_value);
    }

    // Set the user name. The below method handles cases where
    // the username already exists. If so, it appends a number
    user_gr.setValue('user_name', NickUserIdGenerator.generate(catalog_variables.first_name, catalog_variables.last_name));

    // Storing the company email domain (nick.com) in a system property, for easy maintainability
    user_gr.setValue('email', user_gr.user_name + '@' + gs.getProperty('nick.company.email.domain'));

    // Create the record; update() will return the sys id of the new record
    // If this is null, that means record creation failed.
    var record_sys_id = user_gr.update();

    // record creation failed! generate incident to the admin team
    if (gs.nil(record_sys_id)) {
        // sys id of the 'admins' sys_user_group
        var ADMIN_GROUP = 'fac78e15937012107358fde08bba10d7';
        var SYSTEM_ADMIN_USER = '6816f79cc0a8016401c5a33be04be441';
        var short_desc = 'Error in the Onboarding Create new users business rule: Failed to create user ' + first_name + ' ' + last_name;

        NickIncidentUtil.createIncident(
            short_desc, // Pass in short description
            SYSTEM_ADMIN_USER, // Pass in the caller
            'software', // Pass in category
            ADMIN_GROUP, // Pass in assignment group
            '1', // Impact
            '1' // Urgency
        );
    }
})(current, previous);