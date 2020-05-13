const setupData = require('../data/config.json')
const radius = setupData.radius
const speed = setupData.speed

function updateHuman(id,data,positions){

    const mouseX = data.mouseX
    const mouseY = data.mouseY

    const oldX = positions[id].x
    const oldY = positions[id].y
    var newX = oldX
    var newY = oldY
    
    const diffX = mouseX - oldX
    const diffY = mouseY - oldY
    const angle = Math.atan(diffY/diffX)
    const factor = diffX > 0 ? 1 : -1;

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

module.exports = updateHuman