class mainShip {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('main_ship');

        this.x = Math.random() * canvas.width
        this.y = 330
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.size = 3;

    }


    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }


        // Movement
        this.x += this.dx * dt
        //this.y += 0 * dt
        //this.rotation +=dt/3
    }

    moveLeft(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            //this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            //this.dx = Math.abs(this.dx)
        }


        // Movement
        this.x += -25
        //this.y += 0 * dt
        //this.rotation +=dt/3
    }

    moveRight(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            //this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            //this.dx = Math.abs(this.dx)
        }


        // Movement
        this.x += 25
        //this.y += 0 * dt
        //this.rotation +=dt/3
    }


    // Render self
    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        //ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }

}

class blueBullet{

    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('blue_bullet');
        this.rotation = 3.1415
        this.x = 100
        this.y = 200

        this.dy = Math.random() * 50 - 25

        this.size = 1.4
    }

    // Movement logic
    shoot(dt) {

        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }

        // Movement
        this.y -= 10

    }

    // Render self
    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        //ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }

}

class enemyShip {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('enemy_ship');
        this.rotation = 3.1415
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height/2.2
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25

        this.size = 1.4
    }

    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }
        if (this.y < 0) {
            this.y = 0
            this.dy = Math.abs(this.dy) * 0.95
        }

        // Movement
        this.x += this.dx * dt
        this.y += 0 * dt

    }

    // Render self
    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}

class enemyShip2 {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('enemy_ship2');
        this.rotation = 3.1415
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height/2.2
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25

        this.size = 2
    }

    // Movement logic
    move(dt) {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
            this.dx = -Math.abs(this.dx)
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = Math.abs(this.dx)
        }
        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }
        if (this.y < 0) {
            this.y = 0
            this.dy = Math.abs(this.dy) * 0.95
        }

        // Movement
        this.x += this.dx * dt
        this.y += 0 * dt

    }

    // Render self
    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}

class Pointer {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pointer2');

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}

class Background {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('bg');

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}