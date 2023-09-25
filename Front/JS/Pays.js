//const { type } = require("express/lib/response");

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class Pays {
    constructor(nbHabitant, infecte, nbInfecte, bienEtre, coeffBienEtre, coeffInfection, coeffMort, infrastructure,/*capaExport,*/fond, revenu, depenses) {
        // on initialise les diffrts variables :

        // Global
        this.nbHabitant = nbHabitant;              // Nombre d'habitants
        this.infecte = infecte;                    // True si le pays est infecté
        this.nbInfecte = nbInfecte;                // Nombre d'habitant infecté
        this.nbSain;                               // Nombre d'habitant sain
        this.nbMort = 0;                           // Nombre de morts par jour
        this.nbVaccine = 0;                        // Nombre d'habitant vacciné
        this.bienEtre = bienEtre;                  // Humeur de la population en %
        this.nbSain = nbHabitant - nbInfecte;      // Nombre d'habitant non infectés
        this.nbMort_total = 0;                     // Nombre total de mort

        // Argent
        this.fond = fond;                          // Argent disponible
        this.revenu = revenu;                      // Argent gagné par jour
        this.depenses = depenses;                  // Argent dépensé par jour
        this.argentInvesti = 30000;                 ////// Pas encore implémenté
        this.benefice = revenu - depenses;         // Bénéfices

        // Vaccin
        this.infrastructure = infrastructure;      // Niveau des infrastructures en %
        this.vaccin = 0;                           ////// Pas encore implémenté
        this.niveauTest = 0;                       ////// Pas encore implémenté

        // on instancie les coeffs qui varient
        this.coeffBienEtre = coeffBienEtre;
        this.coeffMort = coeffMort;
        this.coeffInfection = coeffInfection;      // à changer en fonction des diffents virus
        this.coeffVaccin = 0;

        // Coeffs globaux
        this.coeffGlobalInfecte;
        this.coeffGlobalMort;
        this.coeffGlobalBienEtre;

        // Décisions
        this.frontieresFerme = false;
        this.portMasque = false;
        this.distanciel = false;
        this.confinnement = false;
        this.indemnites = false;
        this.test = false;
        this.quarantaine = false;
        this.couvreFeu = false;
        this.fermetureDesEcoles = false;
        this.fermetureDesBarsRestos = false;
        this.fermetureDesCommercesNonEssentiels = false;
        this.interdictionDesRassemblements = false;
        //this.vaccination = false;
    }

    // PaysVoisin(numberMin, numberMax) {
    //     let paysVoisin = [];
    //     let random = getRandomArbitrary(numberMin, numberMax);
    //     for (let i = 0; i < random; i++) {
    //         let j = getRandomArbitrary(1, TAB.length);
    //         // console.log("j= " + j);
    //         // console.log("TAB[j] = " + TAB[j].name);
    //         // console.log("TAB.length = " +TAB.length);
    //         paysVoisin.push({
    //             name: TAB[j].name
    //         });
    //     }
    //     // console.log(tab);
    //     // console.log(random);
    //     console.log(paysVoisin)
    //     return paysVoisin;
    // }


    // Getters
    get getNbHabitants() {
        return Math.round(this.nbHabitant);
    }

    get getNbInfectes() {
        return Math.round(this.nbInfecte);
    }

    get getNbMort() {
        return Math.round(this.nbMort);
    }

    get getNbVaccine() {
        return Math.round(this.nbVaccine);
    }

    get getNbSain() {
        return Math.round(this.nbSain);
    }

    get getNbInfecte() {
        return Math.round(this.nbInfecte);
    }

    get getRecherche() {
        return this.infrastructure;
    }

    get getFond() {
        return Math.round(this.fond);
    }

    get getrevenu() {
        return Math.round(this.revenu);
    }

    get getDepense() {
        return Math.round(this.depenses);
    }

    get getBenefices() {
        return Math.round(this.benefice);
    }

    get getBienEtre() {
        return Math.round(this.bienEtre);
    }

    get getinfrastructure() {
        return Math.round(this.infrastructure);
    }

    // Setters
    ChangeFrontieresFerme(bool) {
        this.frontieresFerme = bool;

        if (bool) {
            this.revenu -= 1000;
        } else {
            this.revenu += 1000;
        }
    }

    ChangePortMasque(bool) {
        this.portMasque = bool;

        if (bool) {
            this.depenses += 1000;
        } else {
            this.depenses -= 1000;
        }
    }

    ChangeDistanciel(bool) {
        this.distanciel = bool;

        if (bool) {
            this.revenu -= 500;
        } else {
            this.revenu += 500;
        }
    }

    ChangeConfinement(bool) {
        this.confinnement = bool;

        if (bool) {
            this.revenu -= 2000;
        } else {
            this.revenu += 2000;
        }
    }

    ChangeVaccination(bool) {
        this.vaccination = bool;
    }

    ChangeIndemnites(bool) {
        this.indemnites = bool;

        if (bool) {
            this.depenses += 700;
        } else {
            this.depenses -= 700;
        }
    }

    ChangeTest(bool) {
        this.test = bool;

        if (bool) {
            this.depenses += 1000;
        } else {
            this.depenses -= 1000;
        }
    }

    ChangeQuarantaine(bool) {
        this.quarantaine = bool;

        if (bool) {
            this.revenu -= 500;
        } else {
            this.revenu += 500;
        }
    }

    ChangeCouvreFeu(bool) {
        this.couvreFeu = bool;

        if (bool) {
            this.revenu -= 500;
        } else {
            this.revenu += 500;
        }
    }

    ChangeFermetureDesEcoles(bool) {
        this.fermetureDesEcoles = bool;

        if (bool) {
            this.revenu -= 1000;
        } else {
            this.revenu += 1000;
        }
    }

    ChangeFermetureDesBarsRestos(bool) {
        this.fermetureDesBarsRestos = bool;

        if (bool) {
            this.revenu -= 1000;
        } else {
            this.revenu += 1000;
        }
    }

    ChangeFermetureDesCommercesNonEssentiels(bool) {
        this.fermetureDesCommercesNonEssentiels = bool;

        if (bool) {
            this.revenu -= 1000;
        } else {
            this.revenu += 1000;
        }
    }

    ChangeInterdictionDesRassemblements(bool) {
        this.interdictionDesRassemblements = bool;
    }

    // Décisions
    Frontieres(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.005;
            this.coeffGlobalBienEtre += 0.1;
        }
    }

    Masque(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.02;
            this.coeffGlobalBienEtre += 0.09;
        }
    }

    Distanciel(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.01;
            this.coeffGlobalBienEtre += 0.11;
        }
    }

    Confinnement(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.2;
            this.coeffGlobalBienEtre += 0.35;
        }
    }

    Indemnites(bool) {
        if (bool) {
            this.coeffGlobalBienEtre -= 0.5;
        }
    }

    Test(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.08;
        }
    }

    Quarantaine(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.1;
            this.coeffGlobalBienEtre += 0.3;
        }
    }

    CouvreFeu(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.01;
            this.coeffGlobalBienEtre += 0.14;
        }
    }

    FermetureDesEcoles(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.02;
            this.coeffGlobalBienEtre += 0.2;
        }
    }

    FermetureDesBarsRestos(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.01;
            this.coeffGlobalBienEtre += 0.2;
        }
    }

    FermetureDesCommercesNonEssentiels(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.01;
            this.coeffGlobalBienEtre += 0.2;
        }
    }

    InterdictionDesRassemblements(bool) {
        if (bool) {
            this.coeffGlobalInfecte -= 0.005;
            this.coeffGlobalBienEtre += 0.1;
        }
    }


    // investir dans les structure
    Investir() {
        // la somme a investir augmente a chaque fois que la fonction est lance 

        this.fond -= this.argentInvesti;
        this.argentInvesti = this.argentInvesti + (0.1 * this.argentInvesti);
        this.infrastructure += 8;
        this.niveauTest += 10;
    }

    Vaccination() {

        // different niveau de vaccination
        if (this.infrastructure >= 50 && this.infrastructure < 150) {

            this.coeffInfection -= 0.15;
            this.coeffBienEtre -= 0.2;
            this.coeffVaccin += 0.05;
        }
        else if (this.infrastructure >= 100 && this.infrastructure < 200) {
            this.coeffInfection -= 0.25;
            this.coeffBienEtre -= 0.3;
            this.coeffVaccin += 0.1;
        }
        else if (this.infrastructure >= 200 && this.infrastructure <= 300) {
            this.coeffInfection -= 0.35;
            this.coeffBienEtre -= 0.4;
            this.coeffVaccin += 0.3;
        }
        else {

            // afficher une alerte et rien faire
            alert('Ca sert a Rien , source : WAllah, Dr Raoult');
        }
    }

    // Actualisation de l'argent
    ActualisationArgent() {

        this.fond = this.fond + this.revenu - this.depenses;
        this.benefice = this.revenu - this.depenses;
    }


    Propa(pays) {
        if (Alert == false) {
            let confirmed = window.confirm("Êtes-vous sûr de vouloir infecter ce pays ?");
            if (confirmed) {
                Remplissage(pays);
                Play();
            }
        }
    }

    Remplissage(pays) {
        for (let i = 0; i < svg.length; i++) {
            if (pays == document.getElementsByClassName(pays)) {
                for (let j = 0; j < pays.length; j++) {
                    pays[j].style.fill = 'yellow';

                }
            }

            else if (pays == document.getElementById(pays)) {
                pays.style.fill = 'yellow';
            }
        }
    }

    // Actualisation globale
    ActualisationGlobale() {
        // Coeff global

        this.coeffGlobalInfecte = this.coeffInfection;
        this.coeffGlobalMort = this.coeffMort;
        this.coeffGlobalBienEtre = this.coeffBienEtre;
        // this.coeffVaccin = this.coeffVaccin;

        // Valeur aléatoire


        this.coeffGlobalInfecte += (Math.floor(Math.random() * 3) / 10); // 0 - 0,3
        this.coeffGlobalMort += ((Math.random() * 1.1) / 100);

        if (this.nbInfecte > 1000) {
            if (this.coeffGlobalInfecte < 1) {
                this.coeffGlobalInfecte += 1 / getRandomArbitrary(2, 50);
            }
            else if (this.coeffGlobalInfecte > 1) {
                this.coeffGlobalInfecte += 1 / getRandomArbitrary(2, 50);
            }
            else {
                this.coeffGlobalInfecte += 1 / getRandomArbitrary(2, 50);
            }
        }


        if (this.nbInfecte > 1000) {
            this.coeffGlobalMort += 0.05;
            if (this.nbInfecte > 11000) {
                this.coeffGlobalMort += 0.1;
                if (this.nbInfecte > 90000) {
                    this.coeffGlobalMort += 0.2;
                }
            }
        }



        // Actualisation des coeffs
        this.Frontieres(this.frontieresFerme);
        this.Masque(this.portMasque);
        this.Distanciel(this.distanciel);
        this.Confinnement(this.confinnement);
        this.Indemnites(this.indemnites);
        this.Test(this.test);
        this.Quarantaine(this.quarantaine);
        this.CouvreFeu(this.couvreFeu);
        this.FermetureDesEcoles(this.fermetureDesEcoles);
        this.FermetureDesBarsRestos(this.fermetureDesBarsRestos);
        this.FermetureDesCommercesNonEssentiels(this.fermetureDesCommercesNonEssentiels);
        this.InterdictionDesRassemblements(this.interdictionDesRassemblements);



        console.log(this.coeffGlobalInfecte);
        console.log(this.coeffGlobalMort);
        // Actualiation des infections
        this.nbSain = this.nbHabitant - this.nbInfecte;
        this.nbInfecte = parseFloat((this.nbInfecte * parseFloat(this.coeffGlobalInfecte)).toFixed(2));
        // Actualisation des vaccinnées
        this.nbVaccine = parseFloat((this.nbHabitant * this.coeffVaccin).toFixed(2));
        // Actualisation du nombre d'habitant 
        if (this.nbInfecte >= 150) {
            this.nbMort = this.nbInfecte * this.coeffGlobalMort;
            this.nbMort_total += this.nbMort;
            this.nbHabitant -= this.nbMort;

        }

        //conditions défaite
        if (this.bienEtre <= 0 || this.fond <= 0 || this.nbHabitant < this.nbMort) {

            document.getElementById("FinJeux").style.display = 'flex'
            document.getElementById("FinJeux").style.backgroundImage = "url('../img/loose2.png')"

            Pause();


        }

        // condition défaite
        if (this.getNbInfecte <=2) {
            console.log('fini');

            document.getElementById("FinJeux").style.display = 'flex';
            document.getElementById("FinJeux").style.backgroundImage = " url('../img/Win3.png')"

            Pause()
        }
        // console.log("nbinfecte : " + this.nbInfecte + "  nbMort : " + this.nbMort);

    }

    // Actualisation humeur
    ActualisationHumeur() {
        if (this.bienEtre < 0) {
            this.bienEtre = 0;
        }
        else if (this.bienEtre > 100) {
            this.bienEtre = 100;
        }
        else {
            this.bienEtre -= this.coeffGlobalBienEtre;
        }
    }

    // isFinished() {

    //     if (this.nbHabitant == 0) {
    //         this.winner = false;
    //         return false;
    //         alert("NIQUE TA MERE")
    //     }

    //     return true;
    // }

}


