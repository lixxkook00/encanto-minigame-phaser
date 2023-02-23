import Footer from "../components/Footer.js";
import LoadingBar from "../components/LoadingBar.js";
import SoundControl from "../components/SoundControl.js";
import LoadImage from "../data/loadImage.js";

class StartScene extends Phaser.Scene {
    constructor ()
    {
        super('StartScene');
    }

    preload() {
        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        // Load Background or
        let imageBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundStart')
        let scaleX = this.cameras.main.width / imageBG.width
        let scaleY = this.cameras.main.height / imageBG.height
        let scale = Math.max(scaleX, scaleY)
        imageBG.setScale(scale).setScrollFactor(0)
        
        // LOADING BAR
        LoadingBar(this)
        
        // LOAD
        LoadImage(this);
    }

    create (data){
        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        this.SOUND_STATE = true

        var music = this.sound.add('sound',{ loop: false });

        // Render Logo
        const logoTop = this.add.image(gameWidth/2, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/2, gameHeight/14 + 20);
        logoTop.setScale(0.4)

        // Render Text Intro
        const txtIntro = this.add.image(gameWidth/2, gameHeight/2, 'txtIntro').setInteractive();
        txtIntro.setPosition(gameWidth/2, gameHeight/1.3 + 10);
        gameWidth < 600 ? txtIntro.setScale(0.5) : txtIntro.setScale(1)

        this.tweens.add(
            {
                targets: txtIntro,
                alpha: {
                    from: 0,
                    to: 1
                },
                scale: {
                    from: 1.5,
                    to: gameWidth < 600 ? 0.5 : 1,
                },
                duration: 500,
                ease: 'Linear'
            }
        );

        // Render Button Start (354 × 117)
        const btnStart = this.add.image(gameWidth/2, 100, 'btnStart').setInteractive();
        btnStart.setDisplaySize(gameWidth*(2/5.5), gameWidth*(2/5.5)*(117/354))
        const btnStartY = gameHeight - gameWidth*(2/6)*(117/354)*(1/2) - 25
        btnStart.setPosition(gameWidth/2, btnStartY);

        this.tweens.add(
            {
                targets: btnStart,
                scale: {
                    from: 0.3,
                    to: 0.55,
                },
                duration: 500,
                ease: 'Linear'
            }
        );

        SoundControl(this)

        Footer(this)

        // ------ event
        btnStart.on('pointerdown', function(){
            music.play()
            this.scene.start("FinalScene");
        }, this)
    }
}


export default StartScene;