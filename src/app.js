import { GameLoop } from "./gameloop.js";
import { Unit, Player } from "./Unit.js";
import { GridPoint, getMoveRange } from "./Grid.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 10;

const baseGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function generateGrid() {
    let grid = new Array(MAP_HEIGHT);
    for(let i = 0; i < MAP_HEIGHT; i++){
        grid[i] = new Array(MAP_WIDTH);
        for(let j = 0; j < MAP_WIDTH; j++){
            grid[i][j] = new GridPoint(i, j);
            if(baseGrid[i][j] == 1){
                grid[i][j].contains = 1;
            }
        }
    }

    for(let i = 0; i < MAP_HEIGHT; i++){
        for(let j = 0; j < MAP_WIDTH; j++){
            if(i != 0){
                grid[i][j].neighbors.push(grid[i-1][j]);
            }
            if(j != 0) {
                grid[i][j].neighbors.push(grid[i][j-1]);
            }
            if(i != MAP_HEIGHT-1){
                grid[i][j].neighbors.push(grid[i+1][j]);
            }
            if(j != MAP_WIDTH -1) {
                grid[i][j].neighbors.push(grid[i][j+1]);
            }
        }
    }

    console.log(grid);

    canvas.width = TILE_SIZE * MAP_WIDTH;
    canvas.height = TILE_SIZE * MAP_HEIGHT;

    return(grid);
}

const roomGrid = generateGrid();

const player = new Player(2, 5, '#652886', 5);
const units = [player];

const moveRange = getMoveRange(roomGrid[5][2], 5);
console.log(moveRange);

function update(deltaTime) {}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let row = 0; row < MAP_HEIGHT; row++){
        for(let col = 0; col < MAP_WIDTH; col++){
            ctx.fillStyle = roomGrid[row][col].contains === 1 ? "#333" : "#eee"
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE -1, TILE_SIZE -1);
        }
    }
    
    for(let i = 0; i < moveRange.length; i++){
        ctx.fillStyle = "#4b7cd0";
        ctx.fillRect(moveRange[i].y * TILE_SIZE, moveRange[i].x * TILE_SIZE, TILE_SIZE -1, TILE_SIZE -1);
    }
    units.forEach((unit) => unit.renderUnit(TILE_SIZE, ctx));

    
}

canvas.width = TILE_SIZE * MAP_WIDTH;
canvas.height = TILE_SIZE * MAP_HEIGHT;
const engine = new GameLoop(update, render);
engine.start();