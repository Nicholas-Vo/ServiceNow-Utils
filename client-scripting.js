/* Use Self-Executing Functions

A self-executing function is both declared and invoked within the same script field.
Whenever writing a script that only needs to run in a single context, use this type of function.
For functions that must run in multiple contexts, consider reusable functions instead.
By enclosing your script in a self-executing function you can ensure that the script does not impact other areas of the product, such as by overwriting global variables.

*/

(function functionName() {

  g_form.addInfoMessage('Hello World!');

})(); /* parenthesis indicate that this function should run */

