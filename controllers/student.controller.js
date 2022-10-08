const pool = require('../config/db.config');
const { validationResult } = require('express-validator');



const createStudent = (req,res)=>{
    var Error = []
    if(req.body.name === "" || req.body.name === null || req.body.name === undefined){
        Error.push({"name":"name field is required"})
    }
    if(req.body.email === "" || req.body.email === null || req.body.email === undefined){
        Error.push({"email":"email field is required"})
    }
    if(req.body.standard === "" || req.body.standard === null || req.body.standard === undefined){
        Error.push({"standard":"standard field is required"})
    }
    if(Error.length>0){
        return res.status(500).json({
            statusCode:'500',
            status:'Error',
            body: Error
        });
    }
    const {name, email, standard} = req.body;
    
    var imgsrc = "#"
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
    }
        pool.query("SELECT id FROM student_information WHERE name='"+name.trim()+"' AND email='"+email.trim()+"'", (err,data)=>{
            if(err){
    
                return res.status(500).json({
                    statusCode:'500',
                    status:'Error',
                    body: err.sqlMessage
                });

            }else {
                if(data.length>0){
                    return res.status(400).json({
                        statusCode:'400',
                        status:'Student already registered',
                    });
                }
                pool.query('INSERT INTO student_information (name, email, class,image) VALUES (?, ?, ?,?)', [name.trim(), email.trim(), standard.trim(),imgsrc], (err,data)=>{

                    if(err){
        
                        return res.status(500).json({
                            statusCode:'500',
                            status:'Error',
                            body: err.sqlMessage
                        });
        
                    }else {
                        return res.status(200).json({
                            statusCode:'200',
                            status:'Student created successfully',
                        });
                    }
        
                });
            }
        })
        
}
const updateStudent = (req,res)=>{
    var Error = []
    if(req.body.name === "" || req.body.name === null || req.body.name === undefined){
        Error.push({"name":"name field is required"})
    }
    if(req.body.email === "" || req.body.email === null || req.body.email === undefined){
        Error.push({"email":"email field is required"})
    }
    if(req.body.standard === "" || req.body.standard === null || req.body.standard === undefined){
        Error.push({"standard":"standard field is required"})
    }
    if(Error.length>0){
        return res.status(500).json({
            statusCode:'500',
            status:'Error',
            body: Error
        });
    }
    const {id,name, email, standard} = req.body;
    
    
        pool.query("SELECT id FROM student_information WHERE name='"+name.trim()+"' AND email='"+email.trim()+"' AND id!='"+id+"'", (err,data)=>{
            if(err){
    
                return res.status(500).json({
                    statusCode:'500',
                    status:'Error',
                    body: err.sqlMessage
                });

            }else {
                if(data.length>0){
                    return res.status(400).json({
                        statusCode:'400',
                        status:'Student already exist',
                    });
                }
                var imgsrc = "#"
                if (!req.file) {
                    pool.query("UPDATE student_information SET email='"+email.trim()+"',name='"+name.trim()+"',class='"+standard.trim()+"' WHERE id='"+id+"'", (err,data)=>{

                        if(err){
            
                            return res.status(500).json({
                                statusCode:'500',
                                status:'Error',
                                body: err.sqlMessage
                            });
            
                        }else {
                            return res.status(200).json({
                                statusCode:'200',
                                status:'Student updated successfully',
                            });
                        }
            
                    });
                } else {
                    console.log(req.file.filename)
                    var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
                    pool.query("UPDATE student_information SET email='"+email.trim()+"',name='"+name.trim()+"',class='"+standard.trim()+"',image='"+imgsrc+"' WHERE id='"+id+"'", (err,data)=>{

                        if(err){
            
                            return res.status(500).json({
                                statusCode:'500',
                                status:'Error',
                                body: err.sqlMessage
                            });
            
                        }else {
                            return res.status(200).json({
                                statusCode:'200',
                                status:'Student updated successfully',
                            });
                        }
            
                    });
                }
                
            }
        })
        
}
const viewStudent = (req,res)=>{

    const {OFFSET, LIMIT} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({
            statusCode:'400',
            status:'Error',
            body: errors.array()
        });
    }   
        pool.query("SELECT * FROM student_information ORDER BY created_at DESC  LIMIT "+LIMIT+" OFFSET "+OFFSET, (err,data)=>{
            if(err){
    
                return res.status(500).json({
                    statusCode:'500',
                    status:'Error',
                    body: err.sqlMessage
                });

            }else {
                if(data.length>0){
                    return res.status(200).json({
                        statusCode:'200',
                        students:data,
                    });
                }else{
                    return res.status(400).json({
                        statusCode:'400',
                        message:"No students found",
                    });
                }
            }
        })
        
}
const deleteStudent = (req,res) =>{
    const {id} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({
            statusCode:'400',
            status:'Error',
            body: errors.array()
        });
    }
        pool.query("DELETE FROM student_information WHERE id='"+id.trim()+"'", (err,data)=>{
            if(err){
    
                return res.status(500).json({
                    statusCode:'500',
                    status:'Error',
                    body: err.sqlMessage
                });

            }else {
                return res.status(200).json({
                    statusCode:'200',
                    status:'Student deleted successfully',
                });
            }
        })
}


module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    viewStudent,
}