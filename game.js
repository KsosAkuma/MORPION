//Cellules
class Cellule {
  constructor(x, y, valeur = "vide") {
    this.x = x;
    this.y = y;
    this.valeur = valeur;
    this.width = 90;
    this.height = 90;
    this.margin = 5;
  }
  drawCell() {
    if (this.valeur == "X") {
      drawCroix(this.x, this.y);
    } else if (this.valeur == "O") {
      drawCircle(this.x, this.y);
    } else if (this.valeur == "vide") {
      ctx.clearRect(
        this.x + this.margin,
        this.y + this.margin,
        this.width - this.margin,
        this.height - this.margin
      );
    }
  }
}
// VARIABLES GLOBALS
let z = document.querySelector("p");
//Initialise le Jeu
let game = true;
let cell = []; // Global array de cellules (représente la grille de jeu)
let player = 1;
let tour = 0;
makeCell();
let anime;
// Mon canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;
///////////DESSIN
//Le cercle
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x + 50, y + 50, 30, 0, 2 * Math.PI);
  ctx.stroke();
}

// la croix
function drawCroix(x, y) {
  ctx.moveTo(x + 25, y + 25);
  ctx.lineTo(x + 75, y + 75);
  ctx.stroke();
  ctx.moveTo(x + 25, y + 75);
  ctx.lineTo(x + 75, y + 25);
  ctx.stroke();
}
// On récupère la position X et Y de la souris
let mouseX, mouseY;
canvas.addEventListener(
  "mousemove",
  function (e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    return mouseX, mouseY;
  },
  false
);
// dessine la grille de jeu
function drawGrille() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x <= 300; x += 100) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 300);
    ctx.stroke();
    for (let y = 0; y <= 300; y += 100) {
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
      ctx.stroke();
    }
  }
}
//on stocke les cellules dans un tableau
function makeCell() {
  for (let x = 0; x < 300; x += 100) {
    let z = [];
    cell.push(z);
    z = x / 100;
    for (let y = 0; y < 300; y += 100) {
      cell[z].push(new Cellule(x, y));
    }
  }
}
//Systeme de tour par tour
function aQuiLtour() {
  tour++;
  if (tour == 9) {
    z.textContent = `Match Nul`;
  }
  tour % 2 == 0 ? (player = 1) : (player = 2);
}
////////////////////////////////////////////////////////////////////////4
let result;
function verifierCasVictoire(array) {
  console.log(array);
  for (let a = 0; a < array.length; a++) {
    const colonne = array[a];
    console.log(colonne);
    if (
      //COLONNES
      array[a][0].valeur != "vide" &&
      array[a][0].valeur == array[a][1].valeur &&
      array[a][0].valeur == array[a][2].valeur
    ) {
      return true;
    } else if (
      //LIGNES
      array[0][a].valeur != "vide" &&
      array[0][a].valeur == array[1][a].valeur &&
      array[0][a].valeur == array[2][a].valeur
    ) {
      return true;
    } else if (
      //DIAGONALE \
      array[0][0].valeur != "vide" &&
      array[0][0].valeur == array[1][1].valeur &&
      array[0][0].valeur == array[2][2].valeur
    ) {
      return true;
    } else if (
      //DIAGONALE /
      array[0][2].valeur != "vide" &&
      array[0][2].valeur == array[1][1].valeur &&
      array[1][1].valeur == array[2][0].valeur
    ) {
      return true;
    }
  }
}
////////////////////////////////////////////////////////////////////////
function clickGame() {
  if (game) {
  }
  for (let i = 0; i < cell.length; i++) {
    cell[i].forEach((element) => {
      if (
        mouseX > element.x &&
        mouseX < element.x + 100 &&
        mouseY >= element.y &&
        mouseY < element.y + 100 &&
        element.valeur == "vide" &&
        game == true
      ) {
        player == 1 ? (element.valeur = "O") : (element.valeur = "X");
        console.log(verifierCasVictoire(cell));
        if (verifierCasVictoire(cell)) {
          cancelAnimationFrame(anime);
          game = false;
          z.textContent = `Player ${player} win`;
          const restartBtn = document.createElement("button");
          canvas.parentNode.appendChild(restartBtn);
          restartBtn.textContent = "Recommencez";
          restartBtn.addEventListener("click", function (e) {
            game = true;
            cell = [];
            player = 1;
            tour = 0;
            makeCell();
            z.textContent = ``;
            drawGrille();
            e.target.remove();
            anime = requestAnimationFrame(animate);
          });
        } else {
          aQuiLtour();
        }
      }
    });
  }
}
canvas.addEventListener("click", clickGame, false);
///////////////////////////////////////////////////////
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrille();
  for (let i = 0; i < cell.length; i++) {
    cell[i].forEach((el) => {
      el.drawCell();
    });
  }
  requestAnimationFrame(animate);
}
anime = requestAnimationFrame(animate);
