var gameState="play";
var tower;
var towerImage;
var door;
var doorImage;
var doorGroup;
var climber;
var climberImage;
var climberGroup;
var ghost;
var ghostImage;
var invisibleBlock;
var invisibleBlockGroup;
function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}
  

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  ghost=createSprite(200,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  invisibleBlockGroup=new Group();
  doorGroup=new Group();
  climberGroup=new Group();
}
function draw(){
  background("white");
  if (gameState==="play"){
     if (tower.y>400){
    tower.y=300
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
       if(keyDown("right_arrow")){
    ghost.x=ghost.x+3
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    
  if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoors();
  drawSprites();
  }
  if (gameState==="end"){
   stroke("red") 
    fill("yellow")
    textSize(30)
    text("GAME OVER",230,250);
  }
 
}
function spawnDoors(){
  if(frameCount%250===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    invisibleBlockGroup.add(invisibleBlock);
    climberGroup.add(climber);
    doorGroup.add(door);
    
  }
}