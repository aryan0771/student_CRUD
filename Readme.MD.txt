Welcome to the readme file

First of all import the database to your SQL server

You can change cradentials for the database in .env file if required

To setup the project open student_CURD to cmd and run `npm install` to install all the dependencies

Then run `node app.js` to start the project

There is a postman collaction attached with the project you can use that collation to test the project


API Documentation

To create a student 
METHOD : POST
name,email and standard field is mandatory and you can upload image as optional parameter

TO update a student
METHOD : POST
id,name,email and standard field is mandatory and you can upload image as optional parameter

To view All student
METHOD : POST
You will need to pass OFFSET and LIMIT to body for pagination and you can keep it as 0 if not required

To delete student
METHOD : POST
You will need to pass id of student

