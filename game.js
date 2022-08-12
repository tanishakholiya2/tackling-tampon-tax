var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
//document.body.insertBefore(this.canvas, document.body.childNodes[0]);  


class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 7;
        this.h = 10;
        this.ySpeed = 0;
        this.xSpeed = -1.5;
        this.forward = 0;
        this.price = Math.round(Math.random()*8000+1000);
        this.ogPrice = this.price;
        this.months=0;
    }
    show() {
       // console.log('showing!!!')
        c.beginPath();
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
        c.stroke();
    }
    update() {
        this.y -= this.ySpeed;
        this.x -= this.forward;
        this.ySpeed += gravity;
        if(this.y <= 50) {
            this.ySpeed = -this.ySpeed;
        }
        if(this.y >= 110) {
            this.ySpeed = 0;
            this.forward = 0;
            this.x = 100;
            canJump = true;
        }
        else {
            canJump = false;
        }
    }
}

class Obstacle {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.w = 2;
        this.h = Math.round(Math.random()*300+10);
        this.price = Math.ceil((this.h+1)/10)*10;
    }
    show() {
        c.fillStyle='gray';
        c.fillRect(this.x, 85, this.w, 40);
        c.fillStyle="white";
        c.fillText("$" + this.price, this.x-10, this.y+35);
    }
    update() {
        if(this.x < p.x + p.w && this.x + this.w > p.x && this.y < p.y  + p.h && this.y + this.h > p.y && !gameOver) {
            console.log('hit');
            p.price -= this.price;
            c.fillStyle="black";
            c.fillText("-" + this.price, 100, 10)
            console.log(p.price);
        }
    }
}

var p;
var gravity = 0.1;
var canJump = true;
var obstacles = [];
var obstacleX = 200;
var obstacleHeight = 30;
var gameOver;
var run = true;
window.onload = function() {
    if(run) {
    runGame();
    setInterval(update, 10);
    }
}

function start(btn) {
    btn.style.display='none';
    run = true;
}

function runGame() {
    p = new Player(100, 110); 
    p.show();

    for(let i = 0; i < 500; i++) {
        var r = new Obstacle(obstacleX, 100, obstacleHeight);
        obstacles.push(r);
        obstacleX += 200;
        obstacleHeight += 10;
    }
}

function update() {
    canvas.width=canvas.width;
    c.fillStyle = "green"
    c.beginPath();
    c.fillStyle = "green"
    c.fillRect(0, 125, screen.width, 40);
    c.stroke();
    //player
    p.show();
    p.update();
    c.fillStyle = "green";
    c.fillText("$" + p.price, 5, 10);
    for(let i = 0; i < 500; i++) {
        obstacles[i].show();
        obstacles[i].x += p.xSpeed;
        obstacles[i].update();
        if(obstacles[i] <= 0) {
            obstacles[i].x = 200;
        }
    }
    if(p.price <= 0) {
        p.xSpeed = 0;
        c.fillStyle='black';
        c.font = "40 px Verdana";
        c.fillText('Game Over!', 100, 10);
        c.fillText('Original price: ' + p.ogPrice, 100, 30)
        c.fillText('You lasted for ' + p.months + ' months', 100, 50)
        gameOver = true;
        p.price = 0;
    }
}

function keyDown(e) {
    var key = e.keyCode;
    if(key === 39) {

    }
}

function keyUp(e) {
    var key = e.keyCode;
    if(key === 38 && canJump && !gameOver) {
        p.ySpeed = 4;
        p.forward= -0.15;
    }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;

function changeSpeed() {
   // p.xSpeed -= 0.1;
}
setInterval(changeSpeed, 1000);

function monthIncrease() {
    if(!gameOver){
        p.months++;
    }
}
setInterval(monthIncrease, 6000);