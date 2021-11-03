const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 5;

//set size rắn
let tailCount = 20; //do set width = 400 nên set khối rắn= 20
let tailSize = canvas.width / tailCount - 1; //khoảng cách từng khúc thân

//set tọa độ rắn
let headX = 10; 
let headY = 15; 
const snakeParts = []; // hàm khởi tạo 1 mảng rỗng, khi push vào thì mảng dài ra
let tailLength = 0; // cho đuôi = 0

//set tọa độ ban đầu của táo
let appleX = 5;
let appleY = 5;

let inputsXVel = 0;
let inputsYVel = 0;

let xVel = 0;
let yVel = 0;

let score = 0;


//game loop
function drawGame() {
  xVel = inputsXVel;
  yVel = inputsYVel;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();

  // khi điểm số tăng lên thì tốc độ cũng tăng
  if (score > 5) {
    speed = 8;
  }
  if (score > 10) {
    speed = 11;
  }
  if (score > 15) {
    speed = 14;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVel === 0 && xVel === 0) {
    return false;
  }

  //va chạm tường thì game over
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tailCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tailCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Tahoma";
    ctx.fillText("Game Over!", canvas.width / 5, canvas.height / 2);
  }

  return gameOver;
}

// tính điểm
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Tahoma";
  ctx.fillText("SCORE : " + " " + score, canvas.width - 55, 10);
}

// clear background thành màu đen
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "lightyellow";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tailCount, part.y * tailCount, tailSize, tailSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); //thêm 1 ô vào thân rắn
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // loại bỏ nếu dài hơn kích thước đuôi
  }

  ctx.fillStyle = "yellow";
  ctx.fillRect(headX * tailCount, headY * tailCount, tailSize, tailSize);
}

//và gán lại giá trị
function changeSnakePosition() {
  headX = headX + xVel;
  headY = headY + yVel;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tailCount, appleY * tailCount, tailSize, tailSize);
}
//phương thức check, thêm đuôi, cộng điểm và tạo food random
function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tailCount);
    appleY = Math.floor(Math.random() * tailCount);
    tailLength++;
    score++;
  }
}

//add sự kiện bàn phím để di chuyển rắn
document.addEventListener("keydown", keyDown);

function keyDown(event) {
  //đi lên
  if (event.keyCode == 38) {

    if (inputsYVel == 1) return;
    inputsYVel = -1;
    inputsXVel = 0;
  }

  //đi xuống
  if (event.keyCode == 40) {

    if (inputsYVel == -1) return;
    inputsYVel = 1;
    inputsXVel = 0;
  }

  //sang trái
  if (event.keyCode == 37) {

    if (inputsXVel == 1) return;
    inputsYVel = 0;
    inputsXVel = -1;
  }

  //sang phải
  if (event.keyCode == 39) {

    if (inputsXVel == -1) return;
    inputsYVel = 0;
    inputsXVel = 1;
  }
}

drawGame();