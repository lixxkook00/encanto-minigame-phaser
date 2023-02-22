import Footer from "../components/Footer.js";
import SoundControl from "../components/SoundControl.js";
import handleDragDrop from "../utils/handleDragDrop.js";
import handleEndGame from "../utils/handleEndGame.js";

class GameScene extends Phaser.Scene {

    constructor ()
    {
        super('GameScene');
    }

    create ()
    {   
        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        this.GAME_TIME_DURATION = 30;
        
        const NUMBER_CHARACTER = 9;
        this.TOTAL_SCORE = 0
        
        var tween;
        
        let TARGET_ARRAY = []
        let CHARAC_ARRAY = []

        const TARGET_ARRAY_INFOR = [
            {
                x: gameWidth/1.963, 
                y: gameHeight-gameHeight/3.45,
            },
            {
                x: gameWidth/1.77, 
                y: gameHeight/5.5,
            },
            {
                x: gameWidth/1.291,  
                y: gameHeight-gameHeight/2.615,
            },
            {
                x: gameWidth/1.3,  
                y: gameHeight-gameHeight/1.64,
            },
            {
                x: gameWidth/5.4,  
                y: gameHeight/3.7,
            },
            {
                x: gameWidth/2.59, 
                y: gameHeight/5.3,
            },
            {
                x: gameWidth/2.625, 
                y: gameHeight/3.2,
            },
            {
                x: gameWidth/1.69,  
                y: gameHeight-gameHeight/1.749,
            },
            {
                x: gameWidth/4.15,  
                y: gameHeight/1.91,
            },
        ]

        // Render Background
        let imageBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / imageBG.width
        let scaleY = this.cameras.main.height / imageBG.height
        let scale = Math.max(scaleX, scaleY)
        imageBG.setScale(scale).setScrollFactor(0)

        // Render Time BG (244 × 84)
        const spriteTimeBG = this.add.image(160, 160, 'timeBG');
        spriteTimeBG.setPosition(gameWidth - (spriteTimeBG.width*0.8/2 + gameWidth/20) - gameWidth/16, gameHeight/10);

        // Render Timecountdown
        var style = { font: "bold 18px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        const textTimer = this.add.text(gameWidth/2, 32, this.GAME_TIME_DURATION,style);

        // Each 1000 ms call onEvent
        const timedEvent = this.time.addEvent(
            { 
                delay: 1000, 
                // callback: self.onEvent(textTimer,TOTAL_SCORE,this), 
                callback: () => {
                    if(this.GAME_TIME_DURATION > 0){
                        this.GAME_TIME_DURATION -= 1; // One second
                        textTimer.setText(this.GAME_TIME_DURATION);
                    }else{
                        // this.time.paused = true
                        handleEndGame(this,"timeover",this)
                    }
                },
                callbackScope: self, 
                loop: true 
            }
        );

        textTimer.x = Math.floor(spriteTimeBG.x + (spriteTimeBG.width/4)*0.6 - 20);
        textTimer.y = Math.floor(spriteTimeBG.y - (spriteTimeBG.height/2)*0.5) + textTimer.height/4;

        if(gameWidth < 600){
            spriteTimeBG.setScale(0.6)
        }else{
            textTimer.setScale(2)
            textTimer.y = Math.floor(spriteTimeBG.y - (spriteTimeBG.height/2)*0.5) - textTimer.height/3;
        }

        // Render Background Character (768 × 186)
        const backgroundCharac = this.add.image(0, gameHeight-15, 'backgroundCharac').setInteractive();
        backgroundCharac.setSize(gameWidth + 60,(gameWidth + 60)*(186/768))

        if(gameWidth < 600){
            backgroundCharac.setPosition((gameWidth/2), gameHeight + 10 - (gameWidth + 60)*(186/768)*(1/4));
        }else{
            backgroundCharac.setPosition((gameWidth/2), gameHeight - (gameWidth - 60)*(186/768)*(1/2));
        }

        // Render Text Turtorial (621 × 33)
        const txtTurtorial = this.add.image(gameWidth/2, 100, 'txtTurtorial').setInteractive();
        txtTurtorial.setDisplaySize(gameWidth*0.9,gameWidth*0.9*(33/621))
        let txtTurtorialY;
        if(gameWidth < 600){
            txtTurtorialY = backgroundCharac.y - backgroundCharac.height/1.5 - 8
        }else{
            txtTurtorialY = backgroundCharac.y - backgroundCharac.height/2
        }
        txtTurtorial.setPosition(gameWidth/2, txtTurtorialY+10);
        txtTurtorial.setAlpha(0)
        this.tweens.add({
            targets: txtTurtorial,
            delay: parseInt(`${i}00`),
            alpha: {
                from: 0,
                to: 1
            },
            y: txtTurtorialY,
            duration: 300,
            ease: 'Linear'
        });
        
        // Render Logo
        const logoTop = this.add.image(100, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/4, gameHeight/14);
        logoTop.setScale(0.3)

        // Render character
        let x = gameWidth/15;

        for (var i = 1; i <= NUMBER_CHARACTER; i++)
        {   
            // CREATE CHARACTER
            const characImageName = `character${i}`
            let characImageScaleUp = 1

            const image = this.add.image(x, 100 , characImageName).setInteractive();
            this.input.setDraggable(image);

            CHARAC_ARRAY.push(image)

            image.setSize(gameWidth/25, gameHeight/25);
            gameWidth < 600 ? characImageScaleUp = 0.5 : characImageScaleUp = 1

            image.setScale(characImageScaleUp)
            const characterY = gameWidth < 600 ? backgroundCharac.y - 10 - ((image.height/2)*characImageScaleUp) - 20 : backgroundCharac.y - 10
            image.setPosition(x,characterY - 30)
            image.setAlpha(0)

            this.tweens.add(
                {
                    targets: image,
                    delay: parseInt(`${i}00`),
                    alpha: {
                        from: 0,
                        to: 1
                    },
                    // scale: {
                    //     from: 1.5,
                    //     to: gameWidth < 600 ? 0.5 : 1,
                    // },
                    y: characterY,
                    duration: 300,
                    ease: 'Linear'
                }
            );

            x += this.game.config.width/9.5;

            // CREATE TARGET
            const characImageNameTarget = `character${i}New`

            // console.log(TARGET_ARRAY_INFOR[i-1].x,TARGET_ARRAY_INFOR[i-1].y)

            var imageTarget = this.add.image(TARGET_ARRAY_INFOR[i-1].x, TARGET_ARRAY_INFOR[i-1].y, characImageNameTarget).setInteractive();
            imageTarget.tint = 0x000000;
            imageTarget.input.dropZone = true;
            imageTarget.setSize(gameWidth/25, gameHeight/25);
            if(gameWidth < 600){
                imageTarget.setScale(0.55);
            }else{
                imageTarget.setScale(1.05)
            }

            TARGET_ARRAY.push(imageTarget)
        }

        
        SoundControl(this)
        
        Footer(this)

        handleDragDrop(this)
    }

    update() {

    }
}

export default GameScene;