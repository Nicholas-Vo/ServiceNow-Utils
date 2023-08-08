/* 
Author: Nick Voss
Date: July 3, 2023

A simple client script to change a field based off of the value of another field.
In this instance, when the agent updates the opened_for field, we want the
location field to automatically populate.

UI Type: All
Type: OnChange
Field name: Opened for
Global: true
 */
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue === '') {
        return;
    }

    g_form.getReference('opened_for', setUserLocationCallback);
}

function setUserLocationCallback(user) {
    g_form.setValue('location', user.location);
}
