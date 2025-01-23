const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');
const backgroundMusic = document.getElementById('background-music');


let score = 0; 
let isGameOver = false; 
const scoreDisplay=document.querySelector('.score');

const startGame = () => {
    backgroundMusic.play(); 
};

const stopMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; 
};


const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const updateScore = () => {
    if (!isGameOver) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
    }
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        cloud.style.animation = 'none';
        cloud.style.left = `${cloudPosition}px`;

       
        gameOver.style.visibility = 'visible';

        isGameOver = true; 
        stopMusic();
        clearInterval(loop); 
        clearInterval(scoreInterval); 
    }
}, 10);

let scoreInterval = setInterval(updateScore, 100);

const restart = () => {
   
    gameOver.style.visibility = 'hidden';

    
    pipe.style.animation = 'pipe-animation 1s infinite linear';
    pipe.style.left = '';

    mario.src = './images/goku-dragon-ball.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = '';

    cloud.style.animation = 'clouds-animation 20s infinite linear';
    cloud.style.left = '';

    
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    isGameOver = false;

    
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './images/game-over.png';
            mario.style.width = '70px';
            mario.style.marginLeft = '35px';

            cloud.style.animation = 'none';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';
            isGameOver = true;
            clearInterval(loop);
            clearInterval(scoreInterval);
        }
    }, 10);
};

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
document.addEventListener('keydown', (event) => {
    if (!isGameOver) {
        startGame(); 
    }
});
restartButton.addEventListener('click', restart);