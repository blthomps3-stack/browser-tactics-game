import { GameLoop } from "./gameloop.js";
import { Unit, Player } from "./Unit.js";
import { GridPoint, getMoveRange } from "./Grid.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 40;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 10;

const baseGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function generateGrid() {
    let grid = new Array(MAP_WIDTH);
    for(let i = 0; i < MAP_WIDTH; i++){
        grid[i] = new Array(MAP_HEIGHT);
        for(let j = 0; j < MAP_HEIGHT; j++){
            grid[i][j] = new GridPoint(i, j);
            if(baseGrid[i][j] == 1){
                grid[i][j].contains = 1;
            }
        }
    }

    for(let i = 0; i < MAP_WIDTH; i++){
        for(let j = 0; j < MAP_HEIGHT; j++){
            if(i != 0){
                grid[i][j].neighbors.push(grid[i-1][j]);
            }
            if(j != 0) {
                grid[i][j].neighbors.push(grid[i][j-1]);
            }
            if(i != MAP_WIDTH-1){
                grid[i][j].neighbors.push(grid[i+1][j]);
            }
            if(j != MAP_HEIGHT -1) {
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

const player = new Player(2, 5, '#652886', 4);
roomGrid[player.x][player.y].contains = player;
const units = [player];

function moveUnit(unit, x, y){
    if(!roomGrid[x][y].contains){
        roomGrid[unit.x][unit.y].contains = 0;
        unit.x = x;
        unit.y = y;
        roomGrid[x][y].contains = unit;
    }
}

let selection = null;
let controlMode = "Default"; // 3 planned modes are Default, Info, and Action (info and action are merged currently)
let currentRange = [];

canvas.addEventListener("click", function(e) {
    let mouseX = Math.floor(e.offsetX / TILE_SIZE);
    let mouseY = Math.floor(e.offsetY / TILE_SIZE);

    // console.log(`(${mouseX}, ${mouseY})`)
    if (controlMode === "Default") {
        if(roomGrid[mouseX][mouseY].contains !== 0 && roomGrid[mouseX][mouseY].contains !== 1){
            selection = roomGrid[mouseX][mouseY].contains;
            controlMode = "Action";
            currentRange = getMoveRange(roomGrid, selection);
        }
    } else if (controlMode === "Action") {
        if(currentRange.includes(roomGrid[mouseX][mouseY])){
            moveUnit(player, mouseX, mouseY);
            currentRange = [];
        }
    }
});

function update(deltaTime) {}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let col = 0; col < MAP_WIDTH; col++){
        for(let row = 0; row < MAP_HEIGHT; row++){
            ctx.fillStyle = roomGrid[col][row].contains === 1 ? "#333" : "#eee"
            ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE -1, TILE_SIZE -1);
        }
    }
    
    for(let i = 0; i < currentRange.length; i++){
        ctx.fillStyle = "#4b7cd0";
        ctx.fillRect(currentRange[i].x * TILE_SIZE, currentRange[i].y * TILE_SIZE, TILE_SIZE -1, TILE_SIZE -1);
    }

    units.forEach((unit) => unit.renderUnit(TILE_SIZE, ctx));
}

canvas.width = TILE_SIZE * MAP_WIDTH;
canvas.height = TILE_SIZE * MAP_HEIGHT;
const engine = new GameLoop(update, render);
engine.start();