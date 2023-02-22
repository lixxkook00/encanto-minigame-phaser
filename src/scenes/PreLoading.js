class PreLoadingScene extends Phaser.Scene {

    constructor ()
    {
        super('PreLoadingScene');
    }

    preload() {
        // Load background for loading screen
        this.load.setPath('/src');

        this.load.on('complete', function () {
            this.scene.scene.start("StartScene");
        });
        
        this.load.image('backgroundStart', 'assets/images/backgrounds/bg_1.jpg');
    }

    create (data){

    }
}

export default PreLoadingScene;