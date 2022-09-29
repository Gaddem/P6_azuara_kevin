function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price,namePhotographer,video} = data;

    function TakeGoodName(namePhotographer){
        let firstName = namePhotographer.split(' ')[0];
        console.log(firstName);
        if(firstName.includes("-")){
            let placeTiret = firstName.indexOf("-");
            let lengthString = firstName.length;
            firstName = firstName.slice(0,placeTiret);
            firstName += " "+namePhotographer.slice(placeTiret+1,lengthString);
        }
        return firstName
    }
    const picture = `../assets/photographers/${TakeGoodName(namePhotographer)}/${image||video}`;



    function getMediaCardDOM() {

    if(image || video){
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);
        const type =image ?"image":"video"
        switch (type) {
            case "image":
                const img = document.createElement( 'img' );
                img.setAttribute("src", picture);
                img.style.width = "350px";
                img.style.height = "300px";
                img.style.borderRadius = "5px";
                img.style.objectFit = "cover";
                article.appendChild(img);
                break;
            case "video":
                const video = document.createElement( 'video' );
                const src_video = document.createElement( 'source' );
                video.appendChild(src_video);
                src_video.setAttribute("src", picture);
                src_video.setAttribute("type","video/mp4")
                video.style.width = "350px";
                video.style.height = "300px";
                video.style.borderRadius = "5px";
                video.style.objectFit = "cover";
                article.appendChild(video);
                break;
            default:
                break;
        }

        const section_foot = document.createElement( 'section' );
        section_foot.setAttribute("id", "section_foot");

        const title_article = document.createElement( 'h1' );
        title_article.textContent = title;
        title_article.style.fontWeight = 400;
        title_article.style.margin= 0;
        title_article.style.fontStyle ="24px";
        title_article.style.fontStyle = "31.25px";

        //partie like et son icon
        const like_part = document.createElement( 'div' );
        like_part.setAttribute("id", "like_part");
        
        //nombre like
        const nblike_article = document.createElement( 'h1' );
        nblike_article.textContent = likes;
        nblike_article.style.fontWeight = 500;
        nblike_article.style.margin= 0;
        nblike_article.style.fontStyle ="24px";
        nblike_article.style.fontStyle = "31.25px";

        //icone coeur
        const icon_like = document.createElement('img');
        icon_like.setAttribute("src","../assets/icons/heart_red.svg");
        icon_like.style.width="17.5px";
        icon_like.style.height="18.35px";
        icon_like.style.marginLeft="4px";

        like_part.appendChild(nblike_article);
        like_part.appendChild(icon_like);

        section_foot.appendChild(title_article);
        section_foot.appendChild(like_part);
        article.appendChild(section_foot);

        return (article);
    }  
    }
    return {  getMediaCardDOM }
}