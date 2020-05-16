const setupData = require('../data/config.json')
const radius = setupData.radius
const speed = setupData.speed

var interval;

function update() {

    return {
        updateHuman: (id,positions) => updateHuman(id,positions),
        updateBotWithInterval: (id,positions) => updateBotWithInterval(id,positions)
    }

}
function updateBotWithInterval(id, position) {
    setInterval(() => {
        randomizeMouse(id,position);
    },500)
    setInterval(() => {
        imitateHuman(id,position);
    }, 24);
    // var myFunc = function() {
    //     var rand = Math.random() * 1000;
    //     console.log(rand);
    //     imitateHuman(id, position);
    //     setTimeout(myFunc, rand)
    // };
    // var rand = Math.random() * 5000;
    // //console.log("rand: " + rand);
    // setTimeout(myFunc, rand)
}

function randomizeMouse(id, position) {
    position[id].mouseX = Math.random()
    position[id].mouseY = Math.random()
}

//goal of this function is to imitate human mouse
function imitateHuman(id, positions){
    const oldX = positions[id].mouseX
    const oldY = positions[id].mouseY
    const rand = Math.random();
    const angle = rand*Math.PI*2;

    const randX = Math.random();
    const randY = Math.random();

    const factorX = (randX < 0.5 ? 1-randX : randX) > 0.75 ? 1 : -1;
    const factorY = (randY < 0.5 ? 1-randY : randY) > 0.75 ? 1 : -1;

    positions[id].mouseX += factorX * Math.cos(angle);
    positions[id].mouseY += factorY * Math.sin(angle);

    if(outOfBounds(positions[id].mouseX,positions[id].w)){
        positions[id].mouseX -= 2*(factorX * Math.cos(angle));
    }
    if(outOfBounds(positions[id].mouseY,positions[id].h)){
        positions[id].mouseY -= 2*(factorY * Math.sin(angle));
    }
    for (let i = positions.length-1; i >0; i--) {
        if (i !== id) {
            if (isCollided(positions[id], positions[i])) {
                positions[id].mouseX -= 2*(factorX * Math.cos(angle));
                positions[id].mouseY -= 2*(factorY * Math.sin(angle));
            }
        }
    }

    updateHuman(id,positions)
    //console.log(distance(players[id].x - oldX, players[id].y - oldY))
}

function updateHuman(id,positions){

    const mouseX = positions[id].mouseX
    const mouseY = positions[id].mouseY

    const oldX = positions[id].x
    const oldY = positions[id].y
    var newX = oldX
    var newY = oldY

    const diffX = mouseX - oldX
    const diffY = mouseY - oldY
    const angle = Math.atan(diffY/diffX)
    const factor = diffX > 0 ? 1 : -1;

    //console.log(mouseX,mouseY)

    if(distance(diffX,diffY) > radius){

        // console.log('updated Position')

        newX += factor * speed * Math.cos(angle)
        newY += factor * speed * Math.sin(angle)

        if(outOfBounds(newX,radius)){
            newX = oldX
        }
        if(outOfBounds(newY,radius)){
            newY = oldY
        }

        positions[id].x = newX
        positions[id].y = newY

    }

}

function distance(a,b){
    return Math.sqrt(a*a+b*b)
}

function outOfBounds(c,radius){
    return c<radius || c>(1 - radius)
}
function isCollided(a,b) {
    const sum = 2 * radius + 0.005;
    const x = a.x - b.x;
    const y = a.y - b.y;
    return (sum > Math.sqrt((x * x) + (y * y)))
}

module.exports = update;
