class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('background_image', './img/illness.jpeg');
        this.load.image('logo', './img/PDD.png');
        this.load.image('play', './img/plague.png');
        this.load.image('option', './img/red-virus.png');
    }

    create() {
        let background = this.add.sprite(0, 0, 'background_image');
        background.setOrigin(0, 0);


        let logo = this.add.image(innerWidth / 2, 150, 'logo');
        let play = this.add.image(innerWidth / 2, 400, 'play');
        let option = this.add.image(innerWidth / 2, 600, 'option');


        play.setInteractive()
        play.alpha = 0.5;
        play.on('pointerover', () => play.alpha = 1);
        play.on('pointerout', () => play.alpha = 0.5);

        option.setInteractive()
        option.alpha = 0.5;
        option.on('pointerover', () => option.alpha = 1);
        option.on('pointerout', () => option.alpha = 0.5);


        play.on('pointerdown', () => window.location.href = "/game");
        option.on('pointerdown', () => window.location.href = "/wiki");
    };
}

export default TitleScene;