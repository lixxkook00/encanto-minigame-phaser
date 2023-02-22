import handleEndGame from "./handleEndGame.js";

export default function showPopUp(game, i, currentScene, dropZone) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width
    let tween;

    const popUp = game.add.image(gameWidth/2, gameHeight/2, `popup${i}`);
    popUp.setScale(0);
    popUp.setPosition(dropZone.x,dropZone.y)
    let scaleUp = 0;
    gameWidth < 600 ? scaleUp = 0.5 : scaleUp = 0.8 

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

    const closeButton = game.add.image(100, 100, 'closePopup').setInteractive();
    let scaleCloseBtnUp = 0;
    gameWidth < 600 ? scaleCloseBtnUp = 0.5 : scaleCloseBtnUp = 1 
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
            x: dropZone.x,
            y: dropZone.y,
            duration: 500,
            ease: 'Linear'
        });

        if(game.TOTAL_SCORE === 9){
            console.log("chatcc")
            handleEndGame(game,"congraz",game,game.TOTAL_SCORE)
        }

        closeButton.destroy()
    }, this)
}
