/* bouton dépliant: déclaration des variables */
let m_time = document.getElementById('time');
let flyerButton = document.getElementById('button_depliant');
let flyerButtonContaint = document.getElementById('fenetre');

// affichage des humeurs
document.getElementById('triste').style.display = 'none';
function afficheMood() {
    if (pays.getBienEtre < 50) {
        document.getElementById('joyeux').style.display = 'none';
        document.getElementById('triste').style.display = 'block';
    } else if (pays.getBienEtre > 50) {
        document.getElementById('joyeux').style.display = 'block';
        document.getElementById('triste').style.display = 'none';
    }
}
//console.log(flyerButtonContaint);

flyerButton.addEventListener('click', function () {
    if (flyerButtonContaint.style.visibility == 'hidden') {
        flyerButtonContaint.style.visibility = 'visible';
    }
    else {
        flyerButtonContaint.style.visibility = 'hidden';
    }
});
/* panneau du timer:declaration des variables */
let m_button_play = document.getElementById('play');
let m_button_pause = document.getElementById('pause');
m_button_play.style.display = 'none';
m_time.addEventListener('mouseleave', function () {
    flyerButtonContaint.style.visibility = 'hidden';
});
/*bouton play */
m_button_play.addEventListener('click', function () {
    if (m_button_pause.style.display == 'none') {
        m_button_play.style.display = 'none';
        m_button_pause.style.display = 'block';
        flyerButtonContaint.style.display = 'flex';
    }
});
/*bouton pause*/
m_button_pause.addEventListener('click', function () {
    if (m_button_play.style.display == 'none') {
        m_button_pause.style.display = 'none';
        m_button_play.style.display = 'block';
        flyerButtonContaint.style.display = 'flex';
    }
})


/*fonction d'affichage des valeurs des ressources */
let afficheHud = function (pays) {
    document.getElementById('Habitants').innerHTML = "<p>" + pays.getNbHabitants + "</p>";
    document.getElementById('Argent').innerHTML = "<p>" + pays.getFond + "</p>";
    document.getElementById('Humeur').innerHTML = "<p>" + pays.bienEtre.toFixed(2) + "%</p>";

    var m_day = date.getDate();
    var m_month = date.getMonth() + 1;
    var m_year = date.getFullYear();
    document.getElementById('date').innerHTML = `<p> ${m_day}/${m_month}/${m_year} </p>`;

    // affiche les morts
    p_valeur_mort.textContent = pays.getNbMort;
    // affiche les infectés
    p_valeur_infecte.textContent = pays.getNbInfectes;

    // accessibilité des décisions
    if (pays.getNbInfectes > 10000) {
        Frontieres.disabled = false;
        decisionMasques.disabled = false;
        decisionDistanciel.disabled = false;
        decisionCouvreFeu.disabled = false;
        decisionRassemblement.disabled = false;
        decisionTest.disabled = false;

        if (pays.getNbInfectes > 50000) {
            decisionQuarantaine.disabled = false;
            decisionConfinnement.disabled = false;
        }

    } else {
        Frontieres.disabled = true;
        decisionMasques.disabled = true;
        decisionDistanciel.disabled = true;
        decisionCouvreFeu.disabled = true;
        decisionQuarantaine.disabled = true;
        decisionConfinnement.disabled = true;
        decisionRassemblement.disabled = true;
        decisionTest.disabled = true;
    }

    // affiche les vaccinées
    p_valeur_vaccine.textContent = pays.getNbVaccine;

    // accessibilité à la décision vaccination
    if (pays.getinfrastructure <= 50) {
        decisionVaccination.disabled = true;
    } else {
        decisionVaccination.disabled = false;
    }
    // affiche les personnes saines
    p_valeur_Sain.textContent = pays.getNbSain;

    p_valeur_benefices.textContent = pays.getBenefices;
    // affiche les dépenses
    p_valeur_depenses.textContent = pays.getDepense;
    // affiche les revenues
    p_valeur_revenus.textContent = pays.getrevenu;
    // affiche les investissements vaccin
    p_valeur_investissement_vaccin.textContent = pays.getinfrastructure;
}

function afficheMood() {
    if (pays.getBienEtre < 50) {
        document.getElementById('joyeux').style.display = 'none';
        document.getElementById('triste').style.display = 'block';
    } else if (pays.getBienEtre > 50) {
        document.getElementById('joyeux').style.display = 'block';
        document.getElementById('triste').style.display = 'none';
    }
};

/* fenetres explicatives */
let pop = document.getElementById('inhabitants');
pop.addEventListener('click', function () {
    let onglet_inhabitants = document.getElementById('onglet_inhabitants');
    let autres_onglets = document.getElementsByClassName('onglet');
    if (onglet_inhabitants.style.transform == 'scaleX(1)') {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        //onglet_inhabitants.style.transform = 'scaleX(0)'
    }
    else {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        onglet_inhabitants.style.transform = 'scaleX(1)';
    }

});

let argent = document.getElementById('monetaryIncome');
argent.addEventListener('click', function () {
    let onglet_monetaryIncome = document.getElementById('onglet_monetaryIncome');
    let autres_onglets = document.getElementsByClassName('onglet');
    if (onglet_monetaryIncome.style.transform == 'scaleX(1)') {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        //onglet_monetaryIncome.style.transform = 'scaleX(0)';
    }
    else {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        onglet_monetaryIncome.style.transform = 'scaleX(1)';
    }

});

let decision = document.getElementById('decision');
decision.addEventListener('click', function () {
    let onglet_decision = document.getElementById('onglet_decision');
    let autres_onglets = document.getElementsByClassName('onglet');
    if (onglet_decision.style.transform == 'scaleX(1)') {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        onglet_decision.style.transform = 'scaleX(0)';
        // console.log(autres_onglets);
    }
    else {
        for (let i = 0; i < 3; i++) {
            autres_onglets[i].style.transform = 'scaleX(0)';
        }
        onglet_decision.style.transform = 'scaleX(1)';
    }

});

//remplissage des onglets
//onglet population
let nb_infecte = document.getElementById('nb_infecte');
let p_nb_infecte = document.createElement('p');
let p_valeur_infecte = document.createElement('div');
p_valeur_infecte.id = 'valeur';
p_nb_infecte.append(p_valeur_infecte);
nb_infecte.append(p_nb_infecte);


let nb_mort = document.getElementById('nb_mort');
let p_nb_mort = document.createElement('p');
let p_valeur_mort = document.createElement('div');
p_valeur_mort.id = 'valeur';
p_nb_mort.append(p_valeur_mort);
nb_mort.append(p_nb_mort);

let nb_vaccine = document.getElementById('nb_vaccine');
let p_nb_vaccine = document.createElement('p');
let p_valeur_vaccine = document.createElement('div');
// p_nb_vaccine.textContent = "nb vaccine ";
p_valeur_vaccine.id = 'valeur';
p_nb_vaccine.append(p_valeur_vaccine);
nb_vaccine.append(p_nb_vaccine);

let nb_Sain = document.getElementById('nb_sain');
let p_nb_Sain = document.createElement('p');
let p_valeur_Sain = document.createElement('div');
//p_nb_Sain.textContent = "nb Sain ";
p_valeur_Sain.id = 'valeur';
p_nb_Sain.append(p_valeur_Sain);
nb_Sain.append(p_nb_Sain);

let barre_info = document.getElementById('barre_info');
// let p_barre_info = document.createElement('p');
// p_barre_info.textContent = "barre info";
// barre_info.append(p_barre_info);
let taille_totale = pays.getNbHabitants;
let taille_mort;
let taille_sain;
let taille_infecte;
let taille_vaccine;

//onglet argent
let benefices = document.getElementById('benefices');
let p_benefices = document.createElement('p');
let p_valeur_benefices = document.createElement('div');
// p_benefices.textContent = "benefices ";
p_valeur_benefices.id = 'valeur';
p_valeur_benefices.textContent = (pays.getrevenu - pays.getDepense);
p_benefices.append(p_valeur_benefices);
benefices.append(p_benefices);

let depenses = document.getElementById('depenses');
let p_depenses = document.createElement('p');
let p_valeur_depenses = document.createElement('div');
// p_depenses.textContent = "depenses ";
p_valeur_depenses.id = 'valeur';
p_valeur_depenses.textContent = pays.getDepense;
p_depenses.append(p_valeur_depenses);
depenses.append(p_depenses);

let revenus = document.getElementById('revenus');
let p_revenus = document.createElement('p');
let p_valeur_revenus = document.createElement('div');
//p_revenus.textContent = "revenus ";
p_valeur_revenus.id = 'valeur';
p_valeur_revenus.textContent = pays.getrevenu;
p_revenus.append(p_valeur_revenus);
revenus.append(p_revenus);

let investissement_vaccin = document.getElementById('investissement_vaccin');
let p_investissement_vaccin = document.createElement('p');
let p_valeur_investissement_vaccin = document.createElement('div');
//p_investissement_vaccin.textContent = "invest vaccin";
p_valeur_investissement_vaccin.id = 'valeur';
p_valeur_investissement_vaccin.textContent = pays.getRecherche;
p_investissement_vaccin.append(p_valeur_investissement_vaccin);
investissement_vaccin.append(p_investissement_vaccin);

//onglet décision
let Frontieres = document.getElementById('Frontieres');

Frontieres.addEventListener("click", () => {
    if (Frontieres.style.backgroundColor == 'green') {
        Frontieres.style.backgroundColor = '#853333'
        pays.ChangeFrontieresFerme(false);
        let description = (data.name + " ouvre ses frontières");
        output.innerHTML = description;
    }
    else {
        Frontieres.style.backgroundColor = 'green'
        pays.ChangeFrontieresFerme(true);
        let description = (data.name + " ferme ses frontières");
        output.innerHTML = description;
    }
})

//p_decision.textContent = "CHOIX";
// Frontieres.append(p_decision);

// pour les masques

let decisionMasques = document.getElementById('Masques');

decisionMasques.addEventListener("click", () => {
    if (decisionMasques.style.backgroundColor == 'green') {
        decisionMasques.style.backgroundColor = '#853333';
        pays.ChangePortMasque(false);
        let description = (data.name + " enlève le port du masque obligatoire");
        output.innerHTML = description;
    }
    else {
        decisionMasques.style.backgroundColor = 'green';
        pays.ChangePortMasque(true);
        let description = (data.name + " instaure le port du masque obligatoire");
        output.innerHTML = description;
    }
})


// pour le confinement :

let decisionConfinnement = document.getElementById('Confinnement');

decisionConfinnement.addEventListener("click", () => {
    if (decisionConfinnement.style.backgroundColor == 'green') {
        decisionConfinnement.style.backgroundColor = '#853333';
        pays.ChangeConfinement(false);
        let description = (data.name + " enlève le confinnement");
        output.innerHTML = description;
    }
    else {
        decisionConfinnement.style.backgroundColor = 'green';
        pays.ChangeConfinement(true);
        let description = (data.name + " oblige ses citoyens à se confinner");
        output.innerHTML = description;
    }
})

// distanciel :

let decisionDistanciel = document.getElementById('Distanciel');

decisionDistanciel.addEventListener("click", () => {
    if (decisionDistanciel.style.backgroundColor == 'green') {
        decisionDistanciel.style.backgroundColor = '#853333';
        pays.ChangeDistanciel(false);
        let description = (data.name + " enlève le travail en distanciel");
        output.innerHTML = description;
    }
    else {
        decisionDistanciel.style.backgroundColor = 'green';
        pays.ChangeDistanciel(true);
        let description = (data.name + " oblige ses citoyens à travailler en distanciel");
        output.innerHTML = description;
    }
})

// Vaccination

let decisionVaccination = document.getElementById('Vaccination');

decisionVaccination.addEventListener("click", () => {
    if (decisionVaccination.style.backgroundColor == 'green') {
        decisionVaccination.style.backgroundColor = '#853333';
        pays.ChangeVaccination(false);
        let description = (data.name + " enlève l'obligation de se vacciner");
        output.innerHTML = description;
    }
    else {
        decisionVaccination.style.backgroundColor = 'green';
        pays.ChangeVaccination(true);
        let description = (data.name + " oblige ses citoyens à se vacciner");
        output.innerHTML = description;
    }
})

//Couvre Feu 
let decisionCouvreFeu = document.getElementById('CouvreFeu');

decisionCouvreFeu.addEventListener("click", () => {
    if (decisionCouvreFeu.style.backgroundColor == 'green') {
        decisionCouvreFeu.style.backgroundColor = '#853333';
        pays.ChangeCouvreFeu(false);
        let description = (data.name + " enlève l'obligation à respecter un couvre-feu");
        output.innerHTML = description;
    }
    else {
        decisionCouvreFeu.style.backgroundColor = 'green';
        pays.ChangeCouvreFeu(true);
        let description = (data.name + " oblige ses citoyens à respecter un couvre-feu");
        output.innerHTML = description;
    }
})


// indemnites 

let decisionIndemnites = document.getElementById('Indemnites');

decisionIndemnites.addEventListener("click", () => {
    if (decisionIndemnites.style.backgroundColor == 'green') {
        decisionIndemnites.style.backgroundColor = '#853333';
        pays.ChangeIndemnites(false); let description = (data.name + " décide de ne plus indemniser ces travailleurs");
        output.innerHTML = description;
    }
    else {
        decisionIndemnites.style.backgroundColor = 'green';
        pays.ChangeIndemnites(true);
        let description = (data.name + " décide d'indemniser ses travailleurs");
        output.innerHTML = description;
    }
})

//40aine

let decisionQuarantaine = document.getElementById('Quarantaine');

decisionQuarantaine.addEventListener("click", () => {
    if (decisionQuarantaine.style.backgroundColor == 'green') {
        decisionQuarantaine.style.backgroundColor = '#853333';
        pays.ChangeQuarantaine(false);
        let description = (data.name + " enlève l'obligation à respecter une quarantaine");
        output.innerHTML = description;
    }
    else {
        decisionQuarantaine.style.backgroundColor = 'green';
        pays.ChangeQuarantaine(true);
        let description = (data.name + " oblige ses citoyens à respecter une quarantaine");
        output.innerHTML = description;
    }
})

// Investir

let decisionInvestir = document.getElementById('Investir');

decisionInvestir.addEventListener("click", () => {
    if (decisionInvestir.style.backgroundColor == 'green') {
        decisionInvestir.style.backgroundColor = '#853333'
        pays.Investir(); 
        let description = (data.name + " décide de ne plus investir");
        output.innerHTML = description;
    }
    else {
        decisionInvestir.style.backgroundColor = 'green'
        pays.Investir(); 
        let description = (data.name + " décide d'investir");
        output.innerHTML = description;
    }
})




// Test

let decisionTest = document.getElementById('Test');

decisionTest.addEventListener("click", () => {
    if (decisionTest.style.backgroundColor == 'green') {
        decisionTest.style.backgroundColor = '#853333';
        pays.ChangeTests(false);
    }
    else {
        decisionTest.style.backgroundColor = 'green';
        pays.ChangeTests(true);
    }
})

// VACCINATION
decisionVaccination.addEventListener('click', () => {
    pays.Vaccination();
})

//rassemblements
let decisionRassemblement = document.getElementById('Rassemblements');

decisionRassemblement.addEventListener("click", () => {
    if (decisionRassemblement.style.backgroundColor == 'green'){
        decisionRassemblement.style.backgroundColor = '#853333';
        pays.ChangeInterdictionDesRassemblements(false);
    }
    else {
        decisionRassemblement.style.backgroundColor = 'green';
        pays.ChangeInterdictionDesRassemblements(true);
    }
})


let boutonFin = document.getElementById("BoutonFin");
boutonFin.addEventListener("click", () => {
    window.localStorage.removeItem("Pays");
    window.location.href = "/";
});

// pour gerer les niveaux
/*
let ChoixNiveau = document.getElementById("choixNiveau");
ChoixNiveau.addEventListener("click",()=> {
         
    document.getElementById("choixNiveau").style.display ='none'

});
*/

let BoutonFacile =document.getElementById("BoutonFacile");
BoutonFacile.addEventListener("click",()=>{

    document.getElementById("choixNiveau").style.display ='none'
       
});

let BoutonNormale = document.getElementById("BoutonNormale");
BoutonNormale.disabled = true;
let BoutonDifficile = document.getElementById("BoutonDifficile");
BoutonDifficile.disabled = true;
