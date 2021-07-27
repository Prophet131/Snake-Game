let startButton = document.getElementById("start");
let playerScore = document.getElementById("score");
let playerBoard = document.querySelector("#grid");
let boxes = [];
let snake = [2,1,0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let point = 0;
let timeInterval = 1000;
let timerId = 0;



function createGrid() {
    for (let i=0; i<100; i++) {
        const box = document.createElement("div");
    
        playerBoard.appendChild(box);
    
        box.classList.add("box");

        boxes.push(box);
    }
}

createGrid();

snake.forEach(index => boxes[index].classList.add("snake"));

function startGame() {
    //remove the snake
    snake.forEach(index => boxes[index].classList.remove('snake'));
    //remove the apple
    boxes[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    snake = [2,1,0];
    point = 0;
    //re add new score to browser;
    playerScore.textContent = point;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    //read the class of snake to our new currentSnake
    snake.forEach(index => boxes[index].classList.add('snake'));
    timerId = setInterval(movement, intervalTime);
}




function movement() {

    if (
        (snake[0] - width < 0 && direction === -width) ||
        (snake[0] % width === 9 && direction === 1) ||
        (snake[0] + width > 100 && direction === +width) ||
        (snake[0] % width === 0 && direction === -1) ||
        boxes[ snake[0] + direction].classList.contains("snake")
    )
    return clearInterval(timerId);


    const tail = snake.pop();
    boxes[tail].classList.remove("snake");
    snake.unshift(snake[0] + direction);
    boxes[snake[0]].classList.add("snake");

        if (boxes[snake[0]].classList.contains("apple")) {
            boxes[snake[0]].classList.remove("apple")
            boxes[tail].classList.add("snake")
            snake.push(tail);
            generateApple();
            point++ ;
            playerScore.textContent = point;
            clearInterval(timerId);
            timeInterval = timeInterval * 0.8;
            timerId = setInterval(movement, timeInterval);
        }



}


function generateApple() {

    do {
        appleIndex = Math.floor(Math.random()*boxes.length);
    } while (boxes[appleIndex].classList.contains("snake"))
    boxes[appleIndex].classList.add("apple");
}

generateApple();



document.addEventListener("keydown", control);

function control(e) {
    if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 38) {
        direction = -width;
    } else if (e.keyCode === 39) {
        direction = 1;
    } else if (e.keyCode === 40) {
        direction = +width;
    }
}

startButton.addEventListener("click", startGame);