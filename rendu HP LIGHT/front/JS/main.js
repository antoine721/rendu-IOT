//On initialise les variables

const turnDayInvo = 5; //Nombre de tirage par jour
let deck = []; //Deck de cartes

const filtreBouton = document.querySelectorAll(
  'input[type=radio][name="maison"]'
); //récupérations des valeurs des boutons de filtre dans "classeur"
const deckHTML = document.getElementById("cardContainer"); //récupération de l'élément HTML où on va afficher les cartes (ici dans "classeur")
const profilHTML = document.getElementsByClassName("profil"); //récupération de l'élément HTML où on va afficher les profils (ici dans "profil"). La partie des profils n'est pas encore implémentée car j'ai rencontré des problèmes avec l'API (adresse inconnue avec le /characters/ et le slug)
//récupération du slug dans l'URL

function entierAleatoire(min, max) {
  //Fonction pour tirer un nombre aléatoire entre min et max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Fonction pour récupérer les données de l'API
function fetchHP() {
  // let slug = new URLSearchParams(window.location.search).get('slug')
  return fetch("https://hp-api.lainocs.fr/characters").then((response) =>
    response.json()
  );
}

//Fonction pour tirer une carte aléatoire
async function choicePerso() {
  const data = await fetchHP(); //On récupère les données de l'API et on l'attribue à data
  let res = entierAleatoire(0, data.length - 1); //On tire un nombre aléatoire entre 0 et la longueur de data - 1
  if (turnDayInvo > 0) {
    //On récupère les données de la carte tirée et on les affiche dans le HTML
    document.getElementById(
      "imageHTML"
    ).innerHTML = `                                 
        <img src = "${data[res].image}" alt = " ${data[res].name}"/>
        `;
    document.getElementById("nomHTML").innerHTML = `
        <h2>${data[res].name}</h2>
        `;
    deck.push(data[res]); //On ajoute la carte tirée dans le deck
    turnDayInvo -= 1; //On enlève un tirage

    switch (
      data[res].house //On change la couleur de fond et de bordure en fonction de la maison de la carte tirée pour l'UX
    ) {
      case "Gryffindor":
        document.getElementById("imageHTML").style.backgroundColor = "#ae0001";
        document.getElementById("imageHTML").style.border = "2px solid #740001";
        break;
      case "Hufflepuff":
        document.getElementById("imageHTML").style.backgroundColor = "#f0c75e";
        document.getElementById("imageHTML").style.border = "2px solid #ecb939";
        break;
      case "Ravenclaw":
        document.getElementById("imageHTML").style.backgroundColor = "#222f5b";
        document.getElementById("imageHTML").style.border = "2px solid #0e1a40";
        break;
      case "Slytherin":
        document.getElementById("imageHTML").style.backgroundColor = "#2a623d";
        document.getElementById("imageHTML").style.border = "2px solid #1a472a";
        break;
      default:
        document.getElementById("imageHTML").style.backgroundColor = "#4d35c4";
        document.getElementById("imageHTML").style.border = "2px solid #231ea5";
    }
  } else {
    document.getElementById("resultatTirage").innerHTML =
      "Vous n'avez plus de tirage pour aujourd'hui"; //Si le nombre de tirage est égal à 0, on prévient l'utilisateur et le tirage est bloqué
  }
}

document.getElementById("icone_menu").addEventListener("click", function () {
  //Fonction pour ouvrir et fermer le menu
  let menu = document.querySelector(".menu"); //On récupère le menu
  menu.classList.toggle("show"); //On ajoute ou on enlève la classe show afin d'ouvrir ou fermer le menu
  this.style.left = menu.classList.contains("show") ? "260px" : "10px"; //On change la position de l'icone du menu en fonction de si le menu est ouvert ou fermé
});

//Fonction pour afficher le deck
async function showDeck() {
  apiData = await fetchHP(); //On récupère les données de l'API
  deckHTML.innerHTML = ""; //On vide la div où on va afficher les cartes
  apiData.forEach((element) => {
    //On affiche les cartes dans la div
    //la ligne 84 est un lien vers le profil de la carte, mais je n'ai pas réussi à faire marcher l'URL
    deckHTML.innerHTML += `
        <div class="deck">
            <img src = "${element.image}" alt = " ${element.name}"/>
            <a href="profil.html?id=${element.slug}"><h2>${element.name}</h2></a> 
        </div>
        `;
  });
}

//On affiche le deck
if (window.location.pathname.includes("classeur.html")) {
  showDeck();
}

//On récupère les valeurs des boutons de filtre
filtreBouton.forEach((bouton) => {
  bouton.addEventListener("change", async () => {
    const apiData = await fetchHP();
    houseChoice = bouton.id; //On attribue l'id du bouton à houseChoice
    let triHouse = []; //On crée un tableau vide pour trier les cartes en fonction de la maison
    if (houseChoice == "all") {
      //Si le bouton "all" est sélectionné, on affiche toutes les cartes
      triHouse = apiData;
      displayTriHouse(triHouse);
    } else if (houseChoice == "none") {
      //Si le bouton "none" est sélectionné, on affiche les cartes qui n'ont pas de maison
      apiData.forEach((chara) => {
        if (!chara.house || chara.house.trim() === "") {
          //On vérifie si la maison est vide ou null
          triHouse.push(chara);
        }
      });
    } else {
      //Si un autre bouton est sélectionné, on affiche les cartes en fonction de la maison
      apiData.forEach((chara) => {
        if (chara.house == houseChoice) {
          triHouse.push(chara);
        }
      });
      displayTriHouse(triHouse); //On affiche les cartes triées avec la fonction displayTriHouse (définie plus bas)
    }
    switch (
      houseChoice //On change la couleur de fond et de bordure en fonction du filtre sélectionné pour l'UX
    ) {
      case "Gryffindor":
        deckHTML.style.backgroundColor = "#ae0001";
        deckHTML.style.border = "2px solid #740001";
        break;
      case "Hufflepuff":
        deckHTML.style.backgroundColor = "#f0c75e";
        deckHTML.style.border = "2px solid #ecb939";
        break;
      case "Ravenclaw":
        deckHTML.style.backgroundColor = "#222f5b";
        deckHTML.style.border = "2px solid #0e1a40";
        break;
      case "Slytherin":
        deckHTML.style.backgroundColor = "#2a623d";
        deckHTML.style.border = "2px solid #1a472a";
        break;
      default:
        deckHTML.style.backgroundColor = "#4d35c4";
        deckHTML.style.border = "2px solid #231ea5";
    }
  });
});

//Fonction pour afficher les cartes triées fonctionnant de la même manière que la fonction showDeck

async function displayTriHouse(triHouse) {
  deckHTML.innerHTML = "";
  triHouse.forEach((element) => {
    deckHTML.innerHTML += `
        <div class = "triDeck">
            <img src = "${element.image}" alt = " ${element.name}"/>
            <h2>${element.name}</h2>
            <div class="seeProfil"><button class="button" href="profil.html?id=${element.slug}">Voir le profil</button></div>
        </div>
        `;
  });
}

async function getColor() {
  const response = await fetch("/Color");
  const data = await response.json();
  const card = data.message;
  console.log(card);
}
