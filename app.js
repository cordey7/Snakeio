/** CONSTANTS **/
const CANVAS_BORDER_COLOUR = 'black';
const CANVAS_BACKGROUND_COLOUR = 'lightSeaGreen';
const SNAKE_COLOUR = 'red';
const SNAKE_BORDER_COLOUR = 'aqua';
const FOOD_COLOUR = 'blue';
const FOOD_BORDER_COLOUR = 'darkred';
let snake = [
    { x: 100, y: 50 },
    { x: 90, y: 50 },
    { x: 80, y: 50 },
    { x: 70, y: 50 },
    { x: 60, y: 50 }
]
let score = 0;
let dx = 10;
let dy = 0;
var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");
ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
ctx.strokestyle = CANVAS_BORDER_COLOUR;
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
main();
createFood();
document.addEventListener("keydown", changeDirection);
function main() {
    if (didGameEnd()) return;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, 55)
}

function clearCanvas() {
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
    ctx.strokestyle = CANVAS_BORDER_COLOUR;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function didGameEnd() {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (didCollide) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 15;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 15;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokestyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(foodX, foodY, 15, 15);
    ctx.strokeRect(foodX, foodY, 15, 15);
}

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
        score += 75;
        document.getElementById('score').innerHTML = score;
        createFood();
    } else {
        snake.pop();
    }
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, gameCanvas.width - 15);
    foodY = randomTen(0, gameCanvas.height - 15);
    snake.forEach(function isOnSnake(part) {
        if (part.x == foodX && part.y == foodY) createFood();
    });
}

function drawSnake() {
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokestyle = SNAKE_BORDER_COLOUR;
    ctx.fillRect(snakePart.x, snakePart.y, 15, 15);
    ctx.strokeRect(snakePart.x, snakePart.y, 15, 15);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}
function pause(elem) {
    if (main.status) {
        clearTimeout(main.status);
        main.status = false;
        elem.value = 'Play'
    }
    else {
        loop();
        elem.value = 'Pause';
    }
}
function restart()
{
    location.restart();
}