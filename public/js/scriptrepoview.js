var mainList = document.getElementById('mainList')
var divavatar = document.getElementById('avatar')
var avatarImg = document.getElementById('avatarImg')
var filtrBtn = document.getElementById('filterBtn')
var langFltr = document.getElementById('langFltr')
var forkFltr = document.getElementById('forkFltr')


//  Fecthing Repos
async function getRepos(){
    const response = await fetch('/pages/getrepos');
    const repos = await response.json();
    return repos;
}

// Fetching Profile Picture
async function getProfile(){
    const profileResponse = await fetch('/pages/getprofile');
    const profile = await profileResponse.json();

    return profile;
    
}

// DOM mainupulation
function loadDropdown(dropdown, list , clickfn){
    
    dropdown.innerHTML = ''
    list.forEach(element => {   
        var drpaction = document.createElement('button')
        drpaction.innerText = element;
        drpaction.classList.add('dropdown-item');
        drpaction.setAttribute('type','button');
        drpaction.onclick = () => {
            clickfn(element);
        }
        dropdown.appendChild(drpaction);

    })
}


// FIlter Functions
function fltrLang(lang){

    var fltrList = repos.filter((element) => element.language == lang ) 
    console.log('****')
    render(fltrList)

}

function fltrFork(minForks){
    var fltrList = repos.filter((element) => element.forks_count >= minForks )
    console.log('###')
    render(fltrList)
}

var currLang = 'All';
function fltrAll(lang){
    if(lang)
        currLang = lang
    
        var filterList = undefined;
    if(currLang!='All'){
        fltrList =  repos.filter((element) => element.language == currLang )
    }else{
        fltrList = repos;
    }

    fltrList = fltrList.filter((element) => element.forks_count >= forkFltr.value)

    if(filterList == undefined)
        console.log('no such repos exist')
    render(fltrList); 
}



// Render Functions

function render(repos){

    repos.forEach(element => {
        console.log(`${element.id} language : ${element.language}`)
    });

}




// INITIALIZATION
var repos = undefined;
var languages = [];
var forkcount = [];
var maxforkcount = undefined;
var profile = undefined;
async function init(){
    
    profile = await getProfile();

    avatarImg.src = await profile.avatar_url;

    repos = await getRepos();
    render(repos);

    // var avatarimg = document.createElement('img');
    // avatarimg.src = await getAvatar();
    // divavatar.appendChild(avatarimg);

    

    repos.map(element => {
        languages.push(element.language);
        forkcount.push(element.forks_count);
    })
    languages = [... new Set(languages)]

    // slider setup
    maxforkcount = Math.max(...forkcount);
    console.log(maxforkcount);
    forkFltr.setAttribute('max',maxforkcount);
    console.log(languages);
    loadDropdown(langFltr,languages,fltrAll)

}



init()

filterBtn.onclick = function(){
    var newrepo = repos.filter((element) => element.name == 'twitter_particle' ) 
    console.log('#')
    render(newrepo)
}

forkFltr.oninput = function(){
    fltrAll()
}


console.log(getRepos())