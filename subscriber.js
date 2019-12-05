const stats = new Stats();
let latestPoses = [];

let leftprevPoseX = [];
let leftprevPoseY = [];
let rightprevPoseX = [];
let rightprevPoseY = [];


// let vxleftFastToLeft = false;
// let vxleftFastToRight = false;

//draw particles
let particles = [];
let magics = [];
// let m = false;
// let magicsLeftXToRight = []
// let magicsLeftXToLeft = []

let vxleft
let vxright
let vyleft
let vyright
let vleft
let vright
let nowvx = 0
let nowvy = 0
let positionX
let positionY
// let fastleft = false;
// let fastright = false;
let fast = false;
let magicsToRight = []


export function setup() {
  createCanvas(640, 480);

  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  window.addEventListener('storage', (event) => {
    if (event.key === 'posenet') {
      select("#status").hide();
      latestPoses = JSON.parse(event.newValue);
    }
  });
}

export function draw() {
  stats.begin();
  clear();
  if (latestPoses) {
    drawPoses(latestPoses);
  }
  stats.end();

  fill('black')
  rect(0,0,640,480)
  let t = frameCount / 60

  for (let i = 0; i < random(2); i++) {
      particles.push (new makeParticle())
  }

  particles.forEach(processParticle) 
  magicsToRight.forEach(processMagicToRight)



  // if (m == true){
  //     for(let i = 0; i < random(5); i ++){
  //         magics.push (new makeMagic())
  //     }
  // }

  // magics.forEach(processMagic)

  // magicsLeftXToLeft.forEach(processMagicLeftXToLeft);
  // magicsLeftXToRight.forEach(processMagicLeftXToRight);


}

export function drawPoses(poses) {
  translate(width, 0);
  scale(-1.0, 1.0);
  if(latestPoses.length > 0){
    leftprevPoseX[0] = leftprevPoseX[1]
    leftprevPoseY[0] = leftprevPoseY[1]
    rightprevPoseX[0] = rightprevPoseX[1]
    rightprevPoseY[0] = rightprevPoseY[1]


    leftprevPoseX[1] = latestPoses[0].pose.leftWrist.x
    leftprevPoseY[1] = latestPoses[0].pose.leftWrist.y
    rightprevPoseX[1] = latestPoses[0].pose.rightWrist.x
    rightprevPoseY[1] = latestPoses[0].pose.rightWrist.y

    vxleft = leftprevPoseX[1] - leftprevPoseX[0]
    vyleft = leftprevPoseY[1] - leftprevPoseY[0]
    vxright = rightprevPoseX[1] - rightprevPoseX[0]
    vyright = rightprevPoseY[1] - rightprevPoseY[0]

    vleft = Math.sqrt(vxleft*vxleft + vyleft*vyleft)
    vright = Math.sqrt(vxright*vxright + vyright*vyright)


    if (vleft > 50 ){
      fast = true;
      nowvx = vxleft
      nowvy = vyleft
      positionX = leftprevPoseX[1]
      positionY = leftprevPoseY[1]
    }else if(vright>50){
      fast = true
      nowvx = vxright
      nowvy = vyright
      positionX = rightprevPoseX[1]
      positionY = rightprevPoseY[1]
    }

    if(fast == true ){
      for(let i = 0; i < random(5); i ++){
        magicsToRight.push (new makeMagic())
        // console.log(magicsToRight)
    }
    }
  }

  

  // if(vxleftFastToRight == true){
  //   for(let i = 0; i < random(5); i ++){
  //     magicsLeftXToRight.push (new makeMagicLeftXToRight())
  // }
  // console.log('left x to right')
  // }

  // if(vxleftFastToLeft == true){
  //   for(let i = 0; i < random(5); i ++){
  //     magicsLeftXToLeft.push (new makeMagicLeftXToLeft())
  //   }



  drawKeypoints(poses);
  drawSkeleton(poses);
}

function drawKeypoints(poses) {
  poses.forEach(pose =>
    pose.pose.keypoints.forEach(keypoint => {
      if (keypoint.score > 0.2) {
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    })
  );
}

function drawSkeleton(poses) {
  poses.forEach(pose => {
    pose.skeleton.forEach(skeleton => {
      const [p1, p2] = skeleton;
      stroke(255, 0, 0);
      line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    });
  });
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

let cxtoright = 0
let cytoright = 0
let dx
let dy
 function makeMagic(){
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





