const express = require('express');
const router = express.Router();
const upload = require('../st_engine');


router.post('/', upload.single('file'),(req,res) =>{
    //res.json({file : req.file})
    res.redirect('/');
});


module.exports = router;