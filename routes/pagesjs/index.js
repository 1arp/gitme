const express = require('express');
const route = express.Router();

const path =require('path');

const api = require('../api')

var username = undefined;


// MANGING PAGE
route.get('/repos',(req,res) => {

    username = req.query.username;
    res.sendFile(path.join(__dirname,'..','..','pages','repoview','index.html'))
})


//PAGE REQUESTS
route.get('/getrepos', async(req,res) => {
    const repos = await api.getRepos(username);
    res.send(repos);
})



module.exports = {
    route,
    username
};

