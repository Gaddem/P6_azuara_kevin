//Fonction qui récupères les photographes du JSON
async function getPhotographers() {
  const data = await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      return json.photographers;
    });

  return data;
}

//Affichage des photographes avec leurs informations respectives
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
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
