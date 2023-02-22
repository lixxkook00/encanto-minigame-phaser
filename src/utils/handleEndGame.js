export default function handleEndGame(game, key, currentScene) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    let tween;

    // Render background overlay
    const bgTimeOver = game.add.graphics();
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
        const txtTimeOver = game.add.image(gameWidth/2, 100, 'txtTimeOver').setInteractive();
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
        const txtTimeOver = game.add.image(gameWidth/2, 100, 'txtCongratz').setInteractive();
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
        currentScene.scene.start("FinalScene",{ score: game.TOTAL_SCORE })
    },1000)
}
