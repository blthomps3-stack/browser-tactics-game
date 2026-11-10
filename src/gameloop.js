export class GameLoop{
    constructor(updateCallback, renderCallback) {
        this.LastTime = 0;
        this.update = updateCallback;
        this.render = renderCallback;
        this.isRunning = false;
    }
    start() {
        this.isRunning = true;
        this.LastTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }
    loop(currentTime) {
        if(!this.isRunning) return;
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        const clampedDelta = Math.min(deltaTime, 0.1);
        this.update(clampedDelta);
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }
}