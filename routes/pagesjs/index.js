const express = require('express');
const route = express.Router();




const path =require('path');


route.get('/repos',(req,res) => {
    
    res.sendFile(path.join(__dirname,'..','..','pages','repoview','index.html'))
})


module.exports = route;