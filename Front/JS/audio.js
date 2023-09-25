var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 0,
    height: 0,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create
    }
};


let buttonFrance = document.getElementsByClassName("France");
let buttonAmerica = document.getElementsByClassName("USA");
let buttonRusse = document.getElementsByClassName("Russia");
var game = new Phaser.Game(config);

function preload() {
    //this.load.audio('hit', '../audio/erika.mp3');
    this.load.audio('theme', '../audio/piano.mp3');
    //this.load.audio('PNL', '../audio/Cramés.mp3');
    //this.load.audio('cringe_india', '../audio/o_no_cringe_india.mp3');
    this.load.audio('URSS', '../audio/TriPoloski.mp3');
    this.load.audio('America', '../audio/America.mp3');
    this.load.audio('DZ', '../audio/Wahrane.mp3');
}

function create() {

    //var hit = this.sound.add('hit')
    var music = this.sound.add('theme');
    //var PNL = this.sound.add('PNL');
    //var india = this.sound.add('cringe_india');
    var URSS = this.sound.add('URSS');
    var America = this.sound.add('America');
    var DZ = this.sound.add('DZ')

    this.sound.pauseOnBlur = false;
    // document.getElementById("Germany").addEventListener("click", () => {
    //     let confirmed = window.confirm("Bist du sicher, Bruder?")
    //     if (confirmed) {
    //         //hit.play();
    //         DZ.stop();
    //         America.stop();
    //         URSS.stop();
    //         //india.stop();
    //         //PNL.stop();
    //         music.stop();
    //     }
    // })

    // document.getElementById("Algeria").addEventListener("click", () => {
    //     let confirmed = window.confirm("tfou 3lik");
    //     if (confirmed) {
    //         DZ.play();
    //         //hit.stop();
    //         America.stop();
    //         URSS.stop();
    //         //india.stop();
    //         //PNL.stop();
    //         music.stop();
    //     }
    // })

    for (let i = 0; i < buttonFrance.length; i++) {
        buttonFrance[i].addEventListener("click", () => {
            if (1) {
                for (let j = 0; j < buttonFrance.length; j++) {
                    //PNL.play();
                    DZ.stop();
                    America.stop();
                    URSS.stop();
                    //india.stop();
                    //hit.stop();
                    music.stop();
                }
            }
        })

    }

    for (let i = 0; i < buttonAmerica.length; i++) {
        buttonAmerica[i].addEventListener("click", () => {
            let confirmed = window.confirm("FUCK YEAH !!!")
            if (confirmed) {
                for (let j = 0; j < buttonAmerica.length; j++) {
                    America.play();
                    URSS.stop();
                    DZ.stop();
                    //india.stop();
                    //PNL.stop();
                    //hit.stop();
                    music.stop();
                }
            }
        })

    }

    for (let i = 0; i < buttonRusse.length; i++) {
        buttonRusse[i].addEventListener("click", () => {
            let confirmed = window.confirm("Cyka Blyat")
            if (confirmed) {
                for (let j = 0; j < buttonRusse.length; j++) {
                    URSS.play();
                    DZ.stop();
                    America.stop();
                    //india.stop();
                    //PNL.stop();
                    //hit.stop();
                    music.stop();
                }
            }
        })

    }

    // document.getElementById("India").addEventListener("click", () => {
    //     let confirmed = window.confirm("I WILL TRY TO FIX YOUR COMPUTER")
    //     if (confirmed) {
    //         //india.play();
    //         DZ.stop();
    //         America.stop();
    //         URSS.stop();
    //         //PNL.stop();
    //         //hit.stop();
    //         music.stop();
    //     }
    // }

    music.play();
}
