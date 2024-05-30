const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const cactus1Img = new Image();
cactus1Img.src = 'cactus1.png';

const cactus2Img = new Image();
cactus2Img.src = 'cactus2.png';

const crowImg = new Image();
crowImg.src = 'crow.png';

var gameSpeed = 7;
const screenWidth = 1202;
const screenHeight = 200;

var timestamp = 0;
var lastTimeStamp = -70;

class Enemy {
    constructor() {
        this.posX = screenWidth;
        this.posY = screenHeight;
        this.frame = gameSpeed;
    }

    isOffScreen() {
        return this.posX + this.width * this.mag < 0;
    }
}

class Cactus extends Enemy {
    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.mag = 0.5;
        this.posY = 0;
    }

    draw(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }

    update(array) {
        this.posX -= gameSpeed;
        if (this.isOffScreen()) {
            array.shift();  // Remove the first element of the array
        }
    }
}

class Cactus1 extends Cactus {
    constructor() {
        super();
        this.width = 150;
        this.height = 100;
        this.image = cactus1Img;
        this.posY = screenHeight - (this.mag * this.height);
    }
}

class Cactus2 extends Cactus {
    constructor() {
        super();
        this.width = 100;
        this.height = 70;
        this.image = cactus2Img;
        this.posY = screenHeight - (this.mag * this.height);

    }
}

class Crow extends Cactus {
    constructor() {
        super();
        this.width = 90;
        this.height = 80;
        this.image = crowImg;
        this.posY = screenHeight - (this.mag * this.height);
        this.frame = 0;
        this.temp = 0;
        this.toggle = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.toggle ? 0 : 90, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }

    calcFrame() {
        if(this.temp % 2) this.toggle = !this.toggle;
    }

    update(array) {
        this.temp++;
        if(this.temp >= 99999999) this.temp = 0;
        this.calcFrame();
        this.posX -= gameSpeed;   
        if (this.isOffScreen()) {
            array.shift();
        }
    }
}

const cactus1Array = [];
const cactus2Array = [];
const crowArray = [];

function createRandomEnemy() {
    const randomType = Math.floor(Math.random() * 3); // 0, 1, or 2
    let enemy;
    if (randomType === 0) {
        enemy = new Cactus1();
        cactus1Array.push(enemy);
    } else if (randomType === 1) {
        enemy = new Cactus2();
        cactus2Array.push(enemy);
    } else if (randomType === 2) {
        enemy = new Crow();
        var crowProbab = Math.random() * 100;
        if (crowProbab < 50) enemy.posY = enemy.posY;
        else enemy.posY = enemy.posY - 26;
        crowArray.push(enemy);
    }
}

function updateEnemies() {
    cactus1Array.forEach(enemy => enemy.update(cactus1Array));
    cactus2Array.forEach(enemy => enemy.update(cactus2Array));
    crowArray.forEach(enemy => enemy.update(crowArray));
}

function drawEnemies() {
    cactus1Array.forEach(enemy => enemy.draw(context));
    cactus2Array.forEach(enemy => enemy.draw(context));
    crowArray.forEach(enemy => enemy.draw(context));
}

function startEnemyGeneration() {
    const probab = 1000 * Math.random();
    const probab2 = 2*Math.random();
    if (probab < 30 && timestamp - lastTimeStamp >= 40 && probab2 > 0) {
        lastTimeStamp = timestamp;
        createRandomEnemy();
    }
    timestamp++;
    if (timestamp >= 10000000000000) {
        timestamp = 0;
        lastTimeStamp = -70;
    }
}

function animate() {
    context.clearRect(0, 0, screenWidth, screenHeight);
    startEnemyGeneration();
    drawEnemies();
    updateEnemies();
    requestAnimationFrame(animate);
}

animate();

// Call startGame here if images are already loaded
