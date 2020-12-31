const express = require('express');
const router = express.Router();
const app = require('../app');
const Grid = require('gridfs-stream');
const fs = require('fs');

 router.get('/', (req,res) =>{
    fs.app.gfs.files.findAll().toArray((err,files) =>{
     if(!files || files.length ===0){
         return res.status(404).json({
             err: 'No files Exists'
         });
     }
     return res.json(files);
 })
});



module.exports = router;