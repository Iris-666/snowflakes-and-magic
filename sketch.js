
let particles = []
let magics = []
// let m = false
let mousePositionX = []
let mousePositionY = []

let vx
let vy
let v
let nowvx = 0
let nowvy = 0
let positionX
let positionY

// let vxFastToLeft = false;
// let vxFastToRight = false;
let fast = false;

// let magicsXToRight = []
// let magicsXToLeft = []
let magicsToRight = []

export function setup() {
    createCanvas(windowWidth,windowHeight)
    
}

export function draw() {
    fill('black')
    rect(0,0,windowWidth,windowHeight)
    // background(bg)
    let t = frameCount / 60

    for (let i = 0; i < random(2); i++) {
        particles.push (new makeParticle())
    }

    particles.forEach(processParticle) 


    // magics.forEach(processMagic)

    mousePositionX[0] = mousePositionX[1]
    mousePositionY[0] = mousePositionY[1]

    mousePositionX[1] = mouseX
    mousePositionY[1] = mouseY

    vx = mousePositionX[1] - mousePositionX[0]
    vy = mousePositionY[1] - mousePositionY[0]

    v = Math.sqrt(vx*vx + vy*vy)

    // magicsXToLeft.forEach(processMagicXToLeft)
    // magicsXToRight.forEach(processMagicXToRight)
    magicsToRight.forEach(processMagicToRight)

    // if(vx > 50){
    //     vxFastToRight = true;
    //     console.log(vx+'right')
    // }
    // if(vx < -50){
    //     vxFastToLeft = true;
    //     console.log(vx+'left')
    // }

    if(v > 35){
        fast = true;
        nowvx = vx
        nowvy = vy
        // console.log(v)
        positionX = mouseX
        positionY = mouseY
    }

    if(fast == true){
        for(let i = 0; i < random(5); i ++){
            magicsToRight.push (new makeMagicToRight())
            // console.log(magicsToRight)
        }
        

    }
    

    // if (vxFastToRight == true){
    //     for(let i = 0; i < random(5); i ++){
    //         magicsXToRight.push (new makeMagicXToRight())
    //     }
    // }
    // if (vxFastToLeft == true){
    //     for(let i = 0; i < random(5); i ++){
    //         magicsXToLeft.push (new makeMagicXToLeft())
    //     }
    // }




}

function makeParticle(){
    // let initialX = 50 + 50*j
    let initialX = Math.random() * 1400
    let particle = {
        x: initialX,
        y: 0,
        dx: (Math.random()*2)-1,
        dy: Math.random()*2,
        size: (Math.random() * 4) + 4
    }

    return particle
}

function processParticle(particle) {
    if (particle.x > windowWidth || particle.x < 0){
        particle.dx = -particle.dx
    }

    particle.dy = particle.dy + 0.01
    particle.dy = particle.dy * 0.995
    particle.x = particle.x + particle.dx
    particle.y = particle.y + particle.dy
    // console.log(particle)

    fill(255,250,250,126)
    noStroke()
    ellipse(particle.x,particle.y,particle.size,particle.size)
}

// export function mousePressed(){
//      m = true
// }

// let cxToRight = 0
//  function makeMagicXToRight(){
//      let magicX = mouseX + cxToRight
//      let magicY = mouseY
//      cxToRight = cxToRight + 4
//     let magicXToRight = {
//         x: magicX,
//         y: magicY,
//         size: (Math.random() * 5) + 3,
//         magicdx: (Math.random())-1,
//         magicdy: Math.random()*2,

//     }
//     return magicXToRight;
// }

// let cxToLeft = 0
//  function makeMagicXToLeft(){
//      let magicX = mouseX - cxToLeft;
//      let magicY = mouseY;
//      cxToLeft = cxToLeft + 4;
//     let magicXToLeft = {
//         x: magicX,
//         y: magicY,
//         size: (Math.random() * 5) + 3,
//         magicdx: (Math.random())-1,
//         magicdy: Math.random()*2,

//     }
//     return magicXToLeft
// }

let cxtoright = 0
let cytoright = 0
let dx
let dy
 function makeMagicToRight(){
     let magicX = positionX + cxtoright
     let magicY = positionY + cytoright
     dx = nowvx/9
     dy = nowvy/9
    //  console.log(dx)
     cxtoright = cxtoright + dx
     cytoright = cytoright + dy
    let magicToRight = {
        x: magicX,
        y: magicY,
        size: (Math.random() * 5) + 3,
        magicdx: (Math.random())-1,
        magicdy: Math.random()*2,
    }
    return magicToRight;

}


// function processMagicXToRight(magicXToRight){
//     fill(120,194,196,100)
//     noStroke()
//     circle(magicXToRight.x,magicXToRight.y,magicXToRight.size+2) 
//     fill(120,194,196,150)
//     noStroke()
//     circle(magicXToRight.x,magicXToRight.y,magicXToRight.size)
//     fill(120,194,196,190)
//     circle(magicXToRight.x,magicXToRight.y,magicXToRight.size-1)

//     magicXToRight.magicdy = magicXToRight.magicdy * 0.995
//     magicXToRight.magicdx = magicXToRight.magicdx * 0.995
//     magicXToRight.x = magicXToRight.x + magicXToRight.magicdx
//     magicXToRight.y = magicXToRight.y + magicXToRight.magicdy

//     for (var i = magicsXToRight.length-1; i > -1; i--) {

//     if (magicsXToRight[i].magicdy < 0.4) {
//         magicsXToRight.splice(i, 1);
//       }
//     }

//     if (cxToRight >= 500){
//         vxFastToRight = false
//         cxToRight = 0
//     }

// }

// function processMagicXToLeft(magicXToLeft){
//     fill(120,194,196,100);
//     noStroke();
//     circle(magicXToLeft.x,magicXToLeft.y,magicXToLeft.size+2); 
//     fill(120,194,196,150);
//     noStroke();
//     circle(magicXToLeft.x,magicXToLeft.y,magicXToLeft.size);
//     fill(120,194,196,190);
//     circle(magicXToLeft.x,magicXToLeft.y,magicXToLeft.size-1);

//     magicXToLeft.magicdy = magicXToLeft.magicdy * 0.995;
//     magicXToLeft.magicdx = magicXToLeft.magicdx * 0.995;
//     magicXToLeft.x = magicXToLeft.x + magicXToLeft.magicdx;
//     magicXToLeft.y = magicXToLeft.y + magicXToLeft.magicdy;

//     for (var i = magicsXToLeft.length-1; i > -1; i--) {

//     if (magicsXToLeft[i].magicdy < 0.4) {
//         magicsXToLeft.splice(i, 1);
//       }
//     }

//     if (cxToLeft >= 500){
//         vxFastToLeft = false;
//         cxToLeft = 0;
//     }
// }

function processMagicToRight(magicToRight){
    fill(120,194,196,5)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size+20) 
    fill(120,194,196,10)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size+15) 
    fill(120,194,196,20)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size+10) 
    fill(120,194,196,30)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size+6) 
    fill(120,194,196,100)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size+2) 
    fill(120,194,196,150)
    noStroke()
    circle(magicToRight.x,magicToRight.y,magicToRight.size)
    fill(120,194,196,190)
    circle(magicToRight.x,magicToRight.y,magicToRight.size-1)

    magicToRight.magicdy = magicToRight.magicdy * 0.995
    magicToRight.magicdx = magicToRight.magicdx * 0.995
    magicToRight.x = magicToRight.x + magicToRight.magicdx
    magicToRight.y = magicToRight.y + magicToRight.magicdy

    for (var i = magicsToRight.length-1; i > -1; i--) {

    if (magicsToRight[i].magicdy < 0.8) {
        magicsToRight.splice(i, 1);
      }
    }

    // console.log(cxtoright)

    if (cxtoright >= 500 || cxtoright <= -500){
        fast = false
        cxtoright = 0
        cytoright = 0
    }

}
