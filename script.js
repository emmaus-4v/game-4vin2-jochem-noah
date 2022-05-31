/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
const PREGAME = 3;
var spelStatus = SPELEN;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var spelerSnelheid = 6;

var vijandX = 0;
var vijandY = 0;

var vijand2X = 1800;
var vijand2Y = 0;

var hp = 400;

var botsingMoment = 0;

var kogelX = spelerX;
var kogelY = spelerY;

var spelerImg;
var spelerImgRev;
var spelerStatus = 1;

var vijandNormaalImg;
var vijandNormaalImgRev;
var vijandStatus = 1;
var vijand2Status = 1;

var gameTimer = 0;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(16) && spelerSnelheid){
    spelerSnelheid = 9 
  }else{
    spelerSnelheid = 6
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
    vijandY -= (vijandY - spelerY) / 70
    deleteTrack();
  };
  if (spelerY > vijandY) {
    vijandY += (spelerY - vijandY) / 70
    deleteTrack();
  };
  if (spelerX < vijandX) {
    vijandX -= (vijandX - spelerX) / 70
    deleteTrack();
    vijandStatus = 2;
  };
  if (spelerX > vijandX) {
    vijandX +=  (spelerX - vijandX) / 70
    deleteTrack();
    vijandStatus = 1;
  };

  if (spelerY < vijand2Y) {
    vijand2Y -= (vijand2Y - spelerY) / 70
    deleteTrack();
  };
  if (spelerY > vijand2Y) {
    vijand2Y += (spelerY - vijand2Y) / 70
    deleteTrack();
  };
  if (spelerX < vijand2X) {
    vijand2X -= (vijand2X - spelerX) / 70
    deleteTrack();
    vijand2Status = 2;
  };
  if (spelerX > vijand2X) {
    vijand2X +=  (spelerX - vijand2X) / 70
    deleteTrack();
    vijand2Status = 1;
  };
  
  // kogel
 
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

  // update punten en health
  if (hp > 0) {
    fill(0, 200, 0);
    rect(25, 950, hp, 30);
    fill(0,0,0);
    textSize(20);
    text(hp, 28, 973);
  };
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
  if(mouseIsPressed) {
    beweegKogel();
    fill(230, 153, 0)
    ellipse(kogelX, kogelY, 12, 12);
    }else{
      kogelX = spelerX 
      kogelY = spelerY 
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
  if (gameTimer=> 0){
  gameTimer++;
  textSize(30)
  text(gameTimer/73, 20, 30);
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
  vijandSchietImg = loadImage('Afbeeldingen/shooting-demon.png');
  vijandSchietImgRev = loadImage('Afbeeldingen/shooting-demonRev.png');
  backgroundImg = loadImage('Afbeeldingen/Dungeon_Floor.jpg');
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

function resetSpel(){
  spelerX = 600;
  spelerY = 600;
  hp = 400;
  vijandX = 0;
  vijandY = 0;
  vijand2X = 1800;
  vijand2Y = 0;

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
    //rect(840, 0, 2, 1005) (midden van het scherm)
    textSize(80)
    text("YOU DIED :(", 640, 502)
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
