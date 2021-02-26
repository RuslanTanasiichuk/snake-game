'use strict'

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let button = document.getElementById("groupButton");
const windowInnerWidth = window.innerWidth
const windowInnerHeight = window.innerHeight
//button.style.height = Math.floor(windowInnerHeight * 0.3 * 0.75) + 'px';
//button.style.width = Math.floor(windowInnerHeight * 0.3 ) + 'px';

if(windowInnerHeight * 0.7 < windowInnerWidth){
    canvas.width = Math.floor(windowInnerHeight * 0.7 / 30) * 30;
    canvas.height = canvas.width;
}
else {
    canvas.width = Math.floor(windowInnerWidth  / 30) * 30;
    canvas.height = canvas.width;
}
const adgsg = '#393939';
const red = '#FF0000';
const green = '#008000';
const black = '#000000';
const gray = '#808080';
const white = '#FFFFFF';

const sizeRect = canvas.width/30;
function drawRect(x, y, colorHEX){
    let styleNow = ctx.fillStyle;
    if(colorHEX == undefined) colorHEX = black;
    ctx.fillStyle = colorHEX;
    ctx.fillRect(x, y, sizeRect, sizeRect);
    ctx.fillStyle = styleNow;
}
function drawContour(x, y, size, colorHEX){
    let styleNow = ctx.strokeStyle;
    if(colorHEX == undefined) colorHEX = gray;
    if(size == undefined) size = sizeRect;
    x++;
    y++;
    size -= 2;
    ctx.strokeStyle = colorHEX;
    ctx.strokeRect(x, y, size, size);
    ctx.strokeStyle = styleNow;
}

const snake = [ {x: sizeRect * 2, y: 0}, {x: sizeRect, y: 0} ];
drawRect(snake[1].x, snake[1].y);
drawContour(snake[1].x, snake[1].y , sizeRect);
drawRect(snake[0].x, snake[0].y, green);

const apple = {};
refreshApple();
drawRect(apple.x, apple.y, red);

document.addEventListener('keydown', handler);

function handler(event){
    if(event.code == 'ArrowLeft' && direction != 'right') direction = 'left';
    else if(event.code == 'ArrowRight' && direction != 'left') direction = 'right';
    else if(event.code == 'ArrowUp' && direction != 'down') direction = 'up';
    else if(event.code == 'ArrowDown' && direction != 'up') direction = 'down';
}

function refreshApple(){
    apple.x = Math.round(Math.random() * (canvas.width - sizeRect)/sizeRect) * sizeRect;
    apple.y = Math.round(Math.random() * (canvas.height - sizeRect)/sizeRect) * sizeRect;
    for(let i = 0; i < snake.length; i ++){
        if(snake[i].x == apple.x || snake[i].y == apple.y) refreshApple();
    }
}

function moveSnake(){
    let newBlock = {x: snake[0].x, y: snake[0].y};
    switch (direction){
        case "right":
            newBlock.x += sizeRect;
            snake.unshift(newBlock);
            break;
        case "left":
            newBlock.x -= sizeRect;
            snake.unshift(newBlock);
            break;
        case "up":
            newBlock.y -= sizeRect;
            snake.unshift(newBlock);
            break;
        case "down":
            newBlock.y += sizeRect;
            snake.unshift(newBlock);
            break;
        default:
            break;
    }
}

function show(){
    moveSnake();
    drawRect(snake[0].x, snake[0].y, green);
    drawContour(snake[1].x, snake[1].y, sizeRect, gray);
    drawRect(snake[1].x, snake[1].y);
    drawContour(snake[1].x, snake[1].y, sizeRect, gray);

    if(snake[0].x == apple.x && snake[0].y == apple.y){
        console.log("snake x: " + snake[0].x + " Apple x: " + apple.x );
        console.log("snake y: " + snake[0].y + " Apple y: " + apple.y );
        refreshApple();
        drawRect(apple.x, apple.y, red);
        drawContour(apple.x, apple.y, sizeRect, gray);
    }
    else {
        ctx.clearRect(snake[snake.length - 1].x, snake[snake.length - 1].y, sizeRect, sizeRect);
        snake.pop();
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            clearInterval(timerId);
            alert('Game Over');
            alert('Apples : ' + snake.length);
        }
    }
    if(snake[0].x >= canvas.width || snake[0].y >= canvas.height || snake[0].x < 0 || snake[0].y < 0){
        clearInterval(timerId);
        alert('Game Over');
        alert('Apples : ' + snake.length);
    }
}

let timerId = setInterval(show, 400);