const socketIo = require("socket.io")

const positionData = require('../data/position.json')
const setupData = require('../data/config.json')
const update = require('./player.js');

const player = [update()]

var stackIds = [9,8,7,6,5,4,3,2,1,0]
var botIDs = []
var playerIDs = []
var positions = []
var intervals = {}

function run(server) {

    const io = socketIo(server);

    io.on('connection', socket => {

        console.log('players length: ', positions.length);

        if(stackIds.length===10){
            initialize()
        }

        console.log('players length: ', positions.length);

        const id = stackIds.pop();
        socket.emit('init', {id: id, radius: setupData.radius});


        console.log('client ', id, ' connected');

        socket.on('mouse', data => {
            positions[id].mouseX = data.mouseX
            positions[id].mouseY = data.mouseY
            player[0].updateHuman(id,positions);
            io.sockets.emit('position', positions)
        });

        // for (let id=0; id<playerIDs.length; id++) {
        //     io.sockets.emit('gameOver', playerIDs[id].endGame)
        // }
        io.sockets.emit('gameOver', player[0].endGame(0, positions));

        socket.on('disconnect', () => {
            console.log('client ', id, ' disconnected');
            // positions[id] = {x: } //change by bot
            stackIds.push(id)
            //socket.off('id');
        });

    });

    function initialize(){
        positions = []
        for(let id=stackIds.length-1; id>=0; id--){

            const pos = {x: positionData.positions[id].x, y: positionData.positions[id].y}
            pos.mouseX = pos.x
            pos.mouseY = pos.y
            positions.push(pos)

            if (id !== 0) {
                player[0].updateBotWithInterval(id, positions)
            }

        }

    }

}

module.exports = run
