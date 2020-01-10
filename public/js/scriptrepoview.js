var mainList = document.getElementById('mainList')
var filtrBtn = document.getElementById('filterBtn')


async function getRepos(){
    const response = await fetch('/pages/getrepos');
    const repos = await response.json();
    return repos;
}

function render(repos){

    repos.forEach(element => {
        console.log(element.id)
    });

}




var repos = undefined;
var languages = [];
async function init(){
    repos = await getRepos();
    render(repos);
    repos.map(element => languages.push(element.language))
    languages = [... new Set(languages)]
    console.log(languages);
}



init()

filterBtn.onclick = function(){
    var newrepo = repos.filter((element) => element.name == 'twitter_particle' ) 
    console.log('#')
    render(newrepo)
}


console.log(getRepos())