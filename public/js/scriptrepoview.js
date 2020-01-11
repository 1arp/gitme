var mainList = document.getElementById('mainList')
var filtrBtn = document.getElementById('filterBtn')
var langFltr = document.getElementById('langFltr')


async function getRepos(){
    const response = await fetch('/pages/getrepos');
    const repos = await response.json();
    return repos;
}

langFltr.innerHTML = ''

function loadDropdown(dropdown, list , clickfn){
    
    dropdown.innerHTML = ''
    list.forEach(element => {   
        var drpaction = document.createElement('button')
        drpaction.innerText = element;
        drpaction.classList.add('dropdown-item');
        drpaction.setAttribute('type','button');
        drpaction.onclick = () => {
            clickfn(element)
        }
        dropdown.appendChild(drpaction);

    })
}


function fltrLang(lang){

    var fltrList = repos.filter((element) => element.language == lang ) 
    console.log('****')
    render(fltrList)

}


function render(repos){

    repos.forEach(element => {
        console.log(`${element.id} language : ${element.language}`)
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
    loadDropdown(langFltr,languages,fltrLang)

}



init()

filterBtn.onclick = function(){
    var newrepo = repos.filter((element) => element.name == 'twitter_particle' ) 
    console.log('#')
    render(newrepo)
}


console.log(getRepos())