const gameSpeed = 10;
const screenWidth = 800;  // Assuming the screen width is 800

class Enemy {
    constructor() {
        this.posX = 800;
        this.posY = 28;
        this.frame = gameSpeed;
    }

    isOffScreen() {
        return this.posX + this.width * this.mag < 0;
    }
}

class Cactus1 extends Enemy {
    constructor() {
        super();
        this.width = 150;
        this.height = 100;
        this.mag = 0.5; 
        this.posY = 123;
    }

    draw(context) {
        const obj = new Image();
        obj.src = 'cactus1.png';
        context.drawImage(obj, 0, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }

    update(array) {
        this.posX -= gameSpeed;
        if (this.isOffScreen()) {
            array.shift();  // Remove the first element of the array
        }
    }
}

class Cactus2 extends Enemy {
    constructor() {
        super();
        this.width = 100;
        this.height = 70;
        this.mag = 0.5;
        this.posY = 138; 
    }

    draw(context) {
        const obj = new Image();
        obj.src = 'cactus2.png';
        context.drawImage(obj, 0, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }

    update(array) {
        this.posX -= gameSpeed;
        if (this.isOffScreen()) {
            array.shift();  // Remove the first element of the array
        }
    }
}

class Crow extends Enemy {
    constructor() {
        super();
        this.width = 90;
        this.height = 80;
        this.posY = 118;
        this.mag = 0.5;
        this.x = 0;
        this.temp = 0;
    }

    draw(context) {
        const obj = new Image();
        obj.src = 'crow.png';
        context.drawImage(obj, this.x, 0, this.width, this.height, this.posX, this.posY, this.width * this.mag, this.height * this.mag);
    }

    calcFrame() {
        if (this.temp >= 0 && this.temp < 5) return 0;
        else if (this.temp >= 5 && this.temp < 10) return 90;
        else {
            this.temp = 0;
            return 0;
        }
        
    }

    update(array) {
        this.temp++;
        this.posX -= gameSpeed;
        this.x = this.calcFrame();
        if (this.isOffScreen()) {
            array.shift();  // Remove the first element of the array
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
        var ypos = Math.random()*100;
        if(ypos < 50) enemy.posY = 82;
        else enemy.posY = 118;
        crowArray.push(enemy);
    }
}

function updateEnemies() {
    cactus1Array.forEach(enemy => enemy.update(cactus1Array));
    cactus2Array.forEach(enemy => enemy.update(cactus2Array));
    crowArray.forEach(enemy => enemy.update(crowArray));
}

function drawEnemies(context) {
    cactus1Array.forEach(enemy => enemy.draw(context));
    cactus2Array.forEach(enemy => enemy.draw(context));
    crowArray.forEach(enemy => enemy.draw(context));
}

function startEnemyGeneration() {
    function scheduleNextEnemy() {
        createRandomEnemy();
        const nextTime = Math.random() * (4000 - 1500) + 1500; // Random time between 1.5s and 4s
        setTimeout(scheduleNextEnemy, nextTime);
    }
    scheduleNextEnemy();
}

yCoordinate1 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 111, 111, 112, 112, 113, 113, 114, 114, 115, 115, 116, 116, 117, 117, 118, 118, 119, 119, 120, 120, 121, 121, 122, 122, 123, 123, 124, 124, 125, 125, 126, 126, 127, 127, 128, 128, 129, 129, 130, 130, 131, 131, 132, 132, 133, 133, 134, 134, 135, 135, 136, 136, 137, 137, 138, 138, 139, 139, 140, 140, 141, 141, 142, 142, 143, 143, 144, 144, 145, 145, 146, 146, 147, 147, 148, 148, 149, 149, 150, 150, 149, 149, 148, 148, 147, 147, 146, 146, 145, 145, 144, 144, 143, 143, 142, 142, 141, 141, 140, 140, 139, 139, 138, 138, 137, 137, 136, 136, 135, 135, 134, 134, 133, 133, 132, 132, 131, 131, 130, 130, 129, 129, 128, 128, 127, 127, 126, 126, 125, 125, 124, 124, 123, 123, 122, 122, 121, 121, 120, 120, 119, 119, 118, 118, 117, 117, 116, 116, 115, 115, 114, 114, 113, 113, 112, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 90, 88, 86, 84, 82, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 58, 56, 54, 52, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]
yCoordinate2 = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 40, 41, 41, 42, 42, 43, 43, 44, 44, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 49, 49, 48, 48, 47, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42, 42, 41, 41, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0]


window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const canvasWidth = 800;
    const canvasHeight = 200;


    const dropdown = document.getElementById('character');
    let value = dropdown.value;
    let character = new Image();
    character.src = value + '.png';
    const dimension = [
        {src: 'dinoRun', w: 172 / 2, h: 90}, 
        {src: 'duck', w: 232 / 2, h: 54}, 
    ];

    let grond1 = new Image();
    grond1.src = 'ground1.png';
    let grond2 = new Image();
    grond2.src = 'ground2.png';
    
    let px, py;
    function setDimensions(value) {
        for (let i = 0; i < dimension.length; i++) {
            if (dimension[i].src === value) {
                px = dimension[i].w;
                py = dimension[i].h;
                break;
            }
        }
    }
    setDimensions(value);

    let toggle = 0; // To toggle between 0 and px
    let lastFrameChangeTime = 0;
    const frameInterval = 5;
    let x = 0;
    let y = 0;
    let y2 = 2404;
    let z = 0;
    var ycord = 0;
    function animate() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(character, toggle ? px : 0, 0, px, py, 50, canvasHeight-(py*.5)-z  , px*.5 , py*.5);
        context.drawImage(grond1, y,canvasHeight-40, 2404, 18)
        context.drawImage(grond2, y2,canvasHeight-40, 2404, 18)
        drawEnemies(context);
        updateEnemies();
        if (x - lastFrameChangeTime >= frameInterval) {
            toggle = !toggle; // Toggle between 0 and px
            lastFrameChangeTime = x;
        }
        x++;
        if(ycord <268) ycord = ycord+4 ;
        else ycord = 0;
        if(y <= -2404) y = y2 + 2404;
        else y = y - 10;
        if(y2 <= -2404) y2 = y + 2404;
        else y2 = y2 - 10; 
        requestAnimationFrame(animate);
    }

    character.onload = function() {
        animate();
        startEnemyGeneration(); 
    }
     
    dropdown.addEventListener('change', function() {
        value = dropdown.value;
        character.src = value + '.png';
        setDimensions(value);
        if(value == 'duck') z = 2;
        else z = 0;
        toggle = 0; 
    });
}
