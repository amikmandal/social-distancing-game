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
            positions[id].mouseX = data.mouseX
            positions[id].mouseY = data.mouseY
            player.updateHuman(id,positions);
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
            pos.mouseX = pos.x
            pos.mouseY = pos.y
            positions.push(pos)



            // if(i>=0 && i<=8){
            //     console.log('ids', i);
            //     const id = i
            //     //kill this interval later
            //     this.setInterval(() => {
            //         // console.log('ids', i);
            //         player.imitateHuman(id, positions);
            //     },30)
            // }
        }

        // this.setInterval(() => {
        //     // console.log('ids', i);
        //     player.imitateHuman(2, positions);
        // },30)




    }

}

module.exports = run