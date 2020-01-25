const express = require('express');
const route = express.Router();

const path =require('path');

const api = require('../api')


// MANGING PAGE
route.get('/repos',(req,res) => {
    res.sendFile(path.join(__dirname,'..','..','pages','repoview','index.html'))
})



module.exports = {
    route
};

