const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
var gameSpeed = 7;
const screenHeight = 200;
const screenWidth = 1202;

const dinoRun = new Image();
dinoRun.src = 'dinoRun.png';
const dinoDuck = new Image();
dinoDuck.src = 'dinoDuck.png';

class Dino {
    constructor(){
        this.width = 0;
        this.height = 0;
        this.mag = .5;
        this.posX = 50;
        this.posY = 0;
        this.temp = 0;
        this.image = null;
        this.toggle = 0;
        this.jumpflag = 0;
        this.downflag = 0;
        this.gravity = 0.5;
        this.velocity = 0;
        this.fastDescent = false;
    }
    draw(context) {
        context.drawImage(this.image, this.toggle ? 0 : this.width, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }
    update() {
        if (this.temp % 5 == 0) this.toggle = !this.toggle;
        if (this.temp > 9999999) this.temp = 0;
        this.temp++;

        if (this.jumpflag) {
            if (this.fastDescent) {
                this.velocity -= this.gravity * 4;  // Faster descent
            } else {
                this.velocity -= this.gravity;
            }
            this.posY -= this.velocity;
            if (this.posY >= screenHeight - this.height * this.mag) {
                this.posY = screenHeight - this.height * this.mag;
                this.velocity = 0;
                this.jumpflag = 0;
                this.fastDescent = false;
            }
        }
    }
}

class DinoRun extends Dino {
    constructor() {
        super();
        this.width = 172 / 2;
        this.height = 90;
        this.posY = screenHeight - this.height * this.mag;
        this.image = dinoRun;
    }
}

class DinoDuck extends Dino {
    constructor() {
        super();
        this.width = 232 / 2;
        this.height = 54;
        this.posY = screenHeight - this.height * this.mag;
        this.image = dinoDuck;
    }
}

let currentDino = new DinoRun();

function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
        if (!currentDino.jumpflag) {
            currentDino.jumpflag = 1;
            currentDino.velocity = 10;  // Set an initial velocity for the jump
        }
    }
    if (event.key === "ArrowDown") {
        if (currentDino.jumpflag) {
            currentDino.fastDescent = true;  // Enable fast descent
        } else if (!(currentDino instanceof DinoDuck)) {
            currentDino = new DinoDuck();
        }
    }
}

function handleKeyUp(event) {
    if (event.key === "ArrowDown") {
        function handleKeyDown(event) {
            if (event.key === "ArrowUp") {
                if (!currentDino.jumpflag) {
                    currentDino.jumpflag = 1;
                    currentDino.velocity = 10;  // Set an initial velocity for the jump
                }
            }
            if (event.key === "ArrowDown") {
                if (currentDino.jumpflag) {
                    currentDino.fastDescent = true;  // Enable fast descent
                } else if (!(currentDino instanceof DinoDuck)) {
                    currentDino = new DinoDuck();
                }
            }
        }
        
        function handleKeyUp(event) {
            if (event.key === "ArrowDown") {
                if (currentDino instanceof DinoDuck) {
                    currentDino = new DinoRun();
                }
                currentDino.fastDescent = false;  // Disable fast descent when the key is released
            }
        }
        
        function handleTouchStart(event) {
            // Check if the touch occurred on the canvas element
            const canvasRect = canvas.getBoundingClientRect();
            const touchX = event.touches[0].clientX - canvasRect.left;
            const touchY = event.touches[0].clientY - canvasRect.top;
            
            if (touchX >= 0 && touchX <= canvas.width && touchY >= 0 && touchY <= canvas.height) {
                // Simulate the "ArrowUp" key press for jumping
                handleKeyDown({ key: "ArrowUp" });
            }
        }
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        canvas.addEventListener('touchstart', handleTouchStart);
           if (currentDino instanceof DinoDuck) {
            currentDino = new DinoRun();
        }
        currentDino.fastDescent = false;  // Disable fast descent when the key is released
    }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);


// enemies 

const cactus1Img = new Image();
cactus1Img.src = 'cactus1.png';

const cactus2Img = new Image();
cactus2Img.src = 'cactus2.png';

const crowImg = new Image();
crowImg.src = 'crow.png';

var timestamp = 0;
var lastTimeStamp = -70;

class Enemy {
    constructor() {
        this.posX = screenWidth;
        this.posY = screenHeight;
        this.width;
        this.height;
        this.mag;
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

function isCollision(dinoX, dinoY, dinoW, dinoH, enemyX, enemyY, enemyW, enemyH) {
    const topLeft = { x: dinoX, y: dinoY };
    const topRight = { x: dinoX + dinoW, y: dinoY };
    const bottomLeft = { x: dinoX, y: dinoY + dinoH };
    const bottomRight = { x: dinoX + dinoW, y: dinoY + dinoH };

    // Check if any of the four points of the dinosaur rectangle are inside the enemy rectangle
    if (isPointInsideRect(topLeft, enemyX, enemyY, enemyW, enemyH) ||
        isPointInsideRect(topRight, enemyX, enemyY, enemyW, enemyH) ||
        isPointInsideRect(bottomLeft, enemyX, enemyY, enemyW, enemyH) ||
        isPointInsideRect(bottomRight, enemyX, enemyY, enemyW, enemyH)) {
        return true;
    }
    
    // Check if any of the four points of the enemy rectangle are inside the dinosaur rectangle
    if (isPointInsideRect({ x: enemyX, y: enemyY }, dinoX, dinoY, dinoW, dinoH) ||
        isPointInsideRect({ x: enemyX + enemyW, y: enemyY }, dinoX, dinoY, dinoW, dinoH) ||
        isPointInsideRect({ x: enemyX, y: enemyY + enemyH }, dinoX, dinoY, dinoW, dinoH) ||
        isPointInsideRect({ x: enemyX + enemyW, y: enemyY + enemyH }, dinoX, dinoY, dinoW, dinoH)) {
        return true;
    }
    
    return false;
}

function isPointInsideRect(point, rectX, rectY, rectW, rectH) {
    return point.x >= rectX && point.x <= rectX + rectW && point.y >= rectY && point.y <= rectY + rectH;
}

function dinoCollision(currentDino) {
    // Check collision with all enemies in cactus1Array
    if (cactus1Array.some(enemy =>
        isCollision(
            currentDino.posX, currentDino.posY, currentDino.width * currentDino.mag*.6, currentDino.height * currentDino.mag*.6,
            enemy.posX, enemy.posY, enemy.width * enemy.mag*.6, enemy.height * enemy.mag*.6
        )
    )) {
        return true;
    }

    // Check collision with all enemies in cactus2Array
    if (cactus2Array.some(enemy =>
        isCollision(
            currentDino.posX, currentDino.posY, currentDino.width * currentDino.mag*.6, currentDino.height * currentDino.mag*.6,
            enemy.posX, enemy.posY, enemy.width * enemy.mag*.6, enemy.height * enemy.mag*.6
        )
    )) {
        return true;
    }

    // Check collision with all enemies in crowArray
    if (crowArray.some(enemy =>
        isCollision(
            currentDino.posX, currentDino.posY, currentDino.width * currentDino.mag*.6, currentDino.height * currentDino.mag*.6,
            enemy.posX, enemy.posY, enemy.width * enemy.mag*.6, enemy.height * enemy.mag*.6
        )
    )) {
        return true;
    }

    // If no collision with any enemy, return false
    return false;
}


function animate() {

    if (dinoCollision(currentDino)) {
        return;
    }

    context.clearRect(0, 0, screenWidth, screenHeight);
    currentDino.draw(context);
    currentDino.update();

    startEnemyGeneration();
    drawEnemies();
    updateEnemies();

    requestAnimationFrame(animate);
}

let gameValue = 1;

addEventListener('keypress' && !gameValue, animate);

animate();
document.getElementById('jumpButton').addEventListener('click', () => {
    handleKeyDown({ key: "ArrowUp" });
});

document.getElementById('duckButton').addEventListener('click', () => {
    handleKeyDown({ key: "ArrowDown" });
});
