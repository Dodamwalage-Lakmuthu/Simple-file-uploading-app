const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const app = express();
const port = 3000;
require('dotenv/config')

//middleware
app.set('view engine','ejs');
app.use(bodyParser.json());


//Importing routes
const indexRoute = require('./Routes/index');
const uploadRoute = require('./Routes/upload');
//const filesRoute = require('./Routes/files');


//Routes
app.use('/',indexRoute);
app.use('/upload',uploadRoute);
//app.use('/files',filesRoute);



//mongodb connection
const conn = mongoose.createConnection(process.env.DB_CONNECTION,
{ useUnifiedTopology: true,useNewUrlParser:true }
);


var gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})



app.get('/files', (req,res) =>{
    gfs.files.find().toArray((err,files) =>{
     if(!files || files.length ===0){
         return res.status(404).json({
             err: 'No files Exists'
         });
     }
     return res.json(files);
 })
});





//server listning to port
app.listen(port, () =>{
    console.log(`Server is up and running on ${port}`)
});
