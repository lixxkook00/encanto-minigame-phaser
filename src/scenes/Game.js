class GameScene extends Phaser.Scene {

    constructor ()
    {
        super('GameScene');
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    preload ()
    {

    }

    create ()
    {
        var frames = this.textures.get('character').getFrameNames();

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


        var x = gameWidth/14;
        var y = gameHeight-50;

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

        // Render Time BG
        spriteTimeBG = this.add.image(200, 200, 'timeBG');
        spriteTimeBG.setPosition(gameWidth - (spriteTimeBG.width*0.8/2 + gameWidth/20), gameHeight/10);

        if(window.innerWidth < 600){
            spriteTimeBG.setScale(0.8)
        }

        // Render Timecountdown
        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        textTimer = this.add.text(gameWidth/2, 32, this.initialTime,style);
        // text.anchor.set(0.5);
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
                        console.log("TOTAL_SCORE",TOTAL_SCORE,"/ 9")
                        this.scene.start("FinalScene",{ score: TOTAL_SCORE });
                    }
                },
                callbackScope: self, 
                loop: true 
            }
        );

        textTimer.x = Math.floor(spriteTimeBG.x + (spriteTimeBG.width/4)*0.6);
        textTimer.y = Math.floor(spriteTimeBG.y - (spriteTimeBG.height/2)*0.55);

        // Render Background Character
        const backgroundCharac = this.add.image(0, gameHeight-15, 'backgroundCharac').setInteractive();
        backgroundCharac.setPosition((gameWidth-backgroundCharac.width/2.1)-10, gameHeight-backgroundCharac.height/6);
        backgroundCharac.setScale(1)

        // Render Logo
        const logoTop = this.add.image(100, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/4, gameHeight/14);
        logoTop.setScale(0.3)


        // Render character
        for (var i = 1; i <= NUMBER_CHARACTER; i++)
        {   
            // CREATE CHARACTER
            const characImageName = `character${i}`
            var image = this.add.image(x, gameHeight-backgroundCharac.height/2.8, characImageName).setInteractive();
            this.input.setDraggable(image);

            CHARAC_ARRAY.push(image)

            image.setSize(gameWidth/25, gameHeight/25);
            if(window.innerWidth < 600){
                image.setScale(0.5);
            }

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
            }

            TARGET_ARRAY.push(imageTarget)
        }

        // // Render Popup
        const showPopUp = (i,currentScene) => {
            const popUp = this.add.image(gameWidth/2, gameHeight/2, `popup${i}`);
            popUp.setScale(0);
            let scaleUp = 0;
            window.innerWidth < 600 ? scaleUp = 0.5 : scaleUp = 1 
            tween = currentScene.tweens.add({
                targets: popUp,
                scale: {
                    from: 0,
                    to: scaleUp,
                },
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

                closeButton.destroy()
            }, this)
        }

        // events
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

                TOTAL_SCORE++;

                if(TOTAL_SCORE===9){
                    this.scene.scene.start("FinalScene",{ score: TOTAL_SCORE });
                }
                // show popup infor
                console.log("SHOW POPUP")
                showPopUp(parseInt((gameObject.texture.key).slice(9,-3)),this.scene)
                
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