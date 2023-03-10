
export default function Footer(game) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    // Render Logo Footer
    const footerLogo = game.add.image(10, gameHeight/2, 'footerLogo').setInteractive();
    if(gameWidth < 600){
        footerLogo.setScale(0.5)
        footerLogo.setPosition(15, gameHeight - 15);
    }else{
        footerLogo.setPosition(30, gameHeight -30);
    }

    // Render Text Footer
    const footerText = game.add.image(10, gameHeight/2, 'footerText').setInteractive();
    if(gameWidth < 600){
        footerText.setScale(0.5)
        footerText.setPosition(gameWidth - 10 - (footerText.width)*(1/2)*0.5, gameHeight - 10);
    }else{
        footerText.setPosition(gameWidth - 40 - (footerText.width)*(1/2)*0.5, gameHeight - 30);
    }
}
