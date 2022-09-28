//Mettre le code JavaScript lié à la page photographer.html

async function getInfosPhotographer(id_photographer) {
        const test = await fetch('../../data/photographers.json')
        .then((response) => response.json())
        .then((json) =>{
             let arrayOfOncePhotographer = json.photographers.filter(photographer => photographer.id == id_photographer);
            //  console.log(arrayOfOncePhotographer[0]);
            return arrayOfOncePhotographer[0];
        });
        return test;
}
async function getMediaPhotographer(id_photographer) {
    const test = await fetch('../../data/photographers.json')
    .then((response) => response.json())
    .then((json) =>{
         let arrayOfAllMedia= json.media.filter(media => media.photographerId == id_photographer);
        //  console.log(arrayOfAllMedia);
        return arrayOfAllMedia;
    });
    return test;
}

async function displayMediaPhotographer(mediasPhotographer) {
    const medias_location = document.querySelector(".medias_section");
    mediasPhotographer.forEach((media) => {
        const mediaModel = mediaFactory(media); 
        const userCardDOM = mediaModel.getMediaCardDOM();
        // userCardDOM.addEventListener("click",()=>{window.location.href="photographer.html?id="+photographer.id})
        medias_location.appendChild(userCardDOM);
    });

}

async function displayDataPhotographer(arrayDataInfo) {

    const info_location = document.querySelector(".photograph_txt");
    const photo_location = document.querySelector(".photograph_photo");

    const img = document.createElement( 'img' );
    img.style.width = "200px";
    img.style.height = "200px";  
    img.style.objectFit = "cover";
    img.style.borderRadius ="50%";

    const h2 = document.createElement( 'h2' );  
    h2.style.fontSize = "64px";
    h2.style.lineHeight = "83.33px";
    h2.style.fontWeight = "400";
    h2.style.color = "#D3573C";

    const h3 = document.createElement( 'h3' );
    h3.style.fontSize = "24px";
    h3.style.lineHeight = "31.25px";
    h3.style.fontWeight = "400";
    h3.style.color = "#901C1C";

    const h4 = document.createElement( 'h4' );
    h4.style.fontSize = "18px";
    h4.style.lineHeight = "23.44px";
    h4.style.fontWeight = "400";
    h4.style.color = "#525252";

    img.setAttribute("src", arrayDataInfo.portrait);
    img.setAttribute("alt",arrayDataInfo.name);
    img.setAttribute("aria-label",arrayDataInfo.name);
    h3.textContent = arrayDataInfo.city+", "+ arrayDataInfo.country;
    h2.textContent = arrayDataInfo.name;
    h4.textContent = arrayDataInfo.tagline;

    photo_location.appendChild(img);
    info_location.appendChild(h2);
    info_location.appendChild(h3);
    info_location.appendChild(h4);

}






async function init() {

    let params = (new URL(document.location)).searchParams;
    let id_photographer = params.get('id');
    await getInfosPhotographer(id_photographer).then(async(resPhotographer)=>{
        await displayDataPhotographer(resPhotographer);
        await getMediaPhotographer(id_photographer).then(async(resMedia)=>{
            const arrayOfMediaMoreName = resMedia.map((mediaRecup)=>({ ...mediaRecup, namePhotographer : resPhotographer.name})) //Attribution du nom du Photographe afin de retourver son dossier de photo par la suite
            await displayMediaPhotographer(arrayOfMediaMoreName);
    
        })
    })
   
    
};

init();