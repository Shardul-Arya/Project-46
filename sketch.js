var block1, block2, block3, block4, block5, block6, block7, block8, block9, block10, block11, block12, block13, block14, block15, block16
var badblock1, badblock2, badblock3, badblock4, badblock5, badblock6
var alien, alienLeftRunner, alienRightRunner, alienImage, alienWalkingLeftImage, alienWalkingRightImage, alienJumpingLeftImage, alienJumpingRightImage
var backgroundImage, backgr0und
var rocket, rocketImage, rocketGroup
var portal, portalImage
var gameState
var gravity
var lives
var spikes, spikesImage
var spikesGroup

function preload() {
    backgroundImage = loadImage("Background.jpg");
    //alienWalkingImage = loadAnimation();
    alienImage = loadImage("alien.png");
    alienWalkingLeftImage = loadAnimation("alienWalkLeft1.png", "alienWalkLeft2.png");
    alienWalkingRightImage = loadAnimation("alienWalkRight1.png", "alienWalkRight2.png");
    alienJumpingLeftImage = loadImage("alienJumpLeft.png");
    alienJumpingRightImage = loadImage("alienJumpRight.png");
    rocketImage = loadImage("Rocket.png");
    spikesImage = loadImage("spike.png");
    portalImage = loadImage("Portal.png");
}

function setup() {
    createCanvas(1200, 700)
    backgr0und = createSprite(600, 350, 1200, 700);
    backgr0und.addImage(backgroundImage)
    backgr0und.scale = 2.5

    rocketGroup = createGroup();

    block1 = createSprite(600, 700, 1500,20);
    block1.shapeColor = rgb(250, 50, 50)
    block2 = createSprite(500, 466, 1000, 20);
    block2.shapeColor = rgb(250, 50, 50)
    block3 = createSprite(800, 233, 1000,20);
    block3.shapeColor = rgb(250, 50, 50)
    block4 = createSprite(600, 0, 1500,20);
    block4.shapeColor = rgb(250, 50, 50)
    block5 = createSprite(0, 350, 20,700);
    block5.shapeColor = rgb(250, 50, 50)
    block6 = createSprite(1200, 350, 20,700);
    block6.shapeColor = rgb(250, 50, 50)
    block7 = createSprite(250, 655, 50, 75);
    block7.shapeColor = rgb(250, 50, 50)
    block8 = createSprite(460, 655, 50, 75);
    block8.shapeColor = rgb(250, 50, 50)
    block9 = createSprite(670, 655, 50, 75);
    block9.shapeColor = rgb(250, 50, 50)
    block10 = createSprite(880, 655, 50, 75);
    block10.shapeColor = rgb(250, 50, 50)
    block11 = createSprite(1115, 645, 150, 90);
    block11.shapeColor = rgb(250, 50, 50)
    block12 = createSprite(800, 370, 20, 20);
    block12.shapeColor = rgb(250, 50, 50)
    block13 = createSprite(650, 370, 20, 20);
    block13.shapeColor = rgb(250, 50, 50)
    block14 = createSprite(500, 370, 20, 20);
    block14.shapeColor = rgb(250, 50, 50)
    block15 = createSprite(350, 370, 20, 20);
    block15.shapeColor = rgb(250, 50, 50)
    block16 = createSprite(200, 370, 20, 20);
    block16.shapeColor = rgb(250, 50, 50)

    badblock1 = createSprite(450, 203, 20, 40);
    badblock1.shapeColor = rgb(30, 200, 0);
    badblock2 = createSprite(675, 203, 20, 40);
    badblock2.shapeColor = rgb(30, 200, 0);
    badblock3 = createSprite(900, 203, 20, 40);
    badblock3.shapeColor = rgb(30, 200, 0);
    badblock4 = createSprite(450, 30, 20, 40);
    badblock4.shapeColor = rgb(30, 200, 0);
    badblock5 = createSprite(675, 30, 20, 40);
    badblock5.shapeColor = rgb(30, 200, 0);
    badblock6 = createSprite(900, 30, 20, 40);
    badblock6.shapeColor = rgb(30, 200, 0);

    spikesGroup = createGroup();

    for(i=40;i<880;i=i+55) {
        spikes = createSprite(i, 431, 110, 70);
        spikes.addImage(spikesImage);
        spikes.scale = 0.2
        //spikes.debug = true;
        spikes.setCollider("rectangle", 0, 50, 250, 200);
        spikesGroup.add(spikes);
    }

    alien = createSprite(100, 650, 30, 50);
    //alien.addImage(alienImage);
    alien.scale = 0.6

    alienLeftRunner = createSprite(100, 6500, 30, 50);
    alienLeftRunner.scale = 0.6

    alienRightRunner = createSprite(100, 6500, 30, 50);
    alienRightRunner.scale = 0.6

    gameState = "play"
    gravity = 1
    lives = 5

    portal = createSprite(1080, 150, 50, 150);
    portal.addImage(portalImage);
    portal.scale = 0.6
}

function draw() {
    background(0);
    if (gameState === "play") {
        spawnRocket();
        alien.addImage(alienImage);
        alienLeftRunner.addAnimation("cat", alienWalkingLeftImage);
        alienRightRunner.addAnimation("cat2", alienWalkingRightImage);
        alien.velocityY = alien.velocityY+1

        if (keyDown(LEFT_ARROW)) {
            alien.x = alien.x - 7
            alienLeftRunner.x = alien.x
            alienLeftRunner.y = alien.y
        }

        if (keyWentUp(LEFT_ARROW)) {
            alienLeftRunner.x = 100
            alienLeftRunner.y = 6500
        }

        if (keyDown(RIGHT_ARROW)) {
            alien.x = alien.x + 7
            alienRightRunner.x = alien.x
            alienRightRunner.y = alien.y
        }

        if (keyWentUp(RIGHT_ARROW)) {
            alienRightRunner.x = 100
            alienRightRunner.y = 6500
        }

        if (keyDown(UP_ARROW)) {
            alien.velocityY = -12 + gravity
            //alien.addImage(alienJumpingImage);
            gravity = gravity + 0.5
            if (alien.isTouching(block1) && alien.y < 700) {
                gravity = 1
            }
            if (alien.isTouching(block2) && alien.y < 466) {
                gravity = 1
            }
            if (alien.isTouching(block3) && alien.y < 233) {
                gravity = 1
            }
            if (alien.isTouching(block7) && alien.y < 650) {
                gravity = 1
            }
            if (alien.isTouching(block8) && alien.y < 650) {
                gravity = 1
            }
            if (alien.isTouching(block9) && alien.y < 650) {
                gravity = 1
            }
            if (alien.isTouching(block10) && alien.y < 650) {
                gravity = 1
            }
            if (alien.isTouching(block11) && alien.y < 650) {
                gravity = 1
            }
            if (alien.isTouching(block12) && alien.y < 350) {
                gravity = 1
            }
            if (alien.isTouching(block13) && alien.y < 350) {
                gravity = 1
            }
            if (alien.isTouching(block14) && alien.y < 350) {
                gravity = 1
            }
            if (alien.isTouching(block15) && alien.y < 350) {
                gravity = 1
            }
            if (alien.isTouching(block16) && alien.y < 350) {
                gravity = 1
            }
            if (alien.isTouching(block2) && alien.y > 466) {
                gravity = gravity + 10
            }
            if (alien.isTouching(block3) && alien.y > 233) {
                gravity = gravity + 10
            }
            if (alien.isTouching(block4)) {
                gravity = gravity + 10
            }
            if (keyDown(LEFT_ARROW)) {
                alien.addImage(alienJumpingLeftImage);
            }
            if (keyDown(RIGHT_ARROW)) {
                alien.addImage(alienJumpingRightImage);
            }
        }
        if (keyWentUp(UP_ARROW)) {
            alien.velocityY = 0
        }

        if (alien.isTouching(rocketGroup)) {
            lives = lives - 1
            alien.x = 100
            alien.y = 650
            rocketGroup.destroyEach();
        }

        if (alien.isTouching(spikesGroup)) {
            lives = lives - 1
            alien.x = 950
            alien.y = 450
            rocketGroup.destroyEach();
        }

        if (alien.isTouching(badblock1) || alien.isTouching(badblock2) || alien.isTouching(badblock3) || alien.isTouching(badblock4) || alien.isTouching(badblock5) || alien.isTouching(badblock6)) {
            lives = lives - 1
            alien.x = 370
            alien.y = 180
            rocketGroup.destroyEach();
        }

        if (lives === 0) {
            gameState = "end"
        }

        if (alien.isTouching(portal)) {
            gameState = "transition"
        }

        alien.collide(block1);
        alien.collide(block2);
        alien.collide(block3);
        alien.collide(block4);
        alien.collide(block5);
        alien.collide(block6);
        alien.collide(block7);
        alien.collide(block8);
        alien.collide(block9);
        alien.collide(block10);
        alien.collide(block11);
        alien.collide(block12);
        alien.collide(block13);
        alien.collide(block14);
        alien.collide(block15);
        alien.collide(block16);

        alien.collide(badblock1);
        alien.collide(badblock2);
        alien.collide(badblock3);
        alien.collide(badblock4);
        alien.collide(badblock5);
        alien.collide(badblock6);

        drawSprites();

        fill("black");
        textSize(50);
        text("Lives left: " + lives, 50, 70)
    }

    if (gameState === "end") {
        background(0);
        rocketGroup.setVelocityXEach(0);
        stroke("white");
        strokeWeight(4);
        fill("black");
        textSize(50);
        text("Game Over", 500, 300);
        alienLeftRunner.x = 100
        alienLeftRunner.y = 6500
        alienRightRunner.x = 100
        alienRightRunner.y = 6500
        
        text("Press R to try again", 400, 400);
        if (keyDown("r")) {
            reset();
        }
    }

    if (gameState === "transition") {
        background(0);
        rocketGroup.setVelocityXEach(0);
        stroke("white");
        strokeWeight(4);
        fill("black");
        textSize(50);
        text("You Finished Level 1", 360, 300);
        text("For Next Level, Press E", 330, 400)
        alienLeftRunner.x = 100
        alienLeftRunner.y = 6500
        alienRightRunner.x = 100
        alienRightRunner.y = 6500

        /*
        if (keyDown("E")) {
            reset();
        }
        */
    }
}

function spawnRocket() {
    if (frameCount % 100 === 0 || frameCount<2) {
        rocket = createSprite(1250, 545, 50, 40);
        rocket.velocityX = -15;
        rocket.addImage(rocketImage);
        rocket.scale = 0.5
        rocket.lifetime=300
        rocket.setCollider("rectangle", 0, 0, 450, 180);
        rocketGroup.add(rocket);
        rocketGroup.depth = rocketGroup.depth+10
    }
}

function reset() {
    rocketGroup.destroyEach();
    rocketGroup.setVelocityXEach(-15);
    gameState = "play"
    lives = 5
    alien.x = 100
    alien.y = 650
}