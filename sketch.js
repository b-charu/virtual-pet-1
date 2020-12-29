//Create variables here
var dogImg,dogImg1;
var database;
var food,foodStock;

function preload()
{
  dogImg = loadImage("images/Dog.png");
  dogImg1 = loadImage("images/happydog.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.3

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  textSize(20);
  
}


function draw() {  
  background(46,139,87);
 //Adding UI
  if(keyWentDown(UP_ARROW))
  {
    writeStock(food);
    dog.addImage(dogImg1);
  }
  drawSprites();

  //add styles here

  fill(255,255,254);
  stroke("black");
  text("Food Remaining : "+food,170,200);
  textSize(15);
  text("Press Up-Arrow To Feed The Dog",150,20);

}

function readStock(data)
{
  food = data.val();
}
 function writeStock(x)
 {
  if(x<=0)
  {
    x=0;
  } 
  else
  {
  x = x-1;
  }
  database.ref('/').update({food:x})
 }


