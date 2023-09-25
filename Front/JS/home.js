let login = document.getElementById("loginBtn");
let register = document.getElementById("registerBtn");
let username = document.getElementById("username");
let play = document.getElementById("PlayBtn");

socket.emit("isSession", "");

socket.on("onSession", data => { //affichage selon s'il y a une session d'active ou non
    if (data) {
        login.style.display = "none";
        register.style.display = "none";
        username.innerHTML = "<img alt='account' src='../img/person-square.svg'>" + data;
        play.style.display = "block";
    }
    else {
        login.style.display = "block";
        register.style.display = "block";
        play.style.display = "none";
    }
});