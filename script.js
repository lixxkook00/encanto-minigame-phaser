import GameScene from './src/scenes/Game.js';
import FinalScene from './src/scenes/Final.js';
import StartScene from './src/scenes/Start.js';
import PreLoadingScene from './src/scenes/PreLoading.js';

var config = {
    type: Phaser.AUTO,
    parent: 'wapper',
    width: window.innerWidth,
    height: window.innerWidth*(1024/768),
    backgroundColor: '#000000',
    scene: [ PreLoadingScene, StartScene, GameScene, FinalScene]
};

var game = new Phaser.Game(config);
