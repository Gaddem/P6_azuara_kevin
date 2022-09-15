//Mettre le code JavaScript lié à la page photographer.html

async function getInfosPhotographer(id_photographer) {
    // Penser à remplacer par les données récupérées dans le json
        const test = await fetch('../../data/photographers.json')
        .then((response) => response.json())
        .then((json) =>{
             let arrayOfOncePhotographer = json.photographers.filter(photographer => photographer.id == id_photographer);
             console.log(arrayOfOncePhotographer[0]);
            return arrayOfOncePhotographer[0];
            });

        return test;
}




async function init() {

    let params = (new URL(document.location)).searchParams;
    let id_photographer = params.get('id');
    const photographerInfo = await getInfosPhotographer(id_photographer);
};

init();