
// Mon canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;

// On récupère la position X et Y de la souris
// (étudier la methode offset)
let mouseX, mouseY;
canvas.addEventListener('mousemove',
    function (e) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        return (mouseX, mouseY);
    },
false);

// Mes cases, sens de lecture  coin superieur gauche
////////////////////////////////////////////////// let mesCases = [{x:0,y:0 ,dispo: true, valeur: null}] ?????
let mesCasesX = [] , mesCasesY = [] , mesCasesDispo = [] , mesCasesValeur = [];
function remplirTab() {
    mesCasesX.length = 0 , mesCasesY.length = 0 , mesCasesDispo.length = 0 , mesCasesValeur.length = 0;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            mesCasesX.push(x * 100);
            mesCasesY.push(y * 100);
            mesCasesDispo.push(true);
            mesCasesValeur.push(null);
        }
    }
}
remplirTab()
// la grille
function drawGrille() {
    for (let x = 0; x <= 3; x++) {
        ctx.moveTo(x * 100, 0);
        ctx.lineTo(x * 100, 300);
        ctx.stroke();
        for (let y = 0; y <= 3; y++) {
            ctx.moveTo(0, y * 100);
            ctx.lineTo(300, y*100);
            ctx.stroke();
        }
    }
}
drawGrille();
//Le cercle
function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x+50, y+50, 30, 0, 2 * Math.PI);
    ctx.stroke();
}

// la croix
function drawCroix(x, y) {
    ctx.moveTo(x+25, y+25);
    ctx.lineTo(x+75, y+75);
    ctx.stroke();
    ctx.moveTo(x+25, y+75);
    ctx.lineTo(x+75, y+25);
    ctx.stroke();
}

//Systeme de tour par tour
let player = false;
let tour = 1;

function aQuiLtour() {
    tour % 2 == 0 ? player = true : player =  false;
}
//Systeme de vérification de case
// si mes x ont tous la meme valeur 
// si mes y ont tous la meme valeur
// si x et y sont pareil et ont la meme valeur
function whoWin() {
    if( mesCasesValeur[0] == mesCasesValeur[1] && mesCasesValeur[0] == mesCasesValeur[2] && mesCasesValeur[0] != null||
        mesCasesValeur[3] == mesCasesValeur[4] && mesCasesValeur[3] == mesCasesValeur[5] && mesCasesValeur[3] != null||
        mesCasesValeur[6] == mesCasesValeur[7] && mesCasesValeur[6] == mesCasesValeur[8] && mesCasesValeur[6] != null||
        mesCasesValeur[0] == mesCasesValeur[3] && mesCasesValeur[0] == mesCasesValeur[6] && mesCasesValeur[0] != null||
        mesCasesValeur[1] == mesCasesValeur[4] && mesCasesValeur[1] == mesCasesValeur[7] && mesCasesValeur[1] != null||
        mesCasesValeur[2] == mesCasesValeur[5] && mesCasesValeur[2] == mesCasesValeur[8] && mesCasesValeur[2] != null||
        mesCasesValeur[0] == mesCasesValeur[4] && mesCasesValeur[0] == mesCasesValeur[8] && mesCasesValeur[0] != null||
        mesCasesValeur[2] == mesCasesValeur[4] && mesCasesValeur[2] == mesCasesValeur[6] && mesCasesValeur[2] != null)
    {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrille();
        remplirTab();
        player == false ? alert('player 1 win') : alert('player 2 win');
    }
}
//Systeme de drawOnClick 
function clickDraw() {
    for (let i = 0; i < mesCasesX.length; i++) {
        if (mouseX > mesCasesX[i] && mouseX < mesCasesX[i] + 100 && mouseY >= mesCasesY[i] && mouseY < mesCasesY[i] + 100 && mesCasesDispo[i] == true){
            player == true ? (drawCircle(mesCasesX[i],mesCasesY[i]), mesCasesValeur[i] = "O")
                 : (drawCroix(mesCasesX[i],mesCasesY[i]),mesCasesValeur[i] = "X");
            tour++;
            aQuiLtour()
            mesCasesDispo[i] = false;
            console.log(mesCasesValeur); 
            whoWin()
        } 
    }
}
canvas.addEventListener("click",clickDraw,false);