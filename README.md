Welcome to PlaceMark
==============================

Name : Patrick Marnane  
Student Number: 03028003

This PlaceMark application is an application that will allow users to store points of interest(POI) to them..

The user is able to enter the POI name, description, select a category it belongs to and provide it's latitude and longitude.

It is proposed in later releases of the application that the user will be able to:

- Log a visit to the POI providing information and upload images for that entry.
- Users can edit there details

An administrator dashboard is provided that will allow administrators to delete user accounts and add or remove categories for use by users.

ToDo List:
- Add Joi validation for creating visit logs
- Add API for visits, categories and activities
- Add Swagger API documentation for API mentioned in previous item

Known Bugs/Issues:
 - Adding user via API call, scope is not added. Resolution is to store and add scope on server side.
 Not added to User API documentation for security purposes.