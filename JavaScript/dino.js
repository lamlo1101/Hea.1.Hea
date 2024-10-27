import { getCustomProperty, setCustomProperty, changeCustomProperty } from "../JavaScript/Utility.js";

const JUMP_EFFECT = new Audio('./Audios/jump.wav');
const DINO = document.getElementById('dino');
const FRAME_COUNT = 2;
const FRAME_TIME = 100;
const GRAVITY = 0.0015;
const JUMP_SPEED = 0.45; 
const RESTART_BUTTON = document.getElementById('restartButton');

let isJumping;
let frame;
let currentFrameTime;
let velocity;

export function setUpDino() {
    isJumping = false;
    frame = 0;
    currentFrameTime = 0;
    velocity = 0;
    setCustomProperty(DINO, "--bottom", 0);
    document.addEventListener('keydown', jump);
    document.addEventListener('click', Jump);
}

export function updateDino(delta, scale) {
    handleRun(delta, scale);
    handleJump(delta);
}

export function getDinoRect() {
    return DINO.getBoundingClientRect();
}  

export function loseDino() {
    DINO.src = "Images/dino-lose.png";
    RESTART_BUTTON.style.display = "block"; // Show the restart button
}

function handleRun(delta, scale) {
    if (isJumping) {
        DINO.src = "Images/dino.png";
        return;
    }

    if (currentFrameTime >= FRAME_TIME) {
        frame = (frame + 1) % FRAME_COUNT;
        DINO.src = `Images/dino-run-${frame}.png`;
        currentFrameTime -= FRAME_TIME;
    }
    currentFrameTime += delta * scale;
}

function handleJump(delta) {
    if (!isJumping) return;

    changeCustomProperty(DINO, '--bottom', velocity * delta);

    if (getCustomProperty(DINO, '--bottom') <= 0) {
        setCustomProperty(DINO, '--bottom', 0);
        isJumping = false;
    }
    velocity -= GRAVITY * delta;
}

function jump(e) {
    if (e.code != 'Space' || isJumping) return;

    velocity = JUMP_SPEED;
    isJumping = true;
    JUMP_EFFECT.play();
}

// For small devices
function Jump() {
    if (isJumping) return;

    velocity = JUMP_SPEED;
    isJumping = true;
    JUMP_EFFECT.play();
}

// Function to restart the game
function restartGame() {
    setUpDino(); // Reinitialize dino
    RESTART_BUTTON.style.display = "none"; // Hide the restart button
    // Reset game state here, e.g., score, obstacles
}

// Event listener for the restart button
RESTART_BUTTON.addEventListener('click', restartGame);