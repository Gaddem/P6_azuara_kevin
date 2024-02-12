function photographerFactory(data,redirectionProfil) {
    const { name, portrait ,city ,country, tagline, price, id} = data;

    const picture = `assets/photographers/${portrait}`;
    //Création d'un card de profil de photographe
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const sectionProfil = document.createElement( 'section' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement( 'h3' );
        const h4 = document.createElement( 'h4' );
        const h5 = document.createElement( 'h5' );

        sectionProfil.style.display="flex";
        sectionProfil.style.flexDirection="column";
        sectionProfil.style.justifyContent="center";
        sectionProfil.style.alignItems="center";
        sectionProfil.setAttribute("aria-label",name)
        sectionProfil.setAttribute("tabindex", "0");
        sectionProfil.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.key === 'Enter') {
                redirectionProfil(id);
                }
            });

        article.setAttribute("id", id);
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);
        img.setAttribute("aria-label",name);
        h3.textContent = city+", "+ country;
        h2.textContent = name;
        h4.textContent = tagline;
        h5.textContent = price+"€/jour";

        sectionProfil.appendChild(img);
        sectionProfil.appendChild(h2);

        article.appendChild(sectionProfil);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);


        return (article);
    }
    return { name, picture, getUserCardDOM, id }
}