export default function SoundControl(game) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    const soundIcon = game.add.image(10, gameHeight/2, 'soundIcon').setInteractive();

    if(gameWidth < 600){
        soundIcon.setScale(0.7)
        soundIcon.setPosition(gameWidth - 30, gameHeight/10 - 2);
    }else{
        soundIcon.setScale(0.9)
        soundIcon.setPosition(gameWidth - (gameWidth/20), gameHeight/10 - 5);
    }

    soundIcon.on('pointerdown', function(){
        if(soundIcon.texture.key === "soundIcon"){
            soundIcon.setTexture('soundIconMuted')
        }else if(soundIcon.texture.key === "soundIconMuted") {
            soundIcon.setTexture('soundIcon')
        }
    })
}
