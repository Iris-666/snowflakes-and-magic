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
// let magics = [];
// let m = false;
// let magicsLeftXToRight = []
// let magicsLeftXToLeft = []

let vxleft
let vxright
let vyleft
let vyright
let vleft
let vright
let prevVleft = []
let prevVright = []
// let nowvxright = 0
// let nowvyright = 0
// let nowvxleft = 0
// let nowvyleft = 0
// let positionXright;
// let positionYright;
// let positionXleft;
// let positionYleft;

let fastleft = false;
let fastright = false;
// let fast = false;
let magicsRight = []
let magicsLeft = []
let iceSound = document.getElementById('iceSound')
let lastFastTimeright;
let lastFastTimeleft;

export function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(windowWidth)
  console.log(windowHeight)
  // createCanvas(640,480);

  // stats.showPanel(0);
  // document.body.appendChild(stats.dom);

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
    scalePoses(latestPoses);
    drawPoses(latestPoses);
    stats.end();
  }

  fill('black')
  rect(0, 0, width, height)
  let t = frameCount / 60

  for (let i = 0; i < random(); i++) {
    particles.push(new makeParticle())
  }

  particles.forEach(processParticle)
  magicsRight.forEach(processMagicRight)
  magicsLeft.forEach(processMagicLeft)




  // magics.forEach(processMagic)



}

function scalePoses(poses) {
  poses.forEach(pose => {
    pose.pose.keypoints.forEach(kp => {
      // console.info('x', kp.position.x)
      kp.position.x *= width / 640;
      kp.position.y *= height / 480;
      // console.info('->', kp.position.x)
    })

  })
}

export function drawPoses(poses) {
  translate(width, 0);
  scale(-1.0, 1.0);
  if (latestPoses.length > 0) {
    if (latestPoses[0].pose.rightWrist.confidence > 0.15) {
      // console.log(latestPoses[0].pose.rightEye.confidence);
      rightprevPoseX[0] = rightprevPoseX[1]
      rightprevPoseY[0] = rightprevPoseY[1]
      rightprevPoseX[1] = latestPoses[0].pose.rightWrist.x *4
      rightprevPoseY[1] = latestPoses[0].pose.rightWrist.y *3
      console.log('x'+rightprevPoseX[1])
      console.log('y'+rightprevPoseY[1])
      fill(255,0,0)
      ellipse(rightprevPoseX[1],rightprevPoseY[1],10,10)
    }
    if (latestPoses[0].pose.leftWrist.confidence > 0.15) {
      leftprevPoseX[0] = leftprevPoseX[1]
      leftprevPoseY[0] = leftprevPoseY[1]
      leftprevPoseX[1] = latestPoses[0].pose.leftWrist.x *4
      leftprevPoseY[1] = latestPoses[0].pose.leftWrist.y *3
      fill(255,0,0)
      ellipse(leftprevPoseX[1],leftprevPoseY[1],10,10)

    }


    vxleft = leftprevPoseX[1] - leftprevPoseX[0]
    vyleft = leftprevPoseY[1] - leftprevPoseY[0]
    vxright = rightprevPoseX[1] - rightprevPoseX[0]
    vyright = rightprevPoseY[1] - rightprevPoseY[0]

    vleft = Math.sqrt(vxleft * vxleft + vyleft * vyleft)
    vright = Math.sqrt(vxright * vxright + vyright * vyright)

    prevVleft[0] = prevVleft[1]
    prevVleft[1] = vleft
    prevVright[0] = prevVright[1]
    prevVright[1] = vright





    if (vleft > 50) {
      // fast = true;
      fastleft = true
      if (streaksleft.length > 0) {
        let streakleft = streaksleft[0]
        if (!changeDirectionleft(streakleft.nowvxleft, streakleft.nowvyleft, vxleft, vyleft)) {
          streakleft.nowvxleft = vxleft
          streakleft.nowvyleft = vyleft
          streakleft.positionXleft = leftprevPoseX[1]
          streakleft.positionYleft = leftprevPoseY[1]

        }
      }

    }
    if (vright > 50) {
      // fast = true
      fastright = true;
      if (streaksright.length > 0) {
        let streakright = streaksright[0]
        if (!changeDirectionright(streakright.nowvxright, streakright.nowvyright, vxright, vyright)) {
          streakright.nowvxright = vxright
          streakright.nowvyright = vyright
          streakright.positionXright = rightprevPoseX[1]
          streakright.positionYright = rightprevPoseY[1]

        }
      }
    }

    function changeDirectionleft(nowvxleft, nowvyleft, vxleft, vyleft) {
      let prevAngleleft = atan2(nowvyleft, nowvxleft)
      let nowAngleleft = atan2(vyleft, vxleft)
      if (abs(prevAngleleft - nowAngleleft) > 60 / 180 * PI) {
        return true
      }
    }
    function changeDirectionright(nowvxright, nowvyright, vxright, vyright) {
      let prevAngleright = atan2(nowvyright, nowvxright)
      let nowAngleright = atan2(vyright, vxright)
      if (abs(prevAngleright - nowAngleright) > 90 / 180 * PI) {
        return true
      }
    }

    if (prevVright[0] > 50 && prevVright[1] < 50) {
      // console.log(prevV)
      iceSound.play()
    }
    if (prevVleft[0] > 50 && prevVleft[1] < 50) {
      // console.log(prevV)
      iceSound.play()
    }


    if (vleft > 50 && (!lastFastTimeleft || new Date() - lastFastTimeleft > 400)) {
      lastFastTimeleft = new Date();
      let streakleft = {
        cxleft: 0,
        cyleft: 0,
        nowvxleft: vxleft,
        nowvyleft: vyleft,
        positionXleft: leftprevPoseX[1],
        positionYleft: leftprevPoseY[1]
      }
      streaksleft.unshift(streakleft);
    }
    if (vright > 50 && (!lastFastTimeright || new Date() - lastFastTimeright > 400)) {
      // console.log('create streak right')
      lastFastTimeright = new Date();
      let streakright = {
        cxright: 0,
        cyright: 0,
        nowvxright: vxright,
        nowvyright: vyright,
        positionXright: rightprevPoseX[1],
        positionYright: rightprevPoseY[1],
      }
      streaksright.unshift(streakright);
    }
    if (vleft > 50) {
      lastFastTimeleft = new Date();
    }
    if (vright > 50) {
      lastFastTimeright = new Date();
    }

    if (fastright) {
      // console.log('fastright')
      streaksright.forEach(startMagicright)
      magicsRight = magicsRight.slice(0,90)
    }
    function startMagicright(streakright) {
      // console.log('start')
      for (let i = 0; i < random(5); i++) {
        magicsRight.unshift(new makeMagicright(streakright))
      }

    }
    if (fastleft) {
      streaksleft.forEach(startMakeMagicleft)
      magicsLeft=magicsLeft.slice(0,90)
    }
    function startMakeMagicleft(streakleft) {
      for (let i = 0; i < random(5); i++) {
        magicsLeft.unshift(new makeMagicleft(streakleft))

      }
    }
  }
  // drawKeypoints(poses);
  // drawSkeleton(poses);
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


function makeParticle() {
  // let initialX = 50 + 50*j
  let initialX = Math.random() * windowWidth
  let particle = {
    x: initialX,
    y: 0,
    dx: (Math.random() * 2) - 1,
    dy: Math.random() * 2+1,
    size: (Math.random() * 8) + 8
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
  // console.log(particle)

  fill(255, 250, 250, 126)
  noStroke()
  ellipse(particle.x, particle.y, particle.size, particle.size)

  for (var a = particles.length - 1; a > -1; a--) {
    if (particles[a].y > windowHeight) {
      particles.splice(a, 1);
    }
  }
}

let streaksright = [];
// let cxright = 0
// let cyright = 0
// let dxright
// let dyright
function makeMagicright(streakright) {
  console.log('make magic right')
  let magicX = streakright.positionXright + streakright.cxright
  let magicY = streakright.positionYright + streakright.cyright
  let dxright = streakright.nowvxright / 9
  let dyright = streakright.nowvyright / 9
  streakright.cxright = streakright.cxright + dxright
  streakright.cyright = streakright.cyright + dyright
  let magicRight = {
    x: magicX,
    y: magicY,
    size: (Math.random() * 8) + 8,
    magicdx: (Math.random()) - 1,
    magicdy: Math.random() * 2,
  }
  return magicRight;

}

function processMagicRight(magicRight) {
  fill(120, 194, 196, 5)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size + 30)
  fill(120, 194, 196, 10)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size + 20)
  fill(120, 194, 196, 20)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size + 15)
  fill(120, 194, 196, 30)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size + 10)
  fill(120, 194, 196, 100)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size + 5)
  fill(120, 194, 196, 150)
  noStroke()
  circle(magicRight.x, magicRight.y, magicRight.size)
  fill(120, 194, 196, 190)
  circle(magicRight.x, magicRight.y, magicRight.size - 1)

  magicRight.magicdy = magicRight.magicdy * 0.995
  magicRight.magicdx = magicRight.magicdx * 0.995
  magicRight.x = magicRight.x + magicRight.magicdx
  magicRight.y = magicRight.y + magicRight.magicdy

  for (var i = magicsRight.length - 1; i > -1; i--) {

    if (magicsRight[i].magicdy < 0.9) {
      magicsRight.splice(i, 1);
    }
  }

  // if (sqrt(cxright*cxright+cyright*cyright)>500){
  //     fastright = false
  //     cxright = 0
  //     cyright = 0
  //     iceSound.pause();
  // }

  streaksright = streaksright.filter(streakIsNotDoneright);
  if (streaksright.length == 0) {
    iceSound.pause();
  }
  if(streaksright.length > 3){
    streaksright.splice(4,streaksright.length - 3)
  }


}

function streakIsNotDoneright(streakright) {
  return !streakIsDoneright(streakright)
}
function streakIsDoneright(streakright) {
  return sqrt(streakright.cxright * streakright.cxright + streakright.cyright * streakright.cyright) > 1000
}


// let cxleft = 0
// let cyleft = 0
// let dxleft
// let dyleft
let streaksleft = [];
function makeMagicleft(streakleft) {
  let magicX = streakleft.positionXleft + streakleft.cxleft
  let magicY = streakleft.positionYleft + streakleft.cyleft
  let dxleft = streakleft.nowvxleft / 9
  let dyleft = streakleft.nowvyleft / 9
  streakleft.cxleft = streakleft.cxleft + dxleft
  streakleft.cyleft = streakleft.cyleft + dyleft
  let magicleft = {
    x: magicX,
    y: magicY,
    size: (Math.random() * 8) + 8,
    magicdx: (Math.random()) - 1,
    magicdy: Math.random() * 2,
  }
  return magicleft;
}

function processMagicLeft(magicleft) {
  fill(120, 194, 196, 5)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size + 30)
  fill(120, 194, 196, 10)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size + 20)
  fill(120, 194, 196, 20)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size + 15)
  fill(120, 194, 196, 30)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size + 10)
  fill(120, 194, 196, 100)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size + 5)
  fill(120, 194, 196, 150)
  noStroke()
  circle(magicleft.x, magicleft.y, magicleft.size)
  fill(120, 194, 196, 190)
  circle(magicleft.x, magicleft.y, magicleft.size - 1)

  magicleft.magicdy = magicleft.magicdy * 0.995
  magicleft.magicdx = magicleft.magicdx * 0.995
  magicleft.x = magicleft.x + magicleft.magicdx
  magicleft.y = magicleft.y + magicleft.magicdy

  for (var i = magicsLeft.length - 1; i > -1; i--) {

    if (magicsLeft[i].magicdy < 0.9) {
      magicsLeft.splice(i, 1);
    }
  }

  // if (sqrt(cxleft*cxleft+cyleft*cyleft)>500){
  //     fastleft = false
  //     cxleft = 0
  //     cyleft= 0
  //     iceSound.pause();
  // }

  streaksleft = streaksleft.filter(streakIsNotDoneleft)
  if (streaksleft.length == 0) {
    iceSound.pause();
  }
  if(streaksleft.length > 3){
    streaksleft.splice(4,streaksleft.length - 3)
  }

}

function streakIsNotDoneleft(streakleft) {
  return !streakIsDoneleft(streakleft)
}
function streakIsDoneleft(streakleft) {
  return sqrt(streakleft.cxleft * streakleft.cxleft + streakleft.cyleft * streakleft.cyleft) > 1000
}



