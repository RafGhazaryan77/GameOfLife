let LivingCreature = require("./LivingCreature")

module.exports = class Bomb extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 10;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates();
        
        return super.chooseCell(char);
        
    }
    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell && this.energy > 5) {
            let newX = newCell[0];
            let newY = newCell[1];

            let bomb = new Bomb(newX, newY);
            matrix[newY][newX] = 6;
            bombArr.push(bomb);

            this.energy = 10;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(4);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1)
                }
            }

            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            if (this.energy > 30) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;

           
            this.x = newX;
            this.y = newY;

            this.energy--

            if (this.energy < 0) {
                this.die()
            }
        } 
    }
    die() {
        for (let i = 0; i < bombArr.length; i++) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}