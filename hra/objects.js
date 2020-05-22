class mainShip {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('main_ship');
        this.x = Math.random() * canvas.width
        this.y = 450
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.size = 3;
        this.health = 1000;
    }

    moveLeft() {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
        }
        if (this.x < 0) {
            this.x = 0
        }
        this.x -= 25
    }

    moveRight() {
        const canvas = this.canvas;
        if (this.x > canvas.width) {
            this.x = canvas.width
        }
        if (this.x < 5) {
            this.x = 5
        }
        this.x += 25;
    }

    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }

}

class blueBullet{
    constructor(x,y) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('blue_bullet');
        this.x = x
        this.y = y
        this.size = 1.4
    }

    shoot() {
        if (this.y > canvas.height) {
            this.y = canvas.height
            this.dy = -Math.abs(this.dy)
        }
        this.y -= 10
    }

    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }

}

class redBullet{

    constructor(x,y) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('red_bullet');
        this.rotation = 3.1415
        this.x = x
        this.y = y
        this.size = 1.4
    }

    shoot() {

        if (this.y > canvas.height - 5) {
            this.y = canvas.height - 5
        }
        this.y += 10
    }

    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }

}

class enemyShip {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('enemy_ship');
        this.rotation = 3.1415
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height/2.2
        this.dx = 20
        this.dy = Math.random() * 50 - 25
        this.health = 100;
        this.size = 1.4
        this.name = "enemyShip"
        this.id = Math.floor(Math.random()*500+50)
    }

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

        this.x += this.dx * dt

    }

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
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('enemy_ship2');
        this.rotation = 3.1415
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height/2.2
        this.dx = 10
        this.dy = Math.random() * 50 - 25
        this.health = 200;
        this.size = 2
        this.name = "enemyShip2"
        this.id = Math.floor(Math.random()*500+50)
    }

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

        this.x += this.dx * dt

    }

    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
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