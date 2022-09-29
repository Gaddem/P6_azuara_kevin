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
async function displayPriceAndLike(tabMedias,price_photographer) {
    const like_price = document.querySelector("#section_like_price");
    const price = document.createElement( 'h1' ); 
    const likes_more_icon = document.createElement('section');
    const likes = document.createElement( 'h1' ); 
    const icon_like = document.createElement('img');

    likes_more_icon.setAttribute("id","likes_more_icon");

    let nb_like = 0;
    for (let index = 0; index < tabMedias.length; index++) {
        nb_like += tabMedias[index].likes;
    }

    price.textContent = price_photographer+"€ / jour";
    price.style.fontSize = "24px";
    price.style.lineHeight = "31.25px";
    price.style.fontWeight = 500;
    price.style.color= "#000000";
    price.style.margin= 0;

    likes.textContent = nb_like;
    likes.style.fontSize = "24px";
    likes.style.lineHeight = "31.25px";
    likes.style.fontWeight = 500;
    likes.style.color= "#000000";
    likes.style.margin= 0;


    icon_like.setAttribute("src","../assets/icons/heart_black.svg");
    icon_like.style.fill= "#000000";
    icon_like.style.width="17.5px";
    icon_like.style.height="18.35px";
    icon_like.style.marginLeft="5px";


    likes_more_icon.appendChild(likes)
    likes_more_icon.appendChild(icon_like)
    like_price.appendChild(likes_more_icon);
    like_price.appendChild(price);

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


function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
	modal.style.display = "none";
    overlay.style.display = "none";
}



async function init() {

    let params = (new URL(document.location)).searchParams;
    let id_photographer = params.get('id');
    await getInfosPhotographer(id_photographer).then(async(resPhotographer)=>{
        await displayDataPhotographer(resPhotographer);
        await getMediaPhotographer(id_photographer).then(async(resMedia)=>{
            const arrayOfMediaMoreName = resMedia.map((mediaRecup)=>({ ...mediaRecup, namePhotographer : resPhotographer.name})) //Attribution du nom du Photographe afin de retourver son dossier de photo par la suite
            await displayMediaPhotographer(arrayOfMediaMoreName);
            await displayPriceAndLike(arrayOfMediaMoreName,resPhotographer.price);

    
        })
    })
   
    
};

init();