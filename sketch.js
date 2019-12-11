
let particles = []
let magics = []
let mousePositionX = []
let mousePositionY = []

let vx
let vy
let v
let prevV = []
// let nowvx = 0
// let nowvy = 0
// let positionX
// let positionY

// let vxFastToLeft = false;
// let vxFastToRight = false;
let fast = false;

// let magicsXToRight = []
// let magicsXToLeft = []
let magicsToRight = []

let lastFastTime;

let iceSound = document.getElementById('iceSound')
export function setup() {
    createCanvas(windowWidth, windowHeight)

}

export function draw() {
    fill('black')
    rect(0, 0, windowWidth, windowHeight)
    let t = frameCount / 60

    for (let i = 0; i < random(2); i++) {
        particles.push(new makeParticle())
    }

    particles.forEach(processParticle)


    // magics.forEach(processMagic)

    mousePositionX[0] = mousePositionX[1]
    mousePositionY[0] = mousePositionY[1]

    mousePositionX[1] = mouseX
    mousePositionY[1] = mouseY

    vx = mousePositionX[1] - mousePositionX[0]
    vy = mousePositionY[1] - mousePositionY[0]

    v = Math.sqrt(vx * vx + vy * vy)

    prevV[0] = prevV[1]
    prevV[1] = v

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

    if (v > 35) {
        fast = true;
        if (streaks.length > 0) {
            let streak = streaks[0]
            streak.nowvx = vx
            streak.nowvy = vy
            streak.positionX = mouseX
            streak.positionY = mouseY
        }
        // nowvx = vx;
        // nowvy = vy
        // positionX = mouseX
        // positionY = mouseY
    }

    // if(v>35 && (lastFastTime || new Date() - lastFastTime < 500)){

    // }



    if (prevV[0] > 35 && prevV[1] < 35) {
        // console.log(prevV)
        iceSound.play()
    }
    // if(prevV[0] < 35 && prevV[1] > 35){
    //     streak.cxtoright = 0
    //     streak.cytoright = 0
    // }



    if (v > 35 && (!lastFastTime || new Date() - lastFastTime > 500)) {
        // makeMagics(streak);
        lastFastTime = new Date();
        let streak = {
            cxtoright: 0,
            cytoright: 0,
            nowvx: vx,
            nowvy: vy,
            positionX: mouseX,
            positionY: mouseY,
            color: random(100),
        }
        streaks.unshift(streak);
        // console.log(streaks)
    }

    if (v > 35) {
        lastFastTime = new Date();
    }
    if (fast) {
        streaks.forEach(makeMagics)
    }


    function makeMagics(streak) {
        for (let i = 0; i < random(5); i++) {
            magicsToRight.push(new makeMagicToRight(streak))
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

function makeParticle() {
    let initialX = Math.random() * 1400
    let particle = {
        x: initialX,
        y: 0,
        dx: (Math.random() * 2) - 1,
        dy: Math.random() * 2,
        size: (Math.random() * 4) + 4
    }
    return particle
}

function processParticle(particle) {
    if (particle.x > windowWidth || particle.x < 0) {
        particle.dx = -particle.dx
    }

    particle.dy = particle.dy + 0.01
    particle.dy = particle.dy * 0.995
    particle.x = particle.x + particle.dx
    particle.y = particle.y + particle.dy

    fill(255, 250, 250, 126)
    noStroke()
    ellipse(particle.x, particle.y, particle.size, particle.size)
    for (var a = particles.length - 1; a > -1; a--) {
        if (particles[a].y > 800) {
            particles.splice(a, 1);
        }
    }
}


let streaks = [];
function makeMagicToRight(streak) {
    let magicX = streak.positionX + streak.cxtoright
    let magicY = streak.positionY + streak.cytoright
    let dx = streak.nowvx / 9
    let dy = streak.nowvy / 9
    
    streak.cxtoright = streak.cxtoright + dx
    streak.cytoright = streak.cytoright + dy
    let magicToRight = {
        x: magicX,
        y: magicY,
        size: (Math.random() * 5) + 3,
        magicdx: (Math.random()) - 1,
        magicdy: Math.random() * 2,
        color: streak.color,
    }
    // console.log(cxtoright)
    return magicToRight;
}



function processMagicToRight(magicToRight) {
    // colorMode(HSB);
    // fill(magicToRight.color, 190, 190, 100)
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
    circle(magicToRight.x, magicToRight.y, magicToRight.size - 1)

    magicToRight.magicdy = magicToRight.magicdy * 0.995
    magicToRight.magicdx = magicToRight.magicdx * 0.995
    magicToRight.x = magicToRight.x + magicToRight.magicdx
    magicToRight.y = magicToRight.y + magicToRight.magicdy

    for (var i = magicsToRight.length - 1; i > -1; i--) {
        if (magicsToRight[i].magicdy < 0.8) {
            magicsToRight.splice(i, 1);
        }
    }

    // if(streakIsDone(streak)){
    //     stopStreak(streak);
    // }

    streaks = streaks.filter(streakIsNotDone)

}
function streakIsNotDone(streak) {
    return !streakIsDone(streak)
}

function streakIsDone(streak) {
    return sqrt(streak.cxtoright * streak.cxtoright + streak.cytoright * streak.cytoright) > 500
}

// function stopStreak(streak){
//     fast = false;
//     streak.cxtoright = 0
//     streak.cytoright = 0
//     iceSound.pause();
// }