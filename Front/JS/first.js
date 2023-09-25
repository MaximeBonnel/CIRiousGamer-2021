let socket = io();

socket.on('envoie', function (data) {
    $('.France').text(data.France);
    window.localStorage.setItem('France', JSON.stringify(data.France));
    //console.log(typeof(data.France.infecte));
    //fr.addEventListener("click", PropaFrance());
});

var fr = document.getElementsByClassName("France");

var France = window.localStorage.getItem('France');
var dataFrance = JSON.parse(France);
//console.log(typeof(dataFrance.infecte));

//addEventListener("click", PropaFrance, fr)

function PropaFrance() {
    if (dataFrance.infecte == false) {
        dataFrance.infecte = true;
        window.localStorage.setItem('France', JSON.stringify(dataFrance));

        //console.log("GL la france");
    }
    else {
        //console.log("GG la France");
        window.localStorage.setItem('France', JSON.stringify(dataFrance));
    }

    window.localStorage.setItem('France', JSON.stringify(dataFrance));

}