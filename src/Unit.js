export class Unit {
    #x;
    #y;
    #color;
    #speed;

    constructor(x, y, color, speed){
        this.#x = x;
        this.#y = y;
        this.#color = color;
        this.#speed = speed;
    }

    set x(int) {this.#x = int;}
    get x() {return this.#x}
    set y(int) {this.#y = int;}
    get y() {return this.#y}
    get color() {return this.#color}
    
    renderUnit(size, ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            (this.x * size) + (size / 2),
            (this.y * size) + (size / 2),
            size / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

export class Player extends Unit {
    constructor(x, y, color, speed){
        super(x, y, color, speed);
    }

    renderUnit(size, ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            (this.x * size) + (size / 2),
            (this.y * size) + (size / 2),
            size / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}