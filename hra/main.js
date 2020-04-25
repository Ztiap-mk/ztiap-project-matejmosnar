const IMAGES = [
    {name: 'main_ship', src: 'img/alienship_new.png'},
    {name: 'bg', src: 'img/background.jpg'},
    {name: 'start_button', src: 'img/play_buttons.png'},
    {name: 'exit_button', src: 'img/exit_buttons.png'},
    {name: 'enemy_ship', src: 'img/small_ships.png'},
    {name: 'enemy_ship2', src: 'img/spaceship_enemy_red.png'},
    {name: 'blue_bullet', src: 'img/bullet.png'},
    {name: 'instruct', src: 'img/instruct.jpg'},
    {name: 'audio_on', src: 'img/audio_on.png'},
    {name: 'audio_off', src: 'img/audio_off.png'},
];

const SOUNDS = [
    {name: 'music', src: 'audio/music.mp3', count: 10},
];

const KEY_EVENT_TYPES = {

};

const MOUSE_EVENT_TYPES = {

};

// celu logiku som zabalil do tejto class, riesi inicializaciu ball objektov + riesi rendering + nekonecny loop
class Game {

    constructor() {
        // Set up canvas for 2D rendering
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        this.time = Date.now();

        this.stateManager = new StateManager(resourceManager, this.ctx);
    }

    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
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

    // spusta nekonecnu slucku
    startLoop() {
        this.time = Date.now();
        this.step();
    }

    //
    step() {
        // console.log("Step");

        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100; // dt nadobuda hodnoty <0.15;az 0.33>
        this.time = now;

        this.update(dt);
        this.render(dt);

        // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        requestAnimationFrame(() => this.step());
    }

    update(dt) {
        this.stateManager.update(dt);
    }

    // render len zobrazuje a obrazok sa nacita raz pri inicializacii
    render(dt) {
        this.clearCtx();
        this.stateManager.render(dt);
    }

    // cistenie som presunul do zvlast funkcie
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}