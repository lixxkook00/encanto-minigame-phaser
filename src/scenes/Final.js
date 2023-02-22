import Footer from "../components/Footer.js";
import SoundControl from "../components/SoundControl.js";

class FinalScene extends Phaser.Scene {

    constructor ()
    {
        super('FinalScene');
    }

    init(data)
    {
        // console.log('init', data);
    }

    preload() {

    }

    create (data){
        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        // Render Background
        let imageBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundFinal')
        let scaleX = this.cameras.main.width / imageBG.width
        let scaleY = this.cameras.main.height / imageBG.height
        let scale = Math.max(scaleX, scaleY)
        imageBG.setScale(scale).setScrollFactor(0)

        // Render Logo
        const logoTop = this.add.image(gameWidth/2, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/2, gameHeight/14 + 20);
        logoTop.setScale(0.4)

        if(data.score < 9){
            // Render Text End
            const txtEnd = this.add.image(gameWidth/2, gameHeight/2, 'txtEnd').setInteractive();
            txtEnd.setPosition(gameWidth/2, gameHeight/2.7);

            gameWidth < 600 ? txtEnd.setScale(0.5) : txtEnd.setScale(1)

            this.tweens.add({
                targets: txtEnd,
                alpha: {
                    from: 0.5,
                    to: 1
                },
                y: gameHeight/2.7 + 10,
                duration: 300,
                ease: 'Linear'
            })

            // Render Game Result
            var style = { font: "bold 50px Arial", fill: "#6FFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
            const textTimer = this.add.text(gameWidth/2, 32, this.initialTime,style).setOrigin(0.5, 1);
            textTimer.setText(`${data.score}/9`)
            const textTimerY = gameHeight/2.7 + (gameWidth < 600 ? (txtEnd.height/2)*0.5 : (txtEnd.height/2)*1) + textTimer.height + 15
            textTimer.setPosition(gameWidth/2 , textTimerY - 10)

            // Render Video Frame
            const videoFrame = this.add.image(gameWidth/2, 100, 'videoFrame').setInteractive();
            videoFrame.setDisplaySize(gameWidth*(2/3),gameWidth*(2/3)*(311/540))
            const videoFrameY = textTimerY + (gameWidth < 600 ? videoFrame.height/4 : videoFrame.height/2)
            videoFrame.setPosition(gameWidth/2, videoFrameY -10);

            // Render Text Only (364 × 40)
            const txtOnly = this.add.image(gameWidth/2, 100, 'txtOnly').setInteractive();
            txtOnly.setDisplaySize(30*(364/40),30)
            const txtOnlyY = textTimerY + (gameWidth < 600 ? txtOnly.height/4 : txtOnly.height/2)
            txtOnly.setPosition(gameWidth/2, videoFrameY + 8 + gameWidth*(2/3)*(311/540)*(1/2));

            // Render Button Replay (296 × 96)
            const btnRePlay = this.add.image(gameWidth/2, 100, 'btnRePlay').setInteractive();
            btnRePlay.setDisplaySize(gameWidth*(2/6), gameWidth*(2/6)*(96/296))
            const btnRePlayY = gameHeight - gameWidth*(2/6)*(96/296)*(1/2) - 10
            btnRePlay.setPosition((gameWidth/2) - 5 - gameWidth*(2/12), btnRePlayY);

            // ------ event
            btnRePlay.on('pointerdown', function(){
                // this.time.paused = false
                this.scene.start("GameScene");
            }, this)

            // Render Button Replay (296 × 96)
            const btnLearnMore = this.add.image(gameWidth/2, 100, 'btnLearnMore').setInteractive();
            btnLearnMore.setDisplaySize(gameWidth*(2/6), gameWidth*(2/6)*(96/296))
            const btnLearnMoreY = gameHeight - gameWidth*(2/6)*(96/296)*(1/2) - 10
            btnLearnMore.setPosition((gameWidth/2) + 5 + gameWidth*(2/12), btnLearnMoreY);
        }
        else if(data.score === 9){
            // Render Text End
            const txtEnd = this.add.image(gameWidth/2, gameHeight/2, 'txtCongratz').setInteractive();
            txtEnd.setPosition(gameWidth/2, gameHeight/2.7 + 20);

            gameWidth < 600 ? txtEnd.setScale(0.5) : txtEnd.setScale(1)
            const textTimerY = gameHeight/2.7 + (gameWidth < 600 ? (txtEnd.height/2)*0.5 : (txtEnd.height/2)*1) + 15

            // Render Video Frame
            const videoFrame = this.add.image(gameWidth/2, 100, 'videoFrame').setInteractive();
            videoFrame.setDisplaySize(gameWidth*(2/3),gameWidth*(2/3)*(311/540))
            const videoFrameY = textTimerY + (gameWidth < 600 ? videoFrame.height/4 : videoFrame.height/2)
            videoFrame.setPosition(gameWidth/2, videoFrameY);

            // Render Text Only (364 × 40)
            const txtOnly = this.add.image(gameWidth/2, 100, 'txtOnly').setInteractive();
            txtOnly.setDisplaySize(30*(364/40),30)
            const txtOnlyY = textTimerY + (gameWidth < 600 ? txtOnly.height/4 : txtOnly.height/2)
            txtOnly.setPosition(gameWidth/2, videoFrameY + 20 + gameWidth*(2/3)*(311/540)*(1/2));

            // Render Button Replay (296 × 96)
            const btnRePlay = this.add.image(gameWidth/2, 100, 'btnRePlay').setInteractive();
            btnRePlay.setDisplaySize(gameWidth*(2/6), gameWidth*(2/6)*(96/296))
            const btnRePlayY = gameHeight - gameWidth*(2/6)*(96/296)*(1/2) - 10
            btnRePlay.setPosition((gameWidth/2) - 5 - gameWidth*(2/12), btnRePlayY);

            // ------ event
            btnRePlay.on('pointerdown', function(){
                this.scene.start("GameScene");
            }, this)

            // Render Button Replay (296 × 96)
            const btnLearnMore = this.add.image(gameWidth/2, 100, 'btnLearnMore').setInteractive();
            btnLearnMore.setDisplaySize(gameWidth*(2/6), gameWidth*(2/6)*(96/296))
            const btnLearnMoreY = gameHeight - gameWidth*(2/6)*(96/296)*(1/2) - 10
            btnLearnMore.setPosition((gameWidth/2) + 5 + gameWidth*(2/12), btnLearnMoreY);
        }

        SoundControl(this)

        Footer(this)
    }
}


export default FinalScene;