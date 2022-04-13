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
var spelStatus = SPELEN;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijandX = 0;
var vijandY = 0;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  if(keyIsDown(68) && spelerX < 1655){
    spelerX = spelerX + 5;
    deleteTrack();
  };
  if(keyIsDown(65) && spelerX > 25){
    spelerX = spelerX - 5;
    deleteTrack();
  };
  if(keyIsDown(87) && spelerY > 25){
    spelerY = spelerY - 5;
    deleteTrack();
  };
  if(keyIsDown(83) && spelerY < 980){
    spelerY = spelerY + 5;
    deleteTrack();
  };
  // speler
 
  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond

  // vijand
  fill("yellow");
  rect(vijandX, vijandY , 50, 50);
  fill("red");
  ellipse(vijandX + 25, vijandY + 25, 10, 10);
  // kogel

  // speler
  fill("green");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("lime");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1680, 1005);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background(200, 0, 0);
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */

function deleteTrack() {
        fill(200, 0, 0)
        rect(0, 0, 1680, 1005);
}
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

  }
}
