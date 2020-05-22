const IMAGES = [
    {name: 'main_ship', src: 'img/alienship_new.png'},
    {name: 'bg', src: 'img/background.jpg'},
    {name: 'start_button', src: 'img/play_buttons.png'},
    {name: 'exit_button', src: 'img/exit_buttons.png'},
    {name: 'enemy_ship', src: 'img/small_ships.png'},
    {name: 'enemy_ship2', src: 'img/spaceship_enemy_red.png'},
    {name: 'blue_bullet', src: 'img/bullet.png'},
    {name: 'red_bullet', src: 'img/bullet_red.png'},
    {name: 'instruct', src: 'img/instruct.jpg'},
    {name: 'audio_on', src: 'img/audio_on.png'},
    {name: 'audio_off', src: 'img/audio_off.png'},
    {name: 'hp', src: 'img/galaxy_15.png'},
];

const SOUNDS = [
    {name: 'music', src: 'audio/music.mp3', count: 10},
    {name: 'ms_shot', src: 'audio/main_ship_bullet.mp3', count: 1},
    {name: 'es_shot', src: 'audio/enemy_ship_bullet.mp3', count: 1},
];

class Game {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.time = Date.now();
        this.stateManager = new StateManager(resourceManager, this.ctx);
    }

    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
        this.stateManager.init();
        this.initEventSystem();
        this.startLoop();
    }

    initEventSystem() {
        this.canvas.addEventListener('click', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keypress', (ev) => {
            this.handleEvent(ev);
        });
    }

    handleEvent(ev) {
        this.stateManager.handleEvent(ev);
    }

    startLoop() {
        this.time = Date.now();
        this.step();
    }

    step() {
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;

        this.update(dt);
        this.render(dt);

        requestAnimationFrame(() => this.step());
    }

    update(dt) {
        this.stateManager.update(dt);
    }

    render(dt) {
        this.clearCtx();
        this.stateManager.render(dt);
    }

    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}