var dog,database,foodS,foodStock;
var dogImg,dogHappy;

function preload(){
  dogImg = loadImage("images/Dog.png");
  dogHappy = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    dog.scale = 0.2;
}
  drawSprites();
  fill("Cyan");
  textSize(25);
  text("Food Remaining:" + foodS,140,200);
  fill("Cyan");
  textSize(15);
  text("Note:Press UP_ARROW Key To Feed Drago Milk.",85,50);
}

function readStock(data){
  foodS =data.val();
}

function writeStock(x){

  if (x<=0) {
    x = 0;
  } else {
    x = x-1
  }

  database.ref('/').update({
    Food:x
  })
}
