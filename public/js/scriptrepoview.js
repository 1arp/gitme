var repoDisplay = document.getElementById('repoDisplay')

var avatarImg = document.getElementById('avatarImg')
var profileName = document.getElementById('profileName')
var profileUsername = document.getElementById('profileUsername')


var rangeOut = document.getElementById('rangeOut')

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

    // var item = createCard('twitter_particle','26-7-6','JavaScript');
    // repoDisplay.appendChild(item)
    repoDisplay.innerHTML =''

    repos.forEach(element => {
        var item = createCard(element.name,element.updated_at,element.language);
        item.onclick = ()=>{
            location.href=element.html_url;
        }
        repoDisplay.appendChild(item)
        console.log(`${element.id} language : ${element.language}`)
    });

}

function createCard(reponame,repolastupdate,repolanguage){
    var listItem = document.createElement('li');
    listItem.classList.add('row');
    
    var repoCard = document.createElement('div');
    repoCard.classList.add('repoCard');
    repoCard.classList.add('col-7');
    
    var repoName = document.createElement('h3');
    repoName.classList.add('repoName');
    repoName.innerText = reponame;
    
    var repoLastUpdate = document.createElement('p');
    repoLastUpdate.classList.add('repoLastUpdate');
    repoLastUpdate.innerText = `Updated At: ${repolastupdate}`;

    var repoLanguage = document.createElement('p');
    repoLanguage.classList.add('repoLanguage');
    repoLanguage.innerText = repolanguage;

    repoCard.appendChild(repoName);
    repoCard.appendChild(repoLastUpdate);
    repoCard.appendChild(repoLanguage);

    listItem.appendChild(repoCard);

    return listItem;


}


// INITIALIZATION
var repos = undefined;
var languages = ['All'];
var forkcount = [];
var maxforkcount = undefined;
var profile = undefined;
async function init(){
    
    profile = await getProfile();

    profileName.innerText = profile.name;
    profileUsername.innerText = profile.login;

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



forkFltr.oninput = function(){
    rangeOut.innerText = this.value
    fltrAll()
}




console.log(getRepos())