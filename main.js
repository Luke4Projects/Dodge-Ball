var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 200;
    }
    show() {
        //c.fillStyle = 'green';
        //c.fillRect(this.x, this.y, this.w, this.h);
        c.drawImage(document.getElementById("playerImg"), this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 200;
        this.xSpeed = 3;
        this.needsAdd = true;
    }
    show() {
        //c.fillStyle = 'red';
        //c.fillRect(this.x, this.y, this.r, this.r);
        c.drawImage(document.getElementById("ballImg"), this.x, this.y, this.r, this.r);

        this.x -= this.xSpeed;
    }
    update() {
        this.xSpeed = currentSpeed;
        if (p.x + p.w > this.x && p.x < this.x + 150 && p.y + p.h > this.y && p.y < this.y + this.r) {
            atDeathScreen = true;
        }
        //update score
        if (p.x > this.x && this.needsAdd) {
            score++;
            document.getElementById("showScore").innerHTML = "Score: " + score;
            this.needsAdd = false;
        }
    }
}

var p;

var balls = [];

var ballPositions = [0, 200, 400];

var atMainMenu = true;

var atDeathScreen = false;

//time is in milliseconds
var timeBetweenBallSpawn = 2000;

var currentSpeed = 3;

var score = 0;

window.onload = function() {
    this.setInterval(update, 10);
}

function start() {
    p = new Player(110, 200);

    spawnBalls();
    setInterval(decreaseSpawnTime, 2000);
    setInterval(increaseBallSpeed, 5000);
}

function update() {
    if (atMainMenu) {
        //main menu background
        c.fillStyle = 'dimgray';
        c.fillRect(0, 0, 800, 800);
        document.getElementById("showScore").style.display = "none";
    } else if (atDeathScreen) {
        document.getElementById("showScore").style.display = "none";
        //death screen background
        c.fillStyle = 'dimgray';
        c.fillRect(0, 0, 800, 800);
        //text
        document.getElementById("deathText").style.display = "block";
        //button
        document.getElementById("backToMenu").style.display = "block";
        //score
        document.getElementById("showFinalScore").style.display = "block";
        document.getElementById("showFinalScore").innerHTML = "Score: " + score;
    } else {
        document.getElementById("showScore").style.display = "block";
        //background
        c.fillStyle = 'gray';
        c.fillRect(0, 0, 800, 800);
        //player
        p.show();
        //balls
        for (let i = 0; i < balls.length; i++) {
            balls[i].show();
            balls[i].update();
        }
    }
}

function spawnBalls() {
    var pick = Math.floor(Math.random() * 3);
    var pick2 = Math.floor(Math.random() * 3);
    if (pick2 === pick) {
        pick2 = Math.floor(Math.random() * 3);
    }
    var ball = new Ball(800, ballPositions[pick]);
    var ball2 = new Ball(800, ballPositions[pick2]);
    balls.push(ball);
    balls.push(ball2);
    setTimeout(spawnBalls, timeBetweenBallSpawn)
}

function keyDown(e) {
    if (e.keyCode === 40 && p.y != 400) {
        p.y+=200;
    }
    if (e.keyCode === 38 && p.y != 0) {
        p.y-=200;
    }
}

document.onkeydown = keyDown;

function decreaseSpawnTime() {
    if (timeBetweenBallSpawn > 500) {
        timeBetweenBallSpawn-=100;
    }
}

function increaseBallSpeed() {
    currentSpeed++;
}

function play() {
    start();
    atMainMenu = false;
    document.getElementById("playButton").style.display = "none";
    document.getElementById("title").style.display = "none";
}

function backToMenu() {
    location.reload();
}