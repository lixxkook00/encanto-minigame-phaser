import showPopUp from "./showPopUp.js";

export default function handleDragDrop(game) {
    const gameHeight = game.game.config.height
    const gameWidth = game.game.config.width

    game.input.on('dragstart', function (pointer, gameObject) {
        game.children.bringToTop(gameObject);

        gameObject.setTexture(gameObject.texture.key+"New")
        if(gameWidth < 600){
            gameObject.setScale(0.6)
        }
    }, this);

    game.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        
    });

    game.input.on('drop', function (pointer, gameObject, dropZone) {

        if(dropZone.texture.key == (gameObject.texture.key)){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            // clear
            dropZone.setScale(0)
            gameObject.disableInteractive()
            gameObject.setScale(0)

            // add total score
            game.TOTAL_SCORE = game.TOTAL_SCORE +1 ;

            // show popup infor
            showPopUp(game, parseInt((gameObject.texture.key).slice(9,-3)),game.scene.scene,dropZone,game.TOTAL_SCORE)
            
            return 0
        }else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });

    game.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            
        }else{

        }

        const currentName = gameObject.texture.key;
        gameObject.setTexture(currentName.slice(0,-3))

        // console.log("TOTAL_SCORE",TOTAL_SCORE,"/ 9")
    });

    game.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });
}
