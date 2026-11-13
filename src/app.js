import { GameLoop } from "./gameloop.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 10;

const dungeonGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function generateGrid() {
    canvas.width = TILE_SIZE * MAP_WIDTH;
    canvas.height = TILE_SIZE * MAP_HEIGHT;
    return(Array(MAP_HEIGHT).fill().map(() => Array(MAP_WIDTH).fill(0)));
}

const player = {
    x: 2,
    y: 5,
    color: '#51217e'
};


function update(deltaTime) {}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < MAP_HEIGHT; row++){
        for(let col = 0; col < MAP_WIDTH; col++){
            ctx.fillStyle = dungeonGrid[row][col] === 1 ? "#333" : "#eee"
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE -1, TILE_SIZE -1);
        }
    }
    // I think in the future to render non-hardcoded entities, I can give them a function with the instructions on how to render them
    // And just iterate through the list of them here, calling each one's render function
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(
        (player.x * TILE_SIZE) + (TILE_SIZE / 2),
        (player.y * TILE_SIZE) + (TILE_SIZE / 2),
        TILE_SIZE / 2.5,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

canvas.width = TILE_SIZE * MAP_WIDTH;
canvas.height = TILE_SIZE * MAP_HEIGHT;
const engine = new GameLoop(update, render);
engine.start();