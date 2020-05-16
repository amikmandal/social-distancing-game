const socketIo = require("socket.io")

const positionData = require('../data/position.json')
const update = require('./player.js');

const player = update()

var stackIds = [9,8,7,6,5,4,3,2,1,0]
var positions = []
var intervals = {}

function run(server) {

    const io = socketIo(server);

    io.on('connection', socket => {

        console.log('players length: ', positions.length);

        if(stackIds.length==10){
            initialize()
        }

        // for(i=0; i<stackIds.length; i++){
            //   console.log(positions[i])
            // }

        console.log('players length: ', positions.length);

        const id = stackIds.pop();
        console.log('client ', id, ' connected');

        socket.on('mouse', data => {
            //player.updateHuman(id,data,positions);
            player.updateBotWithInterval(id, positions);
            io.sockets.emit('position', positions)
        })

        socket.on('disconnect', () => {
            console.log('client ', id, ' disconnected');
            // positions[id] = {x: } //change by bot
            stackIds.push(id)
        });

    })

    function initialize(){
        positions = []
        for(i=0; i<stackIds.length; i++){
            const pos = {x: positionData.positions[i].x, y: positionData.positions[i].y}
            positions.push(pos)
            // if(i!=stackIds.length-1){
            //     intervals[i] = this.setInterval(() => {
            //         imitateHuman(id, positions);
            //     },30)
            // }
        }
    }

}

module.exports = run
