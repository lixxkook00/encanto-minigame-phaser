import Footer from "../components/Footer.js";

class GameScene extends Phaser.Scene {

    constructor ()
    {
        super('GameScene');
    }

    create ()
    {
        this.initialTime = 30;

        var tween = null;
        
        const NUMBER_CHARACTER = 9;
        let TARGET_ARRAY = []
        let CHARAC_ARRAY = []
        let TOTAL_SCORE = 0

        var textTimer;
        var timedEvent;

        var spriteTimeBG;

        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        var x = gameWidth/15;

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

        const handleEndGame = (key,currentScene) => {
            // Render background overlay
            const bgTimeOver = this.add.graphics();
            bgTimeOver.setDepth(1)
            bgTimeOver.fillStyle(0x000000, 0.6);
            bgTimeOver.fillRect(0, 0, gameWidth, gameHeight);
            bgTimeOver.setAlpha(0)

            tween = currentScene.tweens.add({
                targets: bgTimeOver,
                alpha: {
                    from: 0,
                    to: 1,
                },
                duration: 500,
                ease: 'Linear'
            });
            
            if(key === 'timeover'){
                // Render text time over (357 × 101)
                const txtTimeOver = this.add.image(gameWidth/2, 100, 'txtTimeOver').setInteractive();
                txtTimeOver.setSize(10*(357/101),10)
                txtTimeOver.setPosition(gameWidth/2, gameHeight/2);
                txtTimeOver.setDepth(2)
                txtTimeOver.setScale(0)

                tween = currentScene.tweens.add({
                    targets: txtTimeOver,
                    scale: {
                        from: 0,
                        to: 1,
                    },
                    duration: 500,
                    ease: 'Linear'
                });
            }else if(key === 'congraz'){
                // Render text time over (357 × 101)
                const txtTimeOver = this.add.image(gameWidth/2, 100, 'txtCongratz').setInteractive();
                txtTimeOver.setSize(10*(357/101),10)
                txtTimeOver.setPosition(gameWidth/2, gameHeight/2);
                txtTimeOver.setDepth(2)

                tween = currentScene.tweens.add({
                    targets: txtTimeOver,
                    scale: {
                        from: 0,
                        to: 1,
                    },
                    duration: 500,
                    ease: 'Linear'
                });
            }

            setTimeout(() => {
                currentScene.scene.start("FinalScene",{ score: TOTAL_SCORE })
            },1000)
        }

        // Render Background
        let imageBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / imageBG.width
        let scaleY = this.cameras.main.height / imageBG.height
        let scale = Math.max(scaleX, scaleY)
        imageBG.setScale(scale).setScrollFactor(0)

        // Render Time BG
        spriteTimeBG = this.add.image(200, 200, 'timeBG');
        spriteTimeBG.setPosition(gameWidth - (spriteTimeBG.width*0.8/2 + gameWidth/20), gameHeight/10);

        if(window.innerWidth < 600){
            spriteTimeBG.setScale(0.8)
        }

        // Render Timecountdown
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        textTimer = this.add.text(gameWidth/2, 32, this.initialTime,style);

        // Each 1000 ms call onEvent
        timedEvent = this.time.addEvent(
            { 
                delay: 1000, 
                // callback: self.onEvent(textTimer,TOTAL_SCORE,this), 
                callback: () => {
                    if(this.initialTime > 0){
                        this.initialTime -= 1; // One second
                        textTimer.setText(this.initialTime);
                    }else{
                        // this.time.paused = true
                        handleEndGame("timeover",this)
                    }
                },
                callbackScope: self, 
                loop: true 
            }
        );

        textTimer.x = Math.floor(spriteTimeBG.x + (spriteTimeBG.width/4)*0.6);
        textTimer.y = Math.floor(spriteTimeBG.y - (spriteTimeBG.height/2)*0.55);

        // Render Background Character (768 × 186)
        const backgroundCharac = this.add.image(0, gameHeight-15, 'backgroundCharac').setInteractive();
        backgroundCharac.setSize(gameWidth + 60,(gameWidth + 60)*(186/768))

        if(window.innerWidth < 600){
            backgroundCharac.setPosition((gameWidth/2), gameHeight - (gameWidth + 60)*(186/768)*(1/4));
        }else{
            backgroundCharac.setPosition((gameWidth/2), gameHeight - (gameWidth - 60)*(186/768)*(1/2));
        }
        
        // Render Logo
        const logoTop = this.add.image(100, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/4, gameHeight/14);
        logoTop.setScale(0.3)

        // Render character
        for (var i = 1; i <= NUMBER_CHARACTER; i++)
        {   
            // CREATE CHARACTER
            const characImageName = `character${i}`
            let characImageScaleUp = 1
            
            const image = this.add.image(x, 100 , characImageName).setInteractive();
            this.input.setDraggable(image);

            CHARAC_ARRAY.push(image)

            image.setSize(gameWidth/25, gameHeight/25);
            window.innerWidth < 600 ? characImageScaleUp = 0.5 : characImageScaleUp = 1

            image.setScale(characImageScaleUp)
            const characterY = window.innerWidth < 600 ? backgroundCharac.y - 10 - ((image.height/2)*characImageScaleUp) - 20 : backgroundCharac.y - 10
            image.setPosition(x,characterY)

            x += this.game.config.width/9.5;

            // CREATE TARGET
            const characImageNameTarget = `character${i}New`

            // console.log(TARGET_ARRAY_INFOR[i-1].x,TARGET_ARRAY_INFOR[i-1].y)

            var imageTarget = this.add.image(TARGET_ARRAY_INFOR[i-1].x, TARGET_ARRAY_INFOR[i-1].y, characImageNameTarget).setInteractive();
            imageTarget.tint = 0x000000;
            imageTarget.input.dropZone = true;
            imageTarget.setSize(gameWidth/25, gameHeight/25);
            if(window.innerWidth < 600){
                imageTarget.setScale(0.55);
            }else{
                imageTarget.setScale(1.05)
            }

            TARGET_ARRAY.push(imageTarget)
        }

        // // Render Popup
        const showPopUp = (i,currentScene,dropZone) => {
            const popUp = this.add.image(gameWidth/2, gameHeight/2, `popup${i}`);
            popUp.setScale(0);
            popUp.setPosition(dropZone.x,dropZone.y)
            let scaleUp = 0;
            window.innerWidth < 600 ? scaleUp = 0.5 : scaleUp = 1 
            tween = currentScene.tweens.add({
                targets: popUp,
                scale: {
                    from: 0,
                    to: scaleUp,
                },
                x: gameWidth/2,
                y: gameHeight/2,
                duration: 500,
                ease: 'Linear'
            });

            const closeButton = this.add.image(100, 100, 'closePopup').setInteractive();
            let scaleCloseBtnUp = 0;
            window.innerWidth < 600 ? scaleCloseBtnUp = 0.5 : scaleCloseBtnUp = 1 
            closeButton.setScale(scaleCloseBtnUp)

            var pw = gameWidth/2 + (popUp.width/2)*scaleUp - (closeButton.width/2)*scaleCloseBtnUp - (popUp.width/10)*scaleUp;
            var ph = gameHeight/2 - (popUp.height/3)*scaleUp;

            closeButton.setScale(0)
            tween = currentScene.tweens.add({
                targets: closeButton,
                delay: 500,
                scale: {
                    from: 0,
                    to: scaleCloseBtnUp+0.1,
                },
                duration: 1,
                ease: 'Linear'
            });

            closeButton.setPosition(pw,ph)
            closeButton.on('pointerdown', function(){
                tween = currentScene.tweens.add({
                    targets: popUp,
                    scale: {
                        from: scaleUp,
                        to: 0,
                    },
                    duration: 500,
                    ease: 'Linear'
                });

                if(TOTAL_SCORE===9){
                    handleEndGame("congraz",this)
                }

                closeButton.destroy()
            }, this)
        }
        
        Footer(this)

        // events drag and drop
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);

            gameObject.setTexture(gameObject.texture.key+"New")
            if(window.innerWidth < 600){
                gameObject.setScale(0.6)
            }
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            if(dropZone.texture.key == (gameObject.texture.key)){
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;

                // clear
                dropZone.setScale(0)
                gameObject.disableInteractive()
                gameObject.setScale(0)

                // add total score
                TOTAL_SCORE++;

                // show popup infor
                showPopUp(parseInt((gameObject.texture.key).slice(9,-3)),this.scene,dropZone)
                
                console.log(Phaser.Easing);
                return 0
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                
            }else{

            }

            const currentName = gameObject.texture.key;
            gameObject.setTexture(currentName.slice(0,-3))

            // console.log("TOTAL_SCORE",TOTAL_SCORE,"/ 9")
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {

        });
    }

    update() {

    }
}

export default GameScene;