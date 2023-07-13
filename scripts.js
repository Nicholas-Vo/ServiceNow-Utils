/* Purge records from a table */
var theTable = "tablename";
var limit = 1000; // Set a limit - possible performance impact?
  
var gr = new GlideRecord(theTable);
gr.addNullQuery('name'); // Will query all records with null "name" field.
gr.setLimit(limit);
gr.query();
gr.deleteMultiple();
gs.info("Deleted " + gr.getRowCount() + " empty/null records from" + theTable + " table.");
