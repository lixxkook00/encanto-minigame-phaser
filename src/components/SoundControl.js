export default function SoundControl(game) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    const soundIcon = game.add.image(10, gameHeight/2, 'soundIcon').setInteractive();

    if(game.sound.sounds[0].isPlaying){
        soundIcon.setTexture('soundIcon')   
    }else{
        soundIcon.setTexture('soundIconMuted')   
    }

    if(gameWidth < 600){
        soundIcon.setScale(0.7)
        soundIcon.setPosition(gameWidth - 30, gameHeight/10 - 2);
    }else{
        soundIcon.setScale(0.9)
        soundIcon.setPosition(gameWidth - (gameWidth/20), gameHeight/10 - 5);
    }

    soundIcon.on('pointerdown', function(){
        console.log("game",game)
        console.log(game.SOUND_STATE)

        if(soundIcon.texture.key === "soundIcon"){
            soundIcon.setTexture('soundIconMuted')
            game.sound.sounds[0].pause()
        }else if(soundIcon.texture.key === "soundIconMuted") {
            soundIcon.setTexture('soundIcon')
            game.sound.sounds[0].resume()
        }
    })
}
