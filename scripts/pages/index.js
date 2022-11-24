//Fonction qui récupères les photographes du JSON
async function getPhotographers() {
  const test = await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      return json.photographers;
    });

  return test;
}

//Fonction de redirection vers une page de photographe précise gâce à l'id du photographe
function redirectionPROFIL(idPhotographer) {
  window.location.href = "photographer.html?id=" + idPhotographer;
}

//Affichage des photographes avec leurs informations respectives
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer,redirectionPROFIL);
    const userCardDOM = photographerModel.getUserCardDOM();
    userCardDOM.addEventListener("click", () =>
      redirectionPROFIL(photographer.id)
    );
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  await getPhotographers().then(async (res) => {
    await displayData(res);
  });
}

init();
