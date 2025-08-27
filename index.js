const paddleHeight = document.getElementById("left-paddle").clientHeight;
const boardHeight = document.getElementById("boundary").clientHeight;
const paddleSpeed = boardHeight / paddleHeight;

// We use to separate inputs to allow simultaneous keydowns and ups
// without overriding with 0;
let leftInput = [0, 0];
let rightInput = [0, 0];
let posLeftPaddle = 0;
let posRightPaddle = 0;

// TODO initiate ball with constant speed in y and 
// random in x within a range.
let ball = { speedX: 1, speedY: 1, x: boardHeight / 2, y: window.innerWidth / 2 };
console.log(ball)

// store key presses in input arrays.
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") rightInput[0] = 1;
    if (e.key === "ArrowDown") rightInput[1] = 1;
    if (e.key === "w") leftInput[0] = 1;
    if (e.key === "s") leftInput[1] = 1;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") rightInput[0] = 0;
    if (e.key === "ArrowDown") rightInput[1] = 0;
    if (e.key === "w") leftInput[0] = 0;
    if (e.key === "s") leftInput[1] = 0;
});


const render = () => {
    const leftPaddle = document.getElementById("left-paddle");
    leftPaddle.style.top = posLeftPaddle + "px";

    const rightPaddle = document.getElementById("right-paddle");
    rightPaddle.style.top = posRightPaddle + "px";

    const ballDiv = document.getElementById("ball");
    ballDiv.style.top = ball.x + "px";
    ballDiv.style.left = ball.y + "px";
};

const updatePaddles = () => {
    const maxTop = boardHeight - paddleHeight;
    let updatedLeftTop = posLeftPaddle + (-leftInput[0] + leftInput[1]) * paddleSpeed;
    if (updatedLeftTop < 0) updatedLeftTop = 0;
    if (updatedLeftTop > maxTop) updatedLeftTop = maxTop;
    posLeftPaddle = updatedLeftTop;

    let updatedRightTop = posRightPaddle + (-rightInput[0] + rightInput[1]) * paddleSpeed;
    if (updatedRightTop < 0) updatedRightTop = 0;
    if (updatedRightTop > maxTop) updatedRightTop = maxTop;
    posRightPaddle = updatedRightTop
};

const updateBall = () => {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // TODO ball should bounce on border walls and paddles.

    // TODO update score if ball touches vertical walls.

    // TODO reset game if score >9.

    // TODO predict where the ball is when x = paddle's position.
    // TODO auto move paddle according to turn.
};

const updateValues = () => {
    updatePaddles();
    updateBall();
};

setInterval(updateValues, 1);
setInterval(render, 1);