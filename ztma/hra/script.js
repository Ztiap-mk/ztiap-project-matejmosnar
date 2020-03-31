var hrac, context, canvas;
var x = 0, rychlost = 5, zaciatok = 624;
var objekty = ['bullet.png', 'small_ships.png', 'spaceship_enemy_red.png'];

var meno_hry = "Bullet Hell";

window.onload = function()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
}

function nakresli_objekt(meno_obrazku, pozicia) {
    var obrazok = new Image();
    obrazok.src = meno_obrazku;
    obrazok.onload = function() {
        context.drawImage(obrazok, pozicia, 512, 150, 150);
    }
}

function obnov_vsetko()
{
    var pozadie = new Image();
    pozadie.src = "background.jpg";
    pozadie.onload = function () {

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(pozadie, 512, 0, canvas.width / 2, canvas.height / 2);

        hrac = new Image();
        hrac.src = "alienship_new.png";
        hrac.onload = function () {
            context.drawImage(hrac, zaciatok + x, canvas.height / 2 - 512, 300, 300);
        }

        context.font = '40pt Arial';
        context.textAlign = 'center';
        context.fillStyle = 'white';
        context.fillText(meno_hry, canvas.width / 2, canvas.height / 26);
    }


    for (var i = 0; i < objekty.length; i++) {
        nakresli_objekt(objekty[i], (canvas.width / 2 - 512) + i * 200);
    }
        if(x==-125||x==635){
            rychlost=rychlost*-1;
        }
        x+=rychlost;
}



var update = setInterval(obnov_vsetko, 60);

function stop() {
    clearInterval(update);
}