const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var dog, dogimg, happyDog;
var database, foodS, foodStock;
var Matter;

function preload()
{
   dogimg = loadImage("images/dogImg.png");
   happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  engine = Engine.create();
    world = engine.world;

    foodStock = database.ref('food');
    foodStock.on("value",readStock);

dog = createSprite(200,200,30,30);
 dog.addImage(dogimg);


}


function draw() {  
  background(46, 139, 87);
  Engine.update(engine);

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(happyDog);
}

  drawSprites();
  //add styles here

  text ("Note: Press UP_ARROW Key To Feed Drago Milk!", 350, 30)
  textSize(5);
  fill("white")
  stroke("black")

}


function readStock(data) {
    foods = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }else{
    x = x-1;
  }
    database.ref('/').update({
        Food:x
    })
}
