// on instancie les diferrents events :
let BoutonPause = document.getElementById("pause");
let BoutonSlow = document.getElementById("slow");
let BoutonSpeed = document.getElementById("speed");
let BoutonPlay = document.getElementById("play");
let title = document.querySelectorAll("#title");
let path = document.querySelectorAll("path");
// let a = document.querySelectorAll("a");
let output = document.getElementById("output");
let Alert = false;




var speed = 0;
var delayTime = 2000;
var timer = 0;
var pause = true;
var timerLoop;

var date = dateFromDay(2022, timer);

BoutonPause.addEventListener("click", Pause);
BoutonSlow.addEventListener("click", CompteurDecrease);
BoutonSpeed.addEventListener("click", CompteurIncrease);
BoutonPlay.addEventListener("click", Play);

function Pause() {
    clearInterval(timerLoop);
    pause = true;
}

function Play() {
    if (pause) {
        pause = false;
        timerLoop = setInterval(updateTimer, delayTime);
    }
}

function CompteurDecrease() {
    // speed minimum à -2
    if (speed > -2) {
        speed -= 1;

        switch (speed) {
            case 2:
                delayTime = 500;
                break;
            case 1:
                delayTime = 1000;
                break;
            case 0:
                delayTime = 2000;
                break;
            case -1:
                delayTime = 4000;
                break;
            case -2:
                delayTime = 8000;
                break;
        }

        clearInterval(timerLoop);
        timerLoop = setInterval(updateTimer, delayTime);
        // console.log(speed);
    }
}

function CompteurIncrease() {
    // speed maximum à 2
    if (speed < 2) {
        speed += 1;

        switch (speed) {
            case 2:
                delayTime = 500;
                break;
            case 1:
                delayTime = 1000;
                break;
            case 0:
                delayTime = 2000;
                break;
            case -1:
                delayTime = 4000;
                break;
            case -2:
                delayTime = 8000;
                break;
        }

        clearInterval(timerLoop);
        timerLoop = setInterval(updateTimer, delayTime);
        console.log(speed);
    }
}

function dateFromDay(year, day) {
    if (pause == false) {
        var date = new Date(year, 0); // initialize a date in `year-01-01`
        return new Date(date.setDate(day)); // add the number of days
    }
}
// Timer
function updateTimer() {
    timer += 1;
    // console.log(timer)

    let output = document.getElementById("output");

    if (timer == 31) {
        let description = ("Cela fait déjà 1 mois que " + data.name + " a été infecté");
        output.innerHTML = description;
    }


    // Actualisation des valeurs
    pays.ActualisationGlobale();
    pays.ActualisationArgent();
    pays.ActualisationHumeur();

    // Actualsation de la date
    date = dateFromDay(2022, timer);

    // Actualisation de l'HUD
    afficheHud(pays);

    // Actualisation du mood
    afficheMood();

    // Actualisation du graph
    updateChart();
}

for (let i = 0; i < path.length; i++) {
    path[i].addEventListener("click", () => {
        if (Alert == false) {
            let confirmed = window.confirm("Êtes-vous sûr de vouloir infecter ce pays ?");
            if (confirmed) {
                Play();
                let description = (data.name + " a été infecté");
                output.innerHTML = description;
                for (let j = 0; j < path.length; j++) {
                    for (let k = 0; k < title.length; k++) {
                        if (path[i].classList.contains(title[k].innerHTML)) {
                            path[k].style.fill = 'orange';
                            $.get("../module/gdp.json", function (data) {
                                // Choix du pays
                                window.localStorage.setItem('Pays', JSON.stringify(data[title[k].innerHTML]));
                            });
                            // console.log("pelo");
                        }
                        else if (path[i].id == (title[k].innerHTML)) {
                            path[i].style.fill = 'orange';
                            $.get("../module/gdp.json", function (data) {
                                // Choix du pays
                                window.localStorage.setItem('Pays', JSON.stringify(data[title[k].innerHTML]));
                            });
                            // console.log("lol");
                        }
                    }
                }

                Alert = true;

            }

            else {
                return false;
            }
        }
    })

}



// Reading du fichier JSON
window.onload = function () {
    $.get("../module/gdp.json", function (data) {
        // Choix du pays
        window.localStorage.setItem('Pays', JSON.stringify(data));
    });
}
let data = window.localStorage.getItem('Pays');
data = JSON.parse(data);



// Création de la classe pays
var pays = new Pays(data.nbHabitant,
    data.infecte,
    data.nbInfecte,
    data.bienEtre,
    data.coeffBienEtre,
    data.coeffInfection,
    data.coeffMort,
    data.infrastructure,
    data.fond, data.revenu,
    data.depenses,
    data.coeffRevenu,
    data.coeffDepense);

// Apparition du virus
pays.infecte = true;
pays.nbInfecte = 100;
