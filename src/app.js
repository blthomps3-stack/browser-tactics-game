import { GameLoop } from "./gameloop.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const engine = new GameLoop(update, render);
engine.start();