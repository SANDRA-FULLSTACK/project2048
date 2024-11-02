const cells = document.querySelectorAll(".gridCell");
// Sélectionner toutes les cellules de la grille

let gridGame = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function startGame() {
  gridGame = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}

function moveTile(tile, targetRow, targetCol) {
  const targetCell = document.querySelector(
    `.gridCell[data-row="${targetRow}"][data-col="${targetCol}"]`
  );

  const element = document.getElementById("monElement");
  if (element instanceof HTMLElement) {
    // Vérifier que c'est un HTMLElement
    const offsetLeft = element.offsetLeft; // Accès à offsetLeft
    const offsetTop = element.offsetTop; // Accès à offsetTop
    console.log(offsetLeft, offsetTop);
  }

  if (targetCell instanceof HTMLElement) {
    // Vérifier que targetCell est un HTMLElement
    tile.style.transform = `translate(${targetCell.offsetLeft}px, ${targetCell.offsetTop}px)`;
  }
}

function addRandomTile() {
  const emptyCells = Array.from(cells).filter((cell) => cell.innerHTML === "");

  if (emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const tile = document.createElement("div");
  tile.classList.add("tile");

  const value = Math.random() < 0.9 ? 2 : 4; // 90% chance for 2, 10% chance for 4
  tile.textContent = value.toString(); // Convertir le nombre en chaîne de caractères

  // Utiliser un switch pour ajouter la classe pour le style en fonction de la valeur
  switch (value) {
    case 2:
      tile.classList.add("tile-2");
      break;
    case 4:
      tile.classList.add("tile-4");
      break;
    default:
  }

  randomCell.appendChild(tile);
  console.log("Tile added:", value, "at cell:", randomCell); // Log de la tuile ajoutée
}

addRandomTile();
addRandomTile();


const DIRECTIONS = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};



function moveTiles(direction) {
  switch (direction) {
    case DIRECTIONS.LEFT:
      moveLeft();
      break;
    case DIRECTIONS.RIGHT:
      moveRight();
      break;
    case DIRECTIONS.UP:
      moveUp();
      break;
    case DIRECTIONS.DOWN:
      moveDown();
      break;
  }
}

function moveLeft() {
  let moved = false; // Pour savoir si un mouvement a eu lieu

  for (let row = 0; row < gridGame.length; row++) {
      // Filtrer les tuiles non vides
      let newRow = gridGame[row].filter(value => value !== 0);
      let mergedRow = [];
      let i = 0;

      // Fusionner les tuiles
      while (i < newRow.length) {
          if (i < newRow.length - 1 && newRow[i] === newRow[i + 1]) {
              // Fusionner les tuiles
              mergedRow.push(newRow[i] * 2);
              moved = true; // Un mouvement a eu lieu
              i += 2; // Ignorer la tuile suivante
          } else {
              mergedRow.push(newRow[i]); // Garder la tuile
              i += 1; // Passer à la tuile suivante
          }
      }

      // Compléter avec des zéros pour revenir à la taille de la grille
      while (mergedRow.length < 4) {
          mergedRow.push(0);
      }

      // Mettre à jour la ligne de la grille
      gridGame[row] = mergedRow;

      // Si la nouvelle ligne est différente de l'ancienne, cela signifie que des tuiles ont bougé
      if (gridGame[row].some((value, index) => value !== newRow[index])) {
          moved = true; // Indique qu'un mouvement a eu lieu
      }
  }

  // Ajouter une nouvelle tuile après le mouvement
  if (moved) {
      addRandomTile();
      updateGrid();
  
  }
}


function moveRight() {
  console.log("Moving right");
  let moved = false;
  for (let row = 0; row <gridGame.length; row++) {
    let newRow = gridGame[row]. filter(value => value !== 0).reverse();
    let mergedRow = [];
    let i = 0;

    while (i < newRow.length) {
      if (i < newRow.length - 1 && newRow[i] === newRow[i + 1]) {
        mergedRow.push(newRow[i] * 2);
        moved = true;
        i += 2;
      } else {
        mergedRow.push(newRow[i])
        i += 1;
      }
    }
    while (mergedRow.length > 4) {
    mergedRow.push(0);
    if (moved) {
      addRandomTile();
    } updateGrid();
    }
  }


function moveUp() {
  console.log("Moving up");
  // Ajoutez ici votre logique pour déplacer les tuiles vers le haut
}

function moveDown() {
  console.log("Moving down");
  // Ajoutez ici votre logique pour déplacer les tuiles vers le bas
}

// Implémentez ici vos fonctions moveLeft, moveRight, moveUp, moveDown

function mergeTiles(tile1, tile2) {
  const newValue = parseInt(tile1.textContent) + parseInt(tile2.textContent); // Somme des valeurs
  tile1.textContent = newValue.toString(); // Convertir en chaîne de caractères

  // Retirer la classe de l'ancienne tuile
  tile1.classList.remove(
    `tile-${tile1.textContent - parseInt(tile2.textContent)}`
  );

  // Supprimer la tuile fusionnée
  tile2.remove();

  // Ajouter la classe pour la nouvelle valeur
  switch (newValue) {
    case 2:
      tile1.classList.add("tile-2");
      break;
    case 4:
      tile1.classList.add("tile-4");
      break;
    case 8:
      tile1.classList.add("tile-8");
      break;
    case 16:
      tile1.classList.add("tile-16");
      break;
    case 32:
      tile1.classList.add("tile-32");
      break;
    case 64:
      tile1.classList.add("tile-64");
      break;
    case 128:
      tile1.classList.add("tile-128");
      break;
    case 256:
      tile1.classList.add("tile-256");
      break;
    case 512:
      tile1.classList.add("tile-512");
      break;
    case 1024:
      tile1.classList.add("tile-1024");
      break;
    case 2048:
      tile1.classList.add("tile-2048");
      break;
    default:
      break;
  }

  console.log("Tiles merged:", tile1.textContent, "and", tile2.textContent); // Log de la fusion de tuiles
}
function updateGrid() {
  const cells = document.querySelectorAll(".gridCell");

  // Réinitialiser chaque cellule (vider son contenu)
  cells.forEach(cell => {
      cell.innerHTML = ""; // Vider le contenu de chaque cellule
  });

  // Mettre à jour chaque cellule en fonction des valeurs dans gridGame
  gridGame.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value !== 0) { // Si la valeur de la tuile n'est pas 0
              // Créer une nouvelle tuile
              const tile = document.createElement("div");
              tile.classList.add("tile", `tile-${value}`); // Ajouter des classes pour le style
              tile.textContent = value.toString(); // Afficher la valeur de la tuile

              // Calculer l'index de la cellule correspondante
              const cellIndex = rowIndex * 4 + colIndex; // Chaque ligne a 4 cellules
              cells[cellIndex].appendChild(tile); // Ajouter la tuile dans la cellule correspondante
          }
        });
  });
}
