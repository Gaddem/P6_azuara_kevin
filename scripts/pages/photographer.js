//Récupération des données du photographe grâce à l'id du photographe
async function getInfosPhotographer(id_photographer) {
  const test = await fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((json) => {
      let arrayOfOncePhotographer = json.photographers.filter(
        (photographer) => photographer.id == id_photographer
      );
      return arrayOfOncePhotographer[0];
    });
  return test;
}

async function init() {
  let params = new URL(document.location).searchParams;
  let id_photographer = params.get("id");
  let filter_page = document.getElementById("filterFirst");
  filter_page.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
            openingsFilter();
          }
    });
   getInfosPhotographer(id_photographer).then(async (resPhotographer) => {
   await infosPhotographer(resPhotographer,id_photographer)
  });
}

init();
