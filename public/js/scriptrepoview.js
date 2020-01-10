var mainList = document.getElementById('mainList')



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

async function init(){
    const repos = await getRepos();
    render(repos);
}

init()


console.log(getRepos())