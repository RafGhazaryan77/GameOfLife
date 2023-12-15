var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log('connected');
});

function matrixGenerator(matrixSize, grass, grassEater, Predator, krak,jur,bomb) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }

    for (let i = 0; i < Predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3

    }
    for (let i = 0; i < krak; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4

    }
    for (let i = 0; i < jur; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5

    }
    for (let i = 0; i < bomb; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6

    }
    return matrix
}

matrix = matrixGenerator(30, 40, 30, 15, 50, 25, 15)

io.sockets.emit("send matrix", matrix)

////charecters Array

 grassArr = [];
 grassEaterArr = [];
 predatorArr = [];
 krakArr = [];
 jurArr = [];
 bombArr = [];


 ////modules

 let Grass = require("./grass")
 let GrassEater = require("./grassEater")
 let Bomb = require("./bomb")
 let Krak = require("./krak")
 let Jur = require("./jur")
 let Predator = require("./predator")
 
 function createObject(matrix){
 for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y)
            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            var grEat = new GrassEater(x, y)
            grassEaterArr.push(grEat)
        } else if (matrix[y][x] == 3) {
            var pred = new Predator(x, y)
            predatorArr.push(pred)
        }else if (matrix[y][x] == 4) {
                var krd = new Krak(x, y)
                krakArr.push(krd)
        }
        else if (matrix[y][x] == 5) {
            var pp= new Jur(x, y)
            jurArr.push(pp)
        }else if (matrix[y][x] == 6) {
            var dd= new Bomb(x, y)
            bombArr.push(dd)
        }


    }
}

     io.sockets.emit('send matrix', matrix)

}



function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()


    }


    for (let i in predatorArr) {

        predatorArr[i].eat()
    }
    for (let i in krakArr) {
        krakArr[i].eat()
    }
    for (let i in jurArr) {
        jurArr[i].eat()
    }
    for (let i in bombArr) {
        bombArr[i].eat()
}

io.sockets.emit('send matrix', matrix)

}


setInterval(game, 500)

io.on('connection', function () {
    createObject(matrix)
})



