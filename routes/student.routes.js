const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const studentController = require('../controllers/student.controller');
const multer = require('multer');
const path = require('path');
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});


router.post('/student/create', upload.single('image'), studentController.createStudent);


router.post('/student/update', upload.single('image'), studentController.updateStudent);


router.post('/student/view', 
body('OFFSET', 'Name cannot be empty').notEmpty(),
body('LIMIT').notEmpty(),
 studentController.viewStudent);

router.post('/student/delete', 
body('id', 'id cannot be empty').notEmpty(), studentController.deleteStudent);

module.exports = router;