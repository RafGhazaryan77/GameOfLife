let LivingCreature = require("./LivingCreature")

module.exports = class Jur extends LivingCreature {
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
        let found = [];

        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];

            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }

        }

        return found;
    }
    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * found.length)]

        if (newCell && this.energy > 5) {
            let newX = newCell[0];
            let newY = newCell[1];

            let grEat = new Jur(newX, newY);
            matrix[newY][newX] = 5;
            jurArr.push(grEat);

            this.energy = 10;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(4);
        let newCell = emptyCell[Math.floor(Math.random() * found.length)]

        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < krakArr.length; i++) {
                if (krakArr[i].x == newX && krakArr[i].y == newY) {
                    krakArr.splice(i, 1)
                }
            }

            matrix[newY][newX] = 5;
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
        let newCell = emptyCell[Math.floor(Math.random() * found.length)]

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[newY][newX] = 5;
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
        for (let i = 0; i < jurArr.length; i++) {
            if (jurArr[i].x == this.x && jurArr[i].y == this.y) {
                jurArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}