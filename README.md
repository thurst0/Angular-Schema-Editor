# Angular-Schema-Editor

Technical Specifications
------------------------
Given the custom domain of these projects, it is fully expected that you may need to modify the source code for your purposes.

You may want to modify to style the form or add validations to the form controls.  I prefer to leave the validations in the model.

You can also use this schema data to create grids, charts, etc.

Demo here : https://plnkr.co/edit/xa5EsR?p=info

## ng-schema

This is a directive that can build a form using specified JSON meta data.  This data can be 

By specifying some meta data, you can quickly build a screen without coding the UI.
This is especially helpful for a use case requiring screens with a lot of inputs or filters.
Once you have the screen and have specified the data collection, you can code what you want to do with the input data.

## schema editor

In addition I've supplied a screen you can use to build the JSON meta data and output it.  This allows you to add columns and specify data about the columns.

Field - Ideally this is the name of the field in the model you will be saving off or validating against.
+Type - This is the data type
+String
+Number
+Date
+Datetime
+Boolean
Read Only 
Caption - This will be the label and placeholder if applicable.
Value - This will be the value that is initially loaded, and the value that is supplied on submit
Sequence - Order in which form controls will show.

Programming Reference
---------------------
form ng-schema="test.json" // This is the path and name of your JSON file.  Alternatively this can be a variable.
JSON Editor and Field Grid.

Dependencies
------------
bootstrap
angular

