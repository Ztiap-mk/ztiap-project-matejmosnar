const STATES = {
    SPLASH: 'splashScreenState',
    GAME: 'gameState',
    MAIN_MENU: 'mainMenu',
    INFO: 'info',
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
            info: new InfoState(this, ctx),
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

        const startButton = new ImageButton(100, 100, 60, 60, resourceManager.getImageSource('virus'));
        startButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });

        this.objects = [
            startButton,
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


class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.bgImage = resourceManager.getImageSource('crowd');
        this.pointerImage = resourceManager.getImageSource('pointer2');

        // Create 5 balls
        for (let i = 0; i < 5; i++) {
            this.objects.push(new Ball());
        }
    }

    update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }

    render(ctx) {
        this.ctx.drawImage(this.bgImage,0,0,1000,400);
        this.ctx.drawImage(this.pointerImage,400,50,50,50);
        this.objects.forEach(object => object.render(this.ctx));
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

        const startGameButton = new TextButton(100, 100, 200, 40, 40, 'Start Game');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton(100, 200, 200, 40, 40, 'Help');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
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

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        this.objects = [
            new Background(0, 0, canvas.width, canvas.height),
            new TextButton(100, 100, 200, 40, 40, 'Jedno Info'),
            new TextButton(100, 150, 200, 40, 40, 'Druhe Info'),
            new TextButton(100, 200, 200, 40, 40, 'Tretie Info'),
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