var bg
var bottomGround, topGround
var balloon, balloonImg
var building1Img, building2Img, lampImg
var birdImg, ObsTop

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

building1Img = loadImage("assets/obsBottom1.png");
building2Img = loadImage("assets/obsBottom3.png");
lampImg = loadImage("assets/obsBottom2.png");
birdImg = loadImage("assets/obsTop2.png");
ObsTop = loadImage("assets/obsTop1.png")

jumpSoung = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");
}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

ObsBottomGroup = new Group();
ObsTopGroup = new Group();
barGroup = new Group();



}

function draw() {
  
  background("black");


  if (gameState === PLAY){
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           Bar();

           spawnObstaclesTop();
           spawnObstaclesBottom();

  if (ObsTopGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching (bottomGround) || ObsBottomGroup.isTouching(balloon)){
    gameState = END;
    dieSound.play;
  }
}

        drawSprites();
        
}

function spawnObstaclesTop(){
  if(World.frameCount % 60 === 0){
    obstacleTop = createSprite(400, 70, 40, 50);
     obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;
    obstacleTop.addImage(ObsTop);
    obstacleTop.addImage(birdImg);

    obstacleTop.y = Math.round(random(10,200));

    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacleTop.addImage(birdImg);
              break;
      case 2: obstacleTop.addImage(ObsTop);
              break;      
      default: break;
    }

    obstacleTop.lifetime = 100;
    balloon.depth = balloon.depth + 1;
    ObsTopGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom(){
  if(World.frameCount % 60 === 0){
    obstacleBottom = createSprite(400, 350, 40, 50);
    obstacleBottom.addImage(building1Img);
    obstacleBottom.scale = 0.05;
    obstacleBottom.velocityX = -4;

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstalceBottom.addImage(building1Img);
              break;
      case 2: obstacleBottom.addImage(lampImg);
              break;
      case 3: obstacleBottom.addImage(building2Img);
              break;
      default: break;
    } 

    obstacleBottom.lifetime = 100;
    balloon.depth = balloon.depth + 1;

    ObsBottomGroup.add(obstacleBottom);
  }
}

function Bar(){

  if(World.framecount % 60 === 0){
    var bar = createSprite(400, 200, 10, 800);
    bar.velocityX = -6;
    bar.lifetime = 70;
    bar.depth = balloon.depth;
    bar.visible = false;
    
    barGroup.add(bar);

  }
}