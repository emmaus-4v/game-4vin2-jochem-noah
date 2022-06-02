/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
//spel basis
const SPELEN = 1;
const GAMEOVER = 2;
const PREGAME = 3;
var spelStatus = SPELEN;
var gameOverImg;

//speler
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var spelerSnelheid = 6;

var spelerImg;
var spelerImgRev;
var spelerStatus = 1;

//vijand
var vijandX = Math.floor(Math.random() * 1680) + 1;
var vijandY = Math.floor(Math.random() * 1005) + 1;

var vijandSnelheid = 70;

var vijand2X = Math.floor(Math.random() * 1680) + 1;
var vijand2Y = Math.floor(Math.random() * 1005) + 1;

var vijandNormaalImg;
var vijandNormaalImgRev;
var vijandStatus = 1;
var vijand2Status = 1;

//hp en punten
var hp = 400;
var stamina = 250;
var gameTimer = 0;
var mousePressedTimes = 0;

//botsing
var botsingMoment = 0;

//kogel
var kogelX = spelerX;
var kogelY = spelerY;
var beweegKogel = false;
var kogelSnelheidX = 0;
var kogelSnelheidY = 0;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  

  if (keyIsDown(16) && stamina > 0  ){
    spelerSnelheid = 9 
    stamina-=2
  }else{
    spelerSnelheid = 6
  }
  if (stamina <250  && !keyIsDown(16)){
    stamina++
  }
  if (keyIsDown(68) && spelerX < 1655) {
    spelerX = spelerX + spelerSnelheid;
    deleteTrack();
  };
  if (keyIsDown(65) && spelerX > 25) {
    spelerX = spelerX - spelerSnelheid;
    spelerStatus = 2;
    deleteTrack();
  };
  if (keyIsDown(87) && spelerY > 25) {
    spelerY = spelerY - spelerSnelheid;
    deleteTrack();
  };
  if (keyIsDown(83) && spelerY < 980) {
    spelerY = spelerY + spelerSnelheid;
    deleteTrack();
  };
  /* schuin lopen snelheid correctie */
  if (keyIsDown(68) && keyIsDown(87)){
    spelerX -=2,5
    spelerY +=2,5
  }
  if (keyIsDown(68) && keyIsDown(83)){
    spelerX -=2,5
    spelerY -=2,5
  }
  if (keyIsDown(65) && keyIsDown(87)){
    spelerX +=2,5
    spelerY +=2,5
  }
  if (keyIsDown(65) && keyIsDown(83)){
    spelerX +=2,5
    spelerY -=2,5
  }
  if (keyIsDown(68)){
    spelerStatus = 1;
  }
  if (keyIsDown(65)){
    spelerStatus = 2;
  }

  // vijand
  if (spelerY < vijandY) {
    vijandY -= (vijandY - spelerY) / vijandSnelheid
    deleteTrack();
  };
  if (spelerY > vijandY) {
    vijandY += (spelerY - vijandY) / vijandSnelheid
    deleteTrack();
  };
  if (spelerX < vijandX) {
    vijandX -= (vijandX - spelerX) / vijandSnelheid
    deleteTrack();
    vijandStatus = 2;
  };
  if (spelerX > vijandX) {
    vijandX +=  (spelerX - vijandX) / vijandSnelheid
    deleteTrack();
    vijandStatus = 1;
  };

  if (spelerY < vijand2Y) {
    vijand2Y -= (vijand2Y - spelerY) / vijandSnelheid
    deleteTrack();
  };
  if (spelerY > vijand2Y) {
    vijand2Y += (spelerY - vijand2Y) / vijandSnelheid
    deleteTrack();
  };
  if (spelerX < vijand2X) {
    vijand2X -= (vijand2X - spelerX) / vijandSnelheid
    deleteTrack();
    vijand2Status = 2;
  };
  if (spelerX > vijand2X) {
    vijand2X +=  (spelerX - vijand2X) / vijandSnelheid
    deleteTrack();
    vijand2Status = 1;
  };
  
  // kogel
  if(mouseIsPressed && mousePressedTimes < 2){
    beweegKogel = true
    mousePressedTimes ++
  }
  if (mousePressedTimes === 1){
    kogelSnelheidX = (mouseX - spelerX)/ 50
    kogelSnelheidY = (mouseY - spelerY)/ 50
  }
  if(beweegKogel === true) {
   kogelX += kogelSnelheidX;
   kogelY += kogelSnelheidY;
    }else{
      mousePressedTimes = 0;
      beweegKogel = false;
      kogelX = spelerX 
      kogelY = spelerY 
    }
    if (kogelX > 1680 || kogelX < 0 || kogelY > 1005 || kogelY < 0){
      beweegKogel = false;
    }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {

  // botsing speler tegen vijand
  if (spelerX - vijandX < 60 &&
    spelerX - vijandX > -60 &&
    spelerY - vijandY < 75 &&
    spelerY - vijandY > -75 || 
    spelerX - vijand2X < 60 &&
    spelerX - vijand2X > -60 &&
    spelerY - vijand2Y < 75 &&
    spelerY - vijand2Y > -75) {
    console.log("Botsing");
    if (hp > 0) {
      hp -= 3;
      deleteTrack();
    }
  };
  // botsing kogel tegen vijand
  if (beweegKogel === true && kogelX - vijandX < 41 &&
    kogelX - vijandX > -41 &&
    kogelY - vijandY < 51 &&
    kogelY - vijandY > -51 ) {
    console.log("BotsingKogel");
    beweegKogel = false;
    resetVijand1();
    };

  if (beweegKogel === true && kogelX - vijand2X < 41 &&
    kogelX - vijand2X > -41 &&
    kogelY - vijand2Y < 51 &&
    kogelY - vijand2Y > -51){
      console.log("BotsingKogel");
      beweegKogel = false;
      resetVijand2();
    } 

  // update punten en health
  
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond

  // vijand
  /*fill("yellow");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill("red");
  ellipse(vijandX, vijandY, 10, 10);*/
  if(vijandStatus < 2){
    image(vijandNormaalImg, vijandX-35, vijandY-45, 70, 90);
  }
  if (vijandStatus > 1){
    image(vijandNormaalImgRev, vijandX-35, vijandY-45, 70, 90);
  }

  if(vijand2Status < 2){
    image(vijandNormaalImg, vijand2X-35, vijand2Y-45, 70, 90);
  }
  if (vijand2Status > 1){
    image(vijandNormaalImgRev, vijand2X-35, vijand2Y-45, 70, 90);
  }
  // kogel
  if (beweegKogel === true){
    fill(230, 153, 0)
    ellipse(kogelX, kogelY, 12, 12);
  }
  // speler
  fill("green");
  /*rect(spelerX - 25, spelerY - 30, 50, 60);
  fill("lime");
  ellipse(spelerX, spelerY, 10, 10);*/ //preciese hitbox van speler
  if(spelerStatus < 2){
    image(spelerImg, spelerX-100, spelerY-40, 200, 80);
  }
  if (spelerStatus > 1){
    image(spelerImgRev, spelerX-100, spelerY-40, 200, 80);
  }
  

  // punten en health
  if (hp > 0) {
    fill(0, 200, 0);
    rect(25, 950, hp, 30);
    fill(0,0,0);
    textSize(20);
    text(hp, 28, 973);
  };

  if (stamina > 0){
    fill(0, 149, 179);
    rect(25, 925, stamina, 20);
    fill(0,0,0);
    textSize(15);
    text(stamina, 28, 940);
  }

  //timer voor de game
  if (gameTimer=> 0){
  gameTimer++;
  textSize(30)
  text(gameTimer/73, 20, 30);
  }
if (gameTimer > 730){
    vijandSnelheid = 65
  }
  if (gameTimer > 1460){
    vijandSnelheid = 60
  }
  if (gameTimer > 2190){
    vijandSnelheid = 55
  }
  if (gameTimer > 2920){
    vijandSnelheid = 50
  }
  if (gameTimer > 3650){
    vijandSnelheid = 40
  }
  if (gameTimer > 4380){
    vijandSnelheid = 30
  }
  if (gameTimer > 5110){
    vijandSnelheid = 15
  }
};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  if (hp < 0) {
    return true;
  } else {
    return false;
  }
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
 function preload() {
  spelerImg = loadImage('Afbeeldingen/pixel-doom-guy.png');
  spelerImgRev = loadImage('Afbeeldingen/pixel-doom-guy-reversed.png');
  vijandNormaalImg = loadImage('Afbeeldingen/imp_pixel.png');
  vijandNormaalImgRev = loadImage('Afbeeldingen/imp_pixel_rev.png');
  backgroundImg = loadImage('Afbeeldingen/Dungeon_Floor.jpg');
  gameOverImg = loadImage('Afbeeldingen/you-died.png');
}

function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1680, 1005);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  image(backgroundImg, 0, 0, 1680, 1005);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function beweegKogel(){
kogelX += (mouseX - spelerX)/ 50
kogelY += (mouseY - spelerY)/ 50
}

function resetVijand1(){
  vijandX = Math.floor(Math.random() * 1680) + 1;
  vijandY = Math.floor(Math.random() * 1005) + 1;
}

function resetVijand2(){
vijand2X = Math.floor(Math.random() * 1680) + 1;
vijand2Y = Math.floor(Math.random() * 1005) + 1;
}

function resetSpel(){
  spelerX = 600;
  spelerY = 600;
  hp = 400;
  resetVijand1();
  resetVijand2();
  beweegKogel = false;
  vijandSnelheid = 70;
}

function deleteTrack() {
  image(backgroundImg, 0, 0, 1680, 1005);
};

function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    fill(0, 0, 0)
    rect(0, 0, 1680, 1005)
    fill(255, 0, 0)
    //rect(840, 0, 2, 1005) //(midden van het scherm)
    image(gameOverImg, 0, 50, 1680 );
    //textSize(80)
    //text("YOU DIED!", 635, 480)
    //text("Druk op spatie om opnieuw te proberen", 150, 600)
    if (keyIsDown(32)){
      spelStatus = PREGAME;
      deleteTrack();
      resetSpel();
      
      
    }
  }
  
  if (spelStatus === PREGAME){
    spelStatus = SPELEN;
    gameTimer = 0; 
  }
}

