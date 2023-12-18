let LivingCreature = require("./LivingCreature")

module.exports = class Krak extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 20;
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
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell && this.energy > 5) {
            let newX = newCell[0];
            let newY = newCell[1];

            let krak = new Krak(newX, newY);
            matrix[newY][newX] = 4;
            krakArr.push(krak);

            this.energy = 10;
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }

            matrix[newY][newX] = 4;
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

            matrix[newY][newX] = 4;
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
        for (let i = 0; i < krakArr.length; i++) {
            if (krakArr[i].x == this.x && krakArr[i].y == this.y) {
                krakArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

