const blockfilters_under = document.getElementById("mainFiltersHide");
const blockfilters_main = document.getElementById("mainFilter");

//Fonction qui pemret d'ouvrir ou fermer les filtres cachés
function openingsFilter() {
  const ouverture = window.getComputedStyle(blockfilters_under).display;
  const arrowChevron = document.getElementById("chrv");
  if (ouverture == "block") {
    blockfilters_under.style.display = "none";
    blockfilters_main.style.borderBottomLeftRadius = "5px";
    blockfilters_main.style.borderBottomRightRadius = "5px";
    arrowChevron.style.transform = "rotate(0deg)";
  } else {
    blockfilters_under.style.display = "block";
    blockfilters_main.style.borderBottomLeftRadius = "0";
    blockfilters_main.style.borderBottomRightRadius = "0";
    arrowChevron.style.transform = "rotate(180deg)";
  }
}

//Filtre Media en fonction de son type ==> revois l'ordre du tableau puis lance re affichage des medias
async function FILTER_MEDIA(type, mediasPhotographer) {
  let newArray = [];
  switch (type) {
    case "pop":
      newArray = mediasPhotographer.sort((a, b) => {
        let nbA = a.likes,
          nbB = b.likes;
        return nbB - nbA;
      });
      break;
    case "date":
      newArray = mediasPhotographer.sort(
        (d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime()
      );
      break;
    case "title":
      newArray = mediasPhotographer.sort((a, b) => {
        let fa = a.title.toLowerCase();
        let fb = b.title.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      break;
    default:
      console.log("erreur");
      break;
  }
  displayMediaPhotographer(newArray, true);
}

var selectElem = document.getElementById("selectInputFilters");
let ArrayMedia = [];

const filter1 = document.getElementById("filterSecond");
const filter2 = document.getElementById("filterThird");

// Fonction réorganise l'affichage des filtres en changeant:
//  - le titre
//  - sa valeur dans le data-parent
function REORGANIZE_FILTER(valueFilter) {
  const filter0 = document.getElementById("filterFirst");
  const filter1 = document.getElementById("filterSecond");
  const filter2 = document.getElementById("filterThird");
  const Txtfilter1 = document.getElementById("Txtfilter1");
  const Txtfilter2 = document.getElementById("Txtfilter2");
  if (valueFilter == "pop") {
    filter0.dataset.parent = "pop";
    filter0.innerHTML = "Popularité";
    filter1.dataset.parent = "date";
    Txtfilter1.innerHTML = "Date";
    filter2.dataset.parent = "title";
    Txtfilter2.innerHTML = "Titre";
  } else if (valueFilter == "date") {
    filter0.dataset.parent = "date";
    filter0.innerHTML = "Date";
    filter1.dataset.parent = "pop";
    Txtfilter1.innerHTML = "Popularité";
    filter2.dataset.parent = "title";
    Txtfilter2.innerHTML = "Titre";
  } else if (valueFilter == "title") {
    filter0.dataset.parent = "title";
    filter0.innerHTML = "Titre";
    filter1.dataset.parent = "pop";
    Txtfilter1.innerHTML = "Popularité";
    filter2.dataset.parent = "date";
    Txtfilter2.innerHTML = "Date";
  }
}

//Fonction général de filtre qui appelle la réogarnisation de l'affichage (datas + filtres)
function filtrage(filterNB) {
  let valueOfFilter;
  if (filterNB == 1) {
    valueOfFilter = filter1.dataset.parent;
  } else {
    valueOfFilter = filter2.dataset.parent;
  }
  REORGANIZE_FILTER(valueOfFilter);
  FILTER_MEDIA(valueOfFilter, ArrayMedia);
}

//A l'écoute du click sur le filtre 1
filter1.addEventListener("click", function (event) {
  event.preventDefault();
  filtrage(1);
});
//A l'écoute du click sur le filtre 2
filter2.addEventListener("click", function (event) {
  event.preventDefault();
  filtrage(2);
});
//A l'écoute du bounton Entree sur le filtre 1
filter1.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    filtrage(1);
  }
});
//A l'écoute du bounton Entree sur le filtre 2
filter2.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    filtrage(2);
  }
});
