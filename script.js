import GameScene from './src/scenes/Game.js';
import FinalScene from './src/scenes/Final.js';
import StartScene from './src/scenes/Start.js';
import PreLoadingScene from './src/scenes/PreLoading.js';

const handleScaleWindown = () => {
    if(window.innerWidth*(1024/768) < window.innerHeight){
        return {
            width: window.innerWidth,
            height: window.innerWidth*(1024/768)
        }
    }else{
        return {
            width: window.innerHeight*(768/1024),
            height: window.innerHeight
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const gameWrapper = document.querySelector('#gameWrapper')

    gameWrapper.style.height = `${handleScaleWindown().height}px`
    gameWrapper.style.width = `${handleScaleWindown().width}px`
});

var config = {
    type: Phaser.AUTO,
    parent: 'gameWrapper',
    width: handleScaleWindown().width,
    height: handleScaleWindown().height,
    backgroundColor: '#000000',
    scene: [ PreLoadingScene, StartScene, GameScene, FinalScene],
    render: {
        roundPixels: true,
    },
};

var game = new Phaser.Game(config);
