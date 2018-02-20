# Angular-Schema-Editor

Technical Specifications
------------------------
Given the custom domain of these projects, it is fully expected that you may need to modify the source code for your purposes.

You may want to modify to style the form or add validations to the form controls.  I prefer to leave the validations in the model.

I've provided an example use case, in the form of a grid with some form components.

Dependencies are all included in the project.  Primarily bootstrap, angular, ui-grid.  No steps to setting up beyond downloading.

Demo here : https://plnkr.co/edit/xa5EsR?p=info

## JSON Schema

FormController.js, form.html

This is a schema that can build a form/fiter and grid using specified JSON meta data.  

By specifying some meta data, you can quickly build a screen without coding the UI.

This is especially helpful for a use case requiring screens with a lot of inputs or filters, and/or data to display.

Once you have the screen and have specified the data collection, you can code what you want to do with any input data.

## Schema Editor

script.js, index.html

In addition I've supplied a screen you can use to build the JSON meta data and output it.  This allows you to add columns and specify data about the columns.

Field : Ideally this is the name of the field in the model you will be saving off or validating against.  
Type : This is the data type.  TODO : This applies only to the grid now,  need to change form input type based on this.
1.) String
2.) Number
3.) Date
4.) Datetime
5.) Boolean.  
Read Only : Specify whether data can be viewed only
Caption : This will be the label and placeholder if applicable.  
Value : This will be the value that is initially loaded, and will become value that is supplied on submit.  
Visible : Whether grid column is shown intially.
Sequence : Order in which form controls, and grid columns will show.  

Client Reference
---------------------
Add schema columns or fields with the add button.

Remove selected rows with the delete button.

Once you have the grid completed, use the update JSON button to build the output.

Alternatively you can paste the JSON in and use the update Grid button to build the grid from the schema and modify from there.

The preview button will build a grid and form using the JSON schema properties.
