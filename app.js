require('dotenv').config();

const express = require('express');

const adminuserRoutes = require('./routes/student.routes');
const app = express();

const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = app;
app.use(adminuserRoutes);



app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
