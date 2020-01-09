const express = require("express");
const axios = require("axios").default;
const route = express.Router();

async function getRepos(username) {
    try{
        var response = await axios.get(`https://api.github.com/users/${username}/repos`);
        var repos = await response.data;
        console.log(response.headers['x-ratelimit-remaining']);
        // var repos = await axios.get('https://jsonplaceholder.typicode.com/users');
    }catch(err){
        console.log(err)
    }

    return repos;
}

route.get("/:id/repos", async (req, res) => {
    try{
    var repos = await getRepos(req.params.id);
    }catch(err){
        console.log(err)
    }
    //   console.log(repos)
    res.send(repos);
});

module.exports = route;
