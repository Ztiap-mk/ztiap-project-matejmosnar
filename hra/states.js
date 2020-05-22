const STATES = {
    GAME: 'gameState',
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
            mainMenu: new mainMenu(this, ctx),
            gameState: new GameState(this, ctx),
            gameOver: new gameOver(this, ctx),
            instructionState: new instructionState(this, ctx),
        };
        this.currentState = this.states.mainMenu;
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
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }
}

class mainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);


        const startButton = new ImageButton(400, 125, 150, 150, resourceManager.getImageSource('start_button'));
        startButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INSTRUCT);
        });

        const exitButton = new ImageButton(400, 225, 150, 150, resourceManager.getImageSource('exit_button'));
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

}
class instructionState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        
        const startButton = new ImageButton(0, 0, 1000, 500, resourceManager.getImageSource('instruct'));
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
    }
}

let datum = new Date();
let skore = 0;
let cas = Math.floor((Math.random()*30)+1);
let pocet = Math.floor((Math.random()*5)+1);
let stary_cas = datum.getSeconds();
let frame = 0;
let shoot = 0;
let x = 0;
let sound = 0;
let faza = 1;

class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);



        this.bgImage = resourceManager.getImageSource('bg');

        let music = document.getElementById("music")

        const audioOnButton = new ImageButton(950, 0, 50, 50, resourceManager.getImageSource('audio_on'));
        const audioOffButton = new ImageButton(950, 0, 50, 50, resourceManager.getImageSource('audio_off'));
        this.bullets=[]
        this.bulletsEnemy=[];
        this.objects2 = [
            audioOnButton,
        ];

        audioOnButton.onClick((ev) => {
            this.objects2 = [
                audioOffButton,
            ]
            sound = 1;
            music.play()
        });

        audioOffButton.onClick((ev) => {
            this.objects2 = [
                audioOnButton,
            ]
            sound = 0;
            music.pause()
        });

        for(let i=0;i<3;i++){
            this.objects.push(new enemyShip());
            this.objects.push(new enemyShip2());
        }
        this.mainship = new mainShip();
    }



    handleEvent(ev) {



        this.objects2.forEach((object) => {
            object.handleEvent(ev);
        });


        if (isKeyPressEvent(ev) && ev.key === 'a') {
                this.mainship.moveLeft(ev);
        }

        if (isKeyPressEvent(ev) && ev.key === 'd') {
                this.mainship.moveRight(ev);
        }

        let ms_shot = new Audio("audio/main_ship_bullet.mp3");

        if (isKeyPressEvent(ev) && ev.key === ' ' && x>10) {
            this.bullets.push(new blueBullet(this.mainship.x,this.mainship.y))
            x=0;
            if(sound === 1) ms_shot.play().then(r => {});
        }

        shoot++;
    }



    update(dt) {
        let es_shot = new Audio("audio/enemy_ship_bullet.mp3");
        let hit = new Audio("audio/hit.mp3");
        this.objects.forEach((object) => {
            object.move(dt);
        });

        this.bullets.forEach((object) => {
            object.shoot(dt,this.mainship.x,this.mainship.y);
        });

        this.bulletsEnemy.forEach((object) => {
            object.shoot(dt,this.mainship.x,this.mainship.y);
        });

        for(let i=0;i<this.objects.length;i++){
            for(let j=0;j<this.bullets.length;j++) {
                if (this.objects.length > 0 && this.bullets.length > 0) {
                if (this.bullets[j].x <= this.objects[i].x + 25 && this.bullets[j].x >= this.objects[i].x - 25 && this.bullets[j].y <= this.objects[i].y + 15 && this.bullets[j].y >= this.objects[i].y - 15){
                    if(sound === 1) hit.play().then(r => {});
                    this.objects[i].health -= 50;
                    if(this.objects[i].health <= 0){
                        if(this.objects[i].name === "enemyShip") skore += 10;
                        else if(this.objects[i].name === "enemyShip2") skore += 30;
                        this.objects.splice(i, 1);
                        break;
                    }
                    this.bullets.splice(j, 1);
                    j++;
                    break;
                }
                if(this.bullets[j].y<=10){
                    this.bullets.splice(j, 1);
                    j++;
                    break;
                }
            }
                pocet = Math.floor(Math.random()*4);
            }

            for(let i=0;i<this.objects.length;i++){
                if(frame % this.objects[i].id === 0 && frame > 50){
                    this.bulletsEnemy.push(new redBullet(this.objects[i].x,this.objects[i].y));
                    this.bulletsEnemy[this.bulletsEnemy.length-1].shoot();
                    if(sound === 1) es_shot.play().then(r => {});
                }
            }
        }
        if (frame >= 2000 && frame < 4000) faza = 2;
        else if (frame >= 4000 && frame < 6000) faza = 3;
        else if (frame >= 6000 && frame < 8000) faza = 4;

        for(let i=0;i<this.bulletsEnemy.length;i++){
            if(this.bulletsEnemy[i].y >= this.mainship.y-15 && this.bulletsEnemy[i].y <= this.mainship.y+15 && this.bulletsEnemy[i].x >= this.mainship.x - 70 && this.bulletsEnemy[i].x <= this.mainship.x + 70){
                this.bulletsEnemy.splice(i,6);
                if(frame < 2000) this.mainship.health -= 20;
                else if (frame >= 2000 && frame < 4000) this.mainship.health -= 40;
                else if (frame >= 4000 && frame < 6000) this.mainship.health -= 60;
                else if (frame >= 6000) this.mainship.health -= 100;
                if(this.mainship.health <= 0){
                    this.mainship.health += 500;
                    this.objects = [];
                    this.bullets = [];
                    this.bulletsEnemy = [];
                    this.stateManager.changeState(STATES.GAME_OVER);
                }
                if(sound === 1) hit.play().then(r => {});
                break;
            }
            if(this.bulletsEnemy[i].y >= 475){
                this.bulletsEnemy.splice(i,6);
                break;
            }
        }
        if(this.objects.length < 1){
            for (let k=0; k<=pocet; k++){
                this.objects.push(new enemyShip());
                this.objects.push(new enemyShip2());
            }
        }
        x++;
        frame++;
        datum = new Date();
        let aktual_cas = datum.getSeconds();
        let temp = aktual_cas-stary_cas;
        if(temp === cas){
            for(let i=0;i<pocet;i++){
                this.objects.push(new enemyShip2());
                this.objects.push(new enemyShip());
            }
            cas = Math.floor((Math.random()*30)+1);
            pocet = Math.floor((Math.random()*5)+1);
        }
    }

    render(ctx) {
        this.ctx.drawImage(this.bgImage,0,0,1000,500);
        this.ctx.fillText("SKÓRE: " + skore,800,500);
        this.ctx.fillText("FÁZA: " + faza,50,465);
        this.ctx.fillText("HP: " + this.mainship.health,50,500);
        this.ctx.font = "30px Arial";
        this.objects.forEach(object => object.render(this.ctx));
        this.objects2.forEach(object => object.render(this.ctx));
        this.bullets.forEach(object => object.render(this.ctx));
        this.bulletsEnemy.forEach(object => object.render(this.ctx));
        this.mainship.render(this.ctx);
    }
}

class gameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        this.objects = [
            new Background(0, 0, canvas.width, canvas.height),
        ];

        const retryButton = new TextButton(450, 320, 200, 40, 40, 'RETRY')
        retryButton.onClick((ev) => {
            skore = 0;
            this.stateManager.changeState(STATES.GAME);
        });

        this.objects2 = [
            retryButton,
        ]
    }

    render(ctx) {
        this.objects.forEach(object => object.render(this.ctx));
        this.objects2.forEach(object => object.render(this.ctx));
        this.ctx.fillText("GAME OVER",425,220);
        this.ctx.fillText("SKÓRE: " + skore,435,265);
    }


    handleEvent(ev) {
        this.objects2.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}