const socketIo = require("socket.io")

const positionData = require('../data/position.json')
const updateHuman = require('./player.js')

var stackIds = [9,8,7,6,5,4,3,2,1,0]
var positions = []

function run(server) {

    const io = socketIo(server);

    io.on('connection', socket => {

        console.log('players length: ', positions.length);

        if(stackIds.length==10){

            positions = []

            
            for(i=0; i<stackIds.length; i++){
            const pos = {x: positionData.positions[i].x, y: positionData.positions[i].y}
            positions.push(pos)
            }

            // for(i=0; i<stackIds.length; i++){
            //   console.log(positions[i])
            // }

        }

        console.log('players length: ', positions.length);

        const id = stackIds.pop();
        console.log('client ', id, ' connected');

        socket.on('mouse', data => {
            updateHuman(id,data,positions);
            io.sockets.emit('position', positions)
        })

        socket.on('disconnect', () => {
            console.log('client ', id, ' disconnected');
            // positions[id] = {x: } //change by bot
            stackIds.push(id)
        });

    })
}

module.exports = run