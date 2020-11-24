var dog, dog2;
var database;
var addFood,addFoods;
var feed, feedDog;
var feedTime,lastFed;
var foodStock, foodObj;

function preload()
{
  dog1 = loadImage("dogimg.png")
  dog2 = loadImage("dogimg1.png")
}

function setup() {
  createCanvas(800, 400);
  database = firebase.database();
  dog = createSprite(700,200)
  dog.addImage(dog1)
  dog.scale = 0.15

  foodObj = new Food();

  addFood = createButton("Add Food")
  addFood.position(500,50)
  addFood.mousePressed(addFoods)

  feed = createButton("Feed the dog")
  feed.position(400,50)
  feed.mousePressed(feedDog)
  

}

function draw() {  
  background(46,139,87)
  foodObj.getFoodStock();
  foodObj.foodS = foodStock;
  foodObj.display();

  var feedTime = database.ref('feedTime')
    feedTime.on("value",function(data){
        lastFed = data.val();
    })

  fill("white")
  textSize(13)
  if (lastFed >12)
  {
    text("Last Feed : " + lastFed%12+ " PM",285,65)
  }
  else if (lastFed == 0)
  {
    text("Last Feed : 12 PM",285,65)
  } else {
    text("Last Feed : "+ lastFed + " AM",285,65)
  }
  drawSprites();
}

function addFoods(){
  foodStock++;
  
  database.ref('/').update({
    'food':foodStock
  })

}

function feedDog(){
    
    dog.addImage(dog2)

    if (foodStock != 0)
    {
    foodStock--;
    }

    database.ref('/').update({
      'food':foodStock,
      'feedTime':hour()
    })
  
}

