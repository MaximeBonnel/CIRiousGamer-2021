class Loading extends Phaser.Scene {
    constructor() {
        super({ key: 'Loading' });
    }
    preload() {
        var progressBox = this.add.graphics();
        var progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 200, 460, 320, 50);

        var height = this.cameras.main.height;
        var width = this.cameras.main.width;
        var loadingText = this.make.text({
            y: height / 2 - 50,
            x: width / 2,
            style: {
                text: 'Loading...',
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            y: height / 2 + 50,
            x: width / 2,
            style: {
                text: '0%',
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 80,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 200, 460, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image('logo', '../img/logo.jpeg');
        for (var i = 0; i < 5000; i++) {
            this.load.image('logo' + i, 'zenvalogo.png');
        }
    };
    create() {
        var logo = this.add.image(400, 300, 'logo');
        this.scene.start('TitleScene');
    }
}

export default Loading;