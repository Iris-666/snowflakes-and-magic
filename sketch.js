
// let particle = new Array(100).fill(0).map(makeParticle)
let particles = []
let magics = []
let m = false
// let bg

export function setup() {
    createCanvas(windowWidth,windowHeight)
    
    // bg = loadImage('frozen-background.jpg')
}

export function draw() {
    fill('black')
    rect(0,0,windowWidth,windowHeight)
    // background(bg)
    let t = frameCount / 60

    for (let i = 0; i < random(2); i++) {
        particles.push (new makeParticle())
    }
    // makeParticle(mouseX,mouseY);
    // console.log(mouseX,mouseY);

    // window.addEventListener("mousemove",makeParticle(mouseX,mouseY));
    particles.forEach(processParticle) 


    if (m == true){
        for(let i = 0; i < random(5); i ++){
            magics.push (new makeMagic())
        }
    }

    console.log(m)

    magics.forEach(processMagic)

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

    // let xFromMouse = mouseX - particle.x
    // let yFromMouse = mouseY - particle.y
    // let fromMouse = Math.sqrt(xFromMouse ** 2 + yFromMouse ** 2)
    // if (fromMouse < 100){
    //     console.info('close',fromMouse)
    //     particle.dx = particle.dx - xFromMouse * 0.01
    //     particle.dy = particle.dy - yFromMouse * 0.01

    // }
    // if (particle.y > windowHeight || particle.y < 0){
    //     particle.dy = -particle.dy
        
    // }

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

export function mousePressed(){
     m = true
}

let cx = 0
let randomx = Math.random()*800
let randomy = Math.random()*500
 function makeMagic(){
     let magicX = randomx + cx
     let magicY = randomy
     cx = cx + 4
    let magic = {
        x: magicX,
        y: magicY,
        size: (Math.random() * 5) + 3,
        magicdx: (Math.random())-1,
        magicdy: Math.random()*2,

    }
    return magic
}

function processMagic(magic){
    fill(120,194,196,100)
    noStroke()
    circle(magic.x,magic.y,magic.size+2) 
    fill(120,194,196,150)
    noStroke()
    circle(magic.x,magic.y,magic.size)
    fill(120,194,196,190)
    circle(magic.x,magic.y,magic.size-1)

    magic.magicdy = magic.magicdy * 0.995
    magic.magicdx = magic.magicdx * 0.995
    magic.x = magic.x + magic.magicdx
    magic.y = magic.y + magic.magicdy

    for (var i = magics.length-1; i > -1; i--) {

    if (magics[i].magicdy < 0.4) {
        magics.splice(i, 1);
      }
    }

    if (cx >= 500){
        m = false
        cx = 0
        randomy = random(500)
    }

}



// window.addEventListener('click',magic)