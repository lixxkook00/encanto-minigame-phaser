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
        this.load.image('character1', 'assets/images/character/on-platform/1.png');
        this.load.image('character2', 'assets/images/character/on-platform/2.png');
        this.load.image('character3', 'assets/images/character/on-platform/3.png');
        this.load.image('character4', 'assets/images/character/on-platform/4.png');
        this.load.image('character5', 'assets/images/character/on-platform/5.png');
        this.load.image('character6', 'assets/images/character/on-platform/6.png');
        this.load.image('character7', 'assets/images/character/on-platform/7.png');
        this.load.image('character8', 'assets/images/character/on-platform/8.png');
        this.load.image('character9', 'assets/images/character/on-platform/9.png');

        this.load.image('character1New', 'assets/images/character/game/1.png');
        this.load.image('character2New', 'assets/images/character/game/2.png');
        this.load.image('character3New', 'assets/images/character/game/3.png');
        this.load.image('character4New', 'assets/images/character/game/4.png');
        this.load.image('character5New', 'assets/images/character/game/5.png');
        this.load.image('character6New', 'assets/images/character/game/6.png');
        this.load.image('character7New', 'assets/images/character/game/7.png');
        this.load.image('character8New', 'assets/images/character/game/8.png');
        this.load.image('character9New', 'assets/images/character/game/9.png');

        this.load.image('background', 'assets/images/backgrounds/bg_2.jpg');
        
        this.load.image('backgroundCharac', 'assets/images/text/game_platform.png');
        this.load.image('logoTop', 'assets/images/text/logo_encanto.png');
        this.load.image('timeBG', 'assets/images/text/time.png');

        this.load.image('closePopup', 'assets/images/popup/close.png');
        this.load.image('popup1', 'assets/images/popup/popup_1.png');
        this.load.image('popup2', 'assets/images/popup/popup_2.png');
        this.load.image('popup3', 'assets/images/popup/popup_3.png');
        this.load.image('popup4', 'assets/images/popup/popup_4.png');
        this.load.image('popup5', 'assets/images/popup/popup_5.png');
        this.load.image('popup6', 'assets/images/popup/popup_6.png');
        this.load.image('popup7', 'assets/images/popup/popup_7.png');
        this.load.image('popup8', 'assets/images/popup/popup_8.png');
        this.load.image('popup9', 'assets/images/popup/popup_9.png');
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

        const gameHeight = game.config.height
        const gameWidth = game.config.width


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

            x += game.config.width/9.5;

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
        this.load.image('backgroundFinal', 'assets/images/backgrounds/bg_3.jpg');

        // buttons
        this.load.image('btnLearnMore', 'assets/images/buttons/btn_learnmore.png');
        this.load.image('btnRePlay', 'assets/images/buttons/btn_replay.png');

        // texts
        this.load.image('txtEnd', 'assets/images/text/txt_endscreen_lose.png');
        this.load.image('txtCongratz', 'assets/images/text/txt_endscreen_win.png');
        this.load.image('txtOnly', 'assets/images/text/txt_prelaunch.png');

        // video frame
        this.load.image('videoFrame', 'assets/images/icons/videoframe.png');
    }

    create (data){
        const gameHeight = game.config.height
        const gameWidth = game.config.width

        console.log("create",data)

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
            txtEnd.setPosition(gameWidth/2, gameHeight/2.7 + 10);

            window.innerWidth < 600 ? txtEnd.setScale(0.5) : txtEnd.setScale(1)

            // Render Game Result
            var style = { font: "bold 50px Arial", fill: "#6FFFFF", boundsAlignH: "center", boundsAlignV: "middle" };
            const textTimer = this.add.text(gameWidth/2, 32, this.initialTime,style).setOrigin(0.5, 1);
            textTimer.setText(`${data.score}/9`)
            const textTimerY = gameHeight/2.7 + (window.innerWidth < 600 ? (txtEnd.height/2)*0.5 : (txtEnd.height/2)*1) + textTimer.height + 15
            textTimer.setPosition(gameWidth/2 , textTimerY - 10)

            // Render Video Frame
            const videoFrame = this.add.image(gameWidth/2, 100, 'videoFrame').setInteractive();
            videoFrame.setDisplaySize(gameWidth*(2/3),gameWidth*(2/3)*(311/540))
            const videoFrameY = textTimerY + (window.innerWidth < 600 ? videoFrame.height/4 : videoFrame.height/2)
            videoFrame.setPosition(gameWidth/2, videoFrameY -10);

            // Render Text Only (364 × 40)
            const txtOnly = this.add.image(gameWidth/2, 100, 'txtOnly').setInteractive();
            txtOnly.setDisplaySize(30*(364/40),30)
            const txtOnlyY = textTimerY + (window.innerWidth < 600 ? txtOnly.height/4 : txtOnly.height/2)
            txtOnly.setPosition(gameWidth/2, videoFrameY + 8 + gameWidth*(2/3)*(311/540)*(1/2));

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
        else if(data.score === 9){
            // Render Text End
            const txtEnd = this.add.image(gameWidth/2, gameHeight/2, 'txtCongratz').setInteractive();
            txtEnd.setPosition(gameWidth/2, gameHeight/2.7 + 20);

            window.innerWidth < 600 ? txtEnd.setScale(0.5) : txtEnd.setScale(1)
            const textTimerY = gameHeight/2.7 + (window.innerWidth < 600 ? (txtEnd.height/2)*0.5 : (txtEnd.height/2)*1) + 15

            // Render Video Frame
            const videoFrame = this.add.image(gameWidth/2, 100, 'videoFrame').setInteractive();
            videoFrame.setDisplaySize(gameWidth*(2/3),gameWidth*(2/3)*(311/540))
            const videoFrameY = textTimerY + (window.innerWidth < 600 ? videoFrame.height/4 : videoFrame.height/2)
            videoFrame.setPosition(gameWidth/2, videoFrameY);

            // Render Text Only (364 × 40)
            const txtOnly = this.add.image(gameWidth/2, 100, 'txtOnly').setInteractive();
            txtOnly.setDisplaySize(30*(364/40),30)
            const txtOnlyY = textTimerY + (window.innerWidth < 600 ? txtOnly.height/4 : txtOnly.height/2)
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

        
    }
}

class StartScene extends Phaser.Scene {

    constructor ()
    {
        super('StartScene');
    }

    preload() {
        const gameHeight = game.config.height
        const gameWidth = game.config.width

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        // progressBar.setPosition(gameWidth/2, gameHeight/2);
        // progressBar.setDepth(2)

        // progressBox.setPosition(gameWidth/2, gameHeight/2);
        // progressBox.setDepth(2)

        progressBox.setDepth(2)
        progressBar.setDepth(2)

        progressBox.fillStyle(0x222222, 0.5);
        progressBox.fillRect(gameWidth/2 - 160, gameHeight/2, 320, 32);

        // Phaser.Display.Align.In.Center(this,progressBox)

        progressBar.fillStyle(0xffffff, 1);
        // progressBar.fillRect(gameWidth/2 - 150, gameHeight/2, 300 * 1, 30);

        

        // loading update
        this.load.setPath('/');
        this.load.on('progress', function (value) {
            console.log(value);
            // progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(gameWidth/2 - 150, gameHeight/2, 300 * value, 30);

        });

        this.load.on('complete', function () {
            // console.log("loaded")
            
            // progress.destroy();

        });
        
        this.load.image('backgroundFinal', 'assets/images/backgrounds/bg_1.jpg');

        // Logo
        this.load.image('logoTop', 'assets/images/text/logo_encanto.png');

        // buttons
        this.load.image('btnStart', 'assets/images/buttons/btn_start.png');

        // texts
        this.load.image('txtIntro', 'assets/images/text/txt_intro.png');
    }

    create (data){
        const gameHeight = game.config.height
        const gameWidth = game.config.width

        console.log("create",data)

        // Render Background
        let imageBG = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'backgroundFinal')
        let scaleX = this.cameras.main.width / imageBG.width
        let scaleY = this.cameras.main.height / imageBG.height
        let scale = Math.max(scaleX, scaleY)
        imageBG.setScale(scale).setScrollFactor(0)

        // // Render Logo
        // const logoTop = this.add.image(gameWidth/2, 100, 'logoTop').setInteractive();
        // logoTop.setPosition(gameWidth/2, gameHeight/14 + 20);
        // logoTop.setScale(0.4)

        // // Render Text Intro
        // const txtIntro = this.add.image(gameWidth/2, gameHeight/2, 'txtIntro').setInteractive();
        // txtIntro.setPosition(gameWidth/2, gameHeight/1.3 + 10);
        // window.innerWidth < 600 ? txtIntro.setScale(0.5) : txtIntro.setScale(1)


        // // Render Button Start (354 × 117)
        // const btnStart = this.add.image(gameWidth/2, 100, 'btnStart').setInteractive();
        // btnStart.setDisplaySize(gameWidth*(2/5.5), gameWidth*(2/5.5)*(117/354))
        // const btnStartY = gameHeight - gameWidth*(2/6)*(117/354)*(1/2) - 25
        // btnStart.setPosition(gameWidth/2, btnStartY);

        // // ------ event
        // btnStart.on('pointerdown', function(){
        //     this.scene.start("GameScene");
        // }, this)
    }
}


var config = {
    type: Phaser.AUTO,
    parent: 'wapper',
    width: window.innerWidth,
    height: window.innerWidth*1.3333,
    backgroundColor: '#4488aa',
    scene: [ StartScene, GameScene, FinalScene]
};

var game = new Phaser.Game(config);
