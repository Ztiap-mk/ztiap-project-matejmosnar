const STATES = {
    SPLASH: 'splashScreenState',
    GAME: 'gameState',
    GAME_A_OFF: 'gameStateAudioOff',
    MAIN_MENU: 'mainMenu',
    GAME_OVER: 'gameOver',
    INSTRUCT: 'instructionState',
}

class StateManager {
    states = {};
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }

    init() {
        const ctx = this.ctx;
        this.states = {
            splashScreenState: new SplashScreenState(this, ctx),
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            gameOver: new gameOver(this, ctx),
            instructionState: new instructionState(this, ctx),
        };
        this.currentState = this.states.splashScreenState;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState = newState;
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }

    // handleKeyEvent(e) {
    //     this.currentState.handleKeyEvent(e);
    // }

    // handleMouseEvent(e) {
    //     this.currentState.handleMouseEvent(e);
    // }

    render() {
        this.currentState.render(this.ctx);
    }
}

class BaseState {

    objects = [];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;

    }

    render() {
        // TODO pridat logiku pre zoradovanie objektov, ktory sa ma prvy zobrazit
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }

    // handleMouseEvent(e) {

    // }

    // handleKeyEvent(e) {

    // }
}

class SplashScreenState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);


        const startButton = new ImageButton(400, 50, 150, 150, resourceManager.getImageSource('start_button'));
        startButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INSTRUCT);
        });

        const exitButton = new ImageButton(400, 150, 150, 150, resourceManager.getImageSource('exit_button'));
        exitButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME_OVER);
        });



        this.objects = [
            startButton, exitButton
        ];
    }



    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }

    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (e.keyCode === '13') {
    //         this.stateManager.changeState('gameState');
    //     }
    // }

    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (type)
    //     if (e.keyCode === '13') {
    //         this.stateManager.changeState(gameState);
    //     }
    // }
}
class instructionState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        
        const startButton = new ImageButton(0, 0, 1000, 400, resourceManager.getImageSource('instruct'));
        startButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        this.objects = [
            startButton,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }

    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (e.keyCode === 's') {
    //         this.stateManager.changeState(gameState);
    //     }
    // }
}


class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);



        this.bgImage = resourceManager.getImageSource('bg');
       // this.pointerImage = resourceManager.getImageSource('pointer2');

        var music = document.getElementById("music")
        music.play()



        const audioOnButton = new ImageButton(950, 0, 50, 50, resourceManager.getImageSource('audio_on'));
        const audioOffButton = new ImageButton(950, 0, 50, 50, resourceManager.getImageSource('audio_off'));

        this.objects2 = [
            audioOnButton,
        ];

        audioOnButton.onClick((ev) => {
            this.objects2 = [
                audioOffButton,
            ]
        });

        audioOffButton.onClick((ev) => {
            this.objects2 = [
                audioOnButton,
            ]
        });

        for(let i=0;i<3;i++){
            this.objects.push(new enemyShip());
            this.objects.push(new enemyShip2());
        }



        this.objects.push(new mainShip());

    }

    handleEvent(ev) {
        this.objects2.forEach((object) => {
            object.handleEvent(ev);
        });
    }


    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.bgImage,0,0,1000,400);
        //this.ctx.drawImage(this.pointerImage,400,50,50,50);
        this.objects.forEach(object => object.render(this.ctx));
        this.objects2.forEach(object => object.render(this.ctx));
    }


    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (type)
    //     if (e.keyCode === '13') {
    //         this.stateManager.changeState(gameState);
    //     }
    // }
}



class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        const startGameButton = new TextButton(100, 100, 200, 40, 40, 'START');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton(100, 200, 200, 40, 40, 'SETTINGS');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME_OVER);
        });

        this.objects = [
            startGameButton,
            infoButton,
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });


    }

    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (e.keyCode === 's') {
    //         this.stateManager.changeState(gameState);
    //     }
    // }
}

class gameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        const canvas = document.getElementById("canvas");

        const retryButton = new TextButton(400, 300, 200, 40, 40, 'RETRY');
        retryButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        this.objects = [
            new Background(0, 0, canvas.width, canvas.height),
            new TextButton(400, 200, 200, 40, 40, 'GAME OVER'),
            new TextButton(400, 250, 200, 40, 40, 'SCORE: '),
            retryButton,
        ];
    }


    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }

    // /**
    //  *
    //  *
    //  * @param {KeyboardEvent} e
    //  * @param { 1 | 2 | 3 } type
    //  * @memberof SplashScreenState
    //  */
    // handleKeyEvent(e, type) {
    //     if (e.keyCode === 's') {
    //         this.stateManager.changeState(gameState);
    //     }
    // }
}