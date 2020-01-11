const express = require("express");
const axios = require("axios").default;
const route = express.Router();

async function getRepos(username) {

    var response = await axios.get(`https://api.github.com/users/${username}/repos`);
    var repos = await response.data;
    console.log(response.headers['x-ratelimit-remaining']);

    return repos;
}

async function getProfile(username) {
    var response = await axios.get(`https://api.github.com/users/${username}`)
    var data = await response.data;
    return response.data;
}


route.get("/:id/repos", async (req, res) => {
    var repos = await getRepos(req.params.id);
    res.send(repos);
});




module.exports = {
    route,
    getRepos,
    getProfile
};
