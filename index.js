const board = document.getElementById("boundary");
const boardBounds = board.getBoundingClientRect();
const borderWidth = parseInt(getComputedStyle(board).borderWidth);
const paddleHeight = document.getElementById("left-paddle").clientHeight;
const paddleSpeed = board.clientHeight / paddleHeight;
const ballWidth = document.getElementById("ball").clientWidth;
const baseSpeed = 2;

// We use to separate inputs to allow simultaneous keydowns and ups
// without overriding with 0;
let leftInput = [0, 0];
let rightInput = [0, 0];
let posLeftPaddle = 0;
let posRightPaddle = 0;
let score = { left: 0, right: 0 };

const getRandomSpeedY = () => {
    let num = 0;
    while (num === 0)
        num = Math.floor(Math.random() * 2 - 1);

    return num * baseSpeed;
};

// initiate ball with constant speed in x and 
// random y within a range.
let ball = { speedX: baseSpeed, speedY: getRandomSpeedY(), y: (boardBounds.bottom + boardBounds.top) / 2, x: (window.innerWidth - ballWidth) / 2 };

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
    ballDiv.style.top = ball.y + "px";
    ballDiv.style.left = ball.x + "px";
};

const updatePaddles = () => {
    const maxTop = board.clientHeight - paddleHeight;
    let updatedLeftTop = posLeftPaddle + (-leftInput[0] + leftInput[1]) * paddleSpeed;
    if (updatedLeftTop < 0) updatedLeftTop = 0;
    if (updatedLeftTop > maxTop) updatedLeftTop = maxTop;
    posLeftPaddle = updatedLeftTop;

    let updatedRightTop = posRightPaddle + (-rightInput[0] + rightInput[1]) * paddleSpeed;
    if (updatedRightTop < 0) updatedRightTop = 0;
    if (updatedRightTop > maxTop) updatedRightTop = maxTop;
    posRightPaddle = updatedRightTop
};

const collideLeft = () => {
    const leftPaddle = document.getElementById("left-paddle").getBoundingClientRect();

    if (ball.x <= boardBounds.left + borderWidth) return true;

    if (
        ball.x <= leftPaddle.right
        && ball.x >= leftPaddle.right - 3
        && ball.y + ballWidth > leftPaddle.top
        && ball.y < leftPaddle.bottom
    ) ball.speedX = Math.abs(ball.speedX);

    return false;
};

const collideRight = () => {
    const rightPaddle = document.getElementById("right-paddle").getBoundingClientRect();

    if (ball.x + ballWidth >= boardBounds.right - borderWidth) return true;

    if (
        ball.x + ballWidth >= rightPaddle.left
        && ball.x + ballWidth <= rightPaddle.left + 3
        && ball.y + ballWidth > rightPaddle.top
        && ball.y < rightPaddle.bottom
    ) ball.speedX = -Math.abs(ball.speedX);

    return false;
};

const updateBall = () => {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // vertical collision.
    const maxTop = boardBounds.top + borderWidth;
    const maxBottom = boardBounds.bottom - borderWidth - ballWidth;
    if (ball.y <= maxTop || ball.y >= maxBottom) ball.speedY = -ball.speedY;

    // horizontal collision.
    if (collideLeft()) {
        score.right += 1;
        document.getElementById("score-right").innerText = score.right;
        ball = { speedX: baseSpeed, speedY: getRandomSpeedY(), y: (boardBounds.bottom + boardBounds.top) / 2, x: (window.innerWidth - ballWidth) / 2 };
    } else if (collideRight()) {
        score.left += 1;
        document.getElementById("score-left").innerText = score.left;
        ball = { speedX: -baseSpeed, speedY: getRandomSpeedY(), y: (boardBounds.bottom + boardBounds.top) / 2, x: (window.innerWidth - ballWidth) / 2 };
    }


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