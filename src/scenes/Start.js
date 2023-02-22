import Footer from "../components/Footer.js";

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
        var progressBar = this.add.graphics();
        progressBar.setDepth(3)
        progressBar.fillStyle(0xffffff, 1);

        var progressBox = this.add.graphics();
        progressBox.setDepth(2)
        progressBox.fillStyle(0xE1854, 1);
        progressBox.fillRect(gameWidth/2 - 110, gameHeight/1.3, 220, 18);

        // loading update
        this.load.setPath('/src');
        this.load.on('progress', function (value) {
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(gameWidth/2 - 108, gameHeight/1.3 + 2, 216 * value, 14);

        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
        });
        
        // START SCENE
        this.load.image('backgroundStart', 'assets/images/backgrounds/bg_1.jpg');

        // Logo
        this.load.image('logoTop', 'assets/images/text/logo_encanto.png');

        // buttons
        this.load.image('btnStart', 'assets/images/buttons/btn_start.png');

        // texts
        this.load.image('txtIntro', 'assets/images/text/txt_intro.png');

        // GAME SCENE
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

        // FINAL SCENE
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

        // Footer
        this.load.image('footerLogo', 'assets/images/logo/logo_pg.png');
        this.load.image('footerText', 'assets/images/text/legal.png');
    }

    create (data){
        const gameHeight = this.game.config.height
        const gameWidth = this.game.config.width

        // Render Logo
        const logoTop = this.add.image(gameWidth/2, 100, 'logoTop').setInteractive();
        logoTop.setPosition(gameWidth/2, gameHeight/14 + 20);
        logoTop.setScale(0.4)

        // Render Text Intro
        const txtIntro = this.add.image(gameWidth/2, gameHeight/2, 'txtIntro').setInteractive();
        txtIntro.setPosition(gameWidth/2, gameHeight/1.3 + 10);
        window.innerWidth < 600 ? txtIntro.setScale(0.5) : txtIntro.setScale(1)


        // Render Button Start (354 × 117)
        const btnStart = this.add.image(gameWidth/2, 100, 'btnStart').setInteractive();
        btnStart.setDisplaySize(gameWidth*(2/5.5), gameWidth*(2/5.5)*(117/354))
        const btnStartY = gameHeight - gameWidth*(2/6)*(117/354)*(1/2) - 25
        btnStart.setPosition(gameWidth/2, btnStartY);

        // // Render Logo Footer
        // const footerLogo = this.add.image(10, gameHeight/2, 'footerLogo').setInteractive();
        // if(window.innerWidth < 600){
        //     footerLogo.setScale(0.5)
        //     footerLogo.setPosition(20, gameHeight - 20);
        // }else{
        //    footerLogo.setPosition(40, gameHeight - 40);
        // }

        // // Render Text Footer
        // const footerText = this.add.image(10, gameHeight/2, 'footerText').setInteractive();
        // if(window.innerWidth < 600){
        //     footerText.setScale(0.5)
        //     footerText.setPosition(gameWidth - 20 - (footerText.width)*(1/2)*0.5, gameHeight - 20);
        // }else{
        //    footerText.setPosition(gameWidth - 40 - (footerText.width)*(1/2)*0.5, gameHeight - 40);
        // }

        Footer(this)

        // ------ event
        btnStart.on('pointerdown', function(){
            this.scene.start("GameScene");
        }, this)
    }
}


export default StartScene;