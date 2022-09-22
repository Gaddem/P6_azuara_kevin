function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price,namePhotographer} = data;

    const picture = `assets/photographers/${namePhotographer}/${image}`;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.style.width = "350px";
        img.style.height = "300px";

        // const h2 = document.createElement( 'h2' );
        // const h3 = document.createElement( 'h3' );
        // const h4 = document.createElement( 'h4' );
        // const h5 = document.createElement( 'h5' );

        article.setAttribute("id", id)
        img.setAttribute("src", picture);
        // img.setAttribute("alt",name);
        // img.setAttribute("aria-label",name);


        // h3.textContent = city+", "+ country;
        // h2.textContent = name;
        // h4.textContent = tagline;
        // h5.textContent = price+"€/jour";


        article.appendChild(img);
        // article.appendChild(h2);
        // article.appendChild(h3);
        // article.appendChild(h4);
        // article.appendChild(h5);


        return (article);
    }
    return {  getMediaCardDOM }
}