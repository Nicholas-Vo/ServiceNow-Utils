/*
  ServiceNow HTML utility functions
  Author: Nick Voss
  Date: July 5, 2023
  Description: Demonstrates some options for parsing HTML. Note that arsing HTML via regex is not a best practice, 
  however these functions work in many use cases. Another option is GlideSPScriptable().stripHTML()
*/

function decodeHTML(str) {
    var a = str.replace(/<\/?[^>]+(>|$)/g, "");
    var b = a.replace(/&amp;/g, '&'); // Retain any ampersands that are just ampersands
    return b.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec); // Return the special character from the decimal code representation and return the entire decoded string.
    });
}

function removeHTML(text) {
    var lineBreakRegex = /<br\s\/>/ig;
    var tagRegex = /<\/?[a-z][\s\S]*?(?:\/>|>)/ig;

    var temp = text.replace(lineBreakRegex, '\r\n');
    return temp.replace(tagRegex, "");
}
