
// const data = require('../../data/photographers.json');

// import eas from '../../data/photographers.json';

  async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
            const test = await fetch('../../data/photographers.json')
            .then((response) => response.json())
            .then((json) =>{ return json.photographers});

            return test;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            userCardDOM.addEventListener("click",()=>{window.location.href="photographer.html?id="+photographer.id})
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers().then(async(res)=>{
           await displayData(res);

        })
    };
    
init();
    