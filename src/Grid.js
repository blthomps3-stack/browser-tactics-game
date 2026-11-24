export class GridPoint {
    #x;
    #y;
    #neighbors = [];
    #contains;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#contains = 0; // empty by default
    }

    get x() { return this.#x; }
    get y() { return this.#y; }
    get neighbors() { return this.#neighbors; }
    set contains(obj) { this.#contains = obj; }
    get contains() { return this.#contains; }
}

export function getMoveRange(grid, unit){
    let start = grid[unit.x][unit.y]
    let speed = unit.speed;
    let openList = [];
    let range = [];
    start.g = 0;
    openList.push(start);

    while(openList.length > 0){
        let current = openList[0];

        if(current.g >= speed){
            return range;
        } else { range.push(current) }

        openList.shift();
        current.closed = true;
        let neighbors = current.neighbors;
        
        for(let i = 0; i < neighbors.length; i++){
            let neighbor = neighbors[i];
            if(!neighbor.closed && !neighbor.contains){
                if(!neighbor.g){
                    neighbor.g = current.g + 1;
                    openList.push(neighbor);
                } 
                else if(neighbor.g > current.g + 1){
                    neighbor.g = current.g + 1;
                }
            }
        }
    }

    return [];
}