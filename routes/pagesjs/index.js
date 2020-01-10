const express = require('express');
const route = express.Router();

const path =require('path');


var username = undefined;

route.get('/repos',(req,res) => {

    username = req.query.username;
    res.sendFile(path.join(__dirname,'..','..','pages','repoview','index.html'))
})

module.exports = {
    route,
    username
};

// module.exports = {
//     route : route,
//     username : username,
// };