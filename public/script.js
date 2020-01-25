var searchBtn = document.getElementById('searchButton');
var searchUsername = document.getElementById('username')



searchBtn.onclick = function() {
    localStorage.setItem("username", searchUsername.value )
}

