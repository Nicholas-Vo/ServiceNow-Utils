// Generates user IDs for new users

// Example: Inputs of 'nick' and 'voss' will return nick.voss

// If nick.voss already exists, 'nick.voss1' will be returned

var NickUserIdGenerator = Class.create();
NickUserIdGenerator.prototype = {
    initialize: function() {},

    type: 'NickUserIdGenerator'
};

NickUserIdGenerator.generate = function(first_name, last_name, suffix_number) {
    // Ensure both first and last names are strings and lowercase
    first_name = String(first_name).toLowerCase();
    last_name = String(last_name).toLowerCase();

    // If suffix_number is not provided, default to 0
    if (gs.nil(suffix_number)) {
        suffix_number = 0;
    }

    // Prevent crazy infinite recursive calls
    if (suffix_number > 50) {
        return 'null';
    }

    var user_name;

    if (suffix_number > 0) {
        user_name = first_name + '.' + last_name + suffix_number;
    } else {
        user_name = first_name + '.' + last_name;
    }

    // Check if this user_id already exists in sys_user
    var user_gr = new GlideRecord('sys_user');
    user_gr.addQuery('user_name', user_name);
    user_gr.setLimit(1);
    user_gr.query();

    // If no user is found with this user_id, return it
    if (!user_gr.next()) {
        return user_name;
    }

    // If user is found, increment suffix_number and retry (this is recursion!)
    return this.generate(first_name, last_name, suffix_number + 1);
};