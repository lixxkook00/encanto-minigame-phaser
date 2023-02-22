export default function LoadingBar(game) {
    
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    // LOADING BAR
    var progressBar = game.add.graphics();
    progressBar.setDepth(3)
    progressBar.fillStyle(0xffffff, 1);

    var progressBox = game.add.graphics();
    progressBox.setDepth(2)
    progressBox.fillStyle(0xE1854, 1);
    progressBox.fillRect(gameWidth/2 - 110, gameHeight/1.3, 220, 18);

    // loading update
    game.load.setPath('/src');
    game.load.on('progress', function (value) {
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(gameWidth/2 - 108, gameHeight/1.3 + 2, 216 * value, 14);

    });

    game.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
    });
}
