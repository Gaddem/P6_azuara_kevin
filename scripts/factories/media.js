function mediaFactory(data,arrayComplete) {
    const { id, photographerId, title, image, likes, date, price,namePhotographer,video} = data;

    function TakeGoodName(namePhotographer){
        let firstName = namePhotographer.split(' ')[0];
        if(firstName.includes("-")){
            let placeTiret = firstName.indexOf("-");
            let lengthString = firstName.length;
            firstName = firstName.slice(0,placeTiret);
            firstName += " "+namePhotographer.slice(placeTiret+1,lengthString);
        }
        return firstName
    }
    

    //fonction pour like ou disilike le media
    function LIKE_MEDIA(){
        const likes_now  = image ? document.getElementById(image):document.getElementById(video);
        const totalLike = document.getElementById("total_likes_media");
        let actualTotal = totalLike.textContent
        let isValueInt = parseInt(likes_now.textContent);
        if(likes==isValueInt){
            let newValueLike = likes+1;
            likes_now.textContent = newValueLike.toString()  ;
            let valueToUp = parseInt(actualTotal);
            valueToUp ++;
            totalLike.textContent = valueToUp.toString() ;

        }else{
            let newValueLike = likes;
            likes_now.textContent = newValueLike.toString()  ;
            let valueToUp = parseInt(actualTotal);
            valueToUp --;
            totalLike.textContent = valueToUp.toString() ;
        }
    }
    const picture = `../assets/photographers/${TakeGoodName(namePhotographer)}/${image||video}`;


  
    //Ouverture du modal
    function openModalPhoto(id,title_media) {
        const overlay = document.getElementById("overlay");
        const modal = document.getElementById("modal_photo");
        const parent  = document.getElementById("modal_photo_into");
        const icon_close = document.createElement('img');
        const placeMedia  = document.querySelector(".placeItem");
        parent.setAttribute("aria-hidden","false");
        // parent.focus();


        const indexMediaInArray = arrayComplete.findIndex(object => {return object.id == id;});
        placeMedia.setAttribute("id",indexMediaInArray);
        icon_close.setAttribute("id","close_red");
        icon_close.onclick=function() {
            closeModalPhoto() ;
        }
        icon_close.setAttribute("src","assets/icons/close_red.svg");
        icon_close.setAttribute("alt","Close dialog");
        icon_close.setAttribute("ari-label","Close dialog");
        

        DisplayArrow("left");//Creation flèche gauche
        DisplayContentMedia(title_media,false);//Creation media -> première ouverture
        DisplayArrow("right");//Creation flèche droite
        modal.style.display ="block";
        overlay.style.display = "block";
        parent.appendChild(icon_close);
    }
    function closeModalPhoto() {
        const overlay = document.getElementById("overlay");
        const modal = document.getElementById("modal_photo");
        const modalInto = document.getElementById("modal_photo_into");
        modalInto.setAttribute("aria-hidden","true");
        modal.style.display ="none";
        overlay.style.display = "none";
        modalInto.innerHTML = '';
        // console.log(TakeGoodName(namePhotographer))  
    }
    

    //Affichage d'une fleche
    function DisplayArrow (type) {
        const parent  = document.getElementById("modal_photo_into");
        const arrowRight = document.createElement('img');
        const arrowLeft = document.createElement('img');
        if(type==="left"){
            arrowLeft.setAttribute("tabindex","0");
            arrowLeft.setAttribute("src","../assets/icons/left-arrow.svg");
            arrowLeft.setAttribute("alt","Previous image");
            arrowLeft.setAttribute("aria-label","Previous image");

            arrowLeft.style.width = "48px";
            arrowLeft.style.height = "29.64px";
            arrowLeft.style.cursor = "pointer";
            arrowLeft.style.position ="absolute";
            arrowLeft.style.left =0;

            arrowLeft.onclick =function() {
                let placeMedia  = document.querySelector(".placeItem");
                let newIndex = parseInt(placeMedia.id)-1;
                if(newIndex===(-1)){
                    let lengthArray = arrayComplete.length;
                    let newMediaNext = arrayComplete[lengthArray-1];
                    newIndex = arrayComplete.findIndex(object => {return object.id == newMediaNext.id;});
                }
                let newTitle = arrayComplete[newIndex].title
                placeMedia.setAttribute("id",newIndex);
                DisplayContentMedia(newTitle,true);

               };  
            parent.appendChild(arrowLeft);
        }else{
            arrowRight.setAttribute("tabindex","0");
            arrowRight.setAttribute("src","../assets/icons/left-arrow.svg");
            arrowRight.setAttribute("alt","Next image");
            arrowRight.setAttribute("aria-label","Next image");
            // arrowRight.setAttribute("onClick","");
            arrowRight.style.width = "48px";
            arrowRight.style.height = "29.64px";
            arrowRight.style.cursor = "pointer";
            arrowRight.style.position ="absolute";
            arrowRight.style.right =0;
            arrowRight.style.transform = "rotate(-180deg)";
           
            arrowRight.onclick = function() {
                let placeMedia  = document.querySelector(".placeItem");
                let newIndex = parseInt(placeMedia.id)+1;
                let lengthArray = arrayComplete.length;
                if(newIndex===lengthArray){
                    newIndex = 0
                }
                let newTitle = arrayComplete[newIndex].title
                placeMedia.setAttribute("id",newIndex);
                DisplayContentMedia(newTitle,true);
                };  
            
            parent.appendChild(arrowRight);

        }

    

    }
   
    //Afficher dans un le media sélectionné
    function DisplayContentMedia (title_media,already) {
        const placeMedia  = document.querySelector(".placeItem");
        const id = arrayComplete[placeMedia.id].id

        if(already){//Already permet de savoir s'il faut vider le contenu actif pour ne pas dupliquer les affichages
            const contentNowToTrash = document.getElementById("toConsom");
            contentNowToTrash.innerHTML="";
            contentNowToTrash.remove();
        }
        let media_select_array = arrayComplete.filter(element => element.id == id);
        let media_select = media_select_array[0];
        const modal_into = document.getElementById("modal_photo_into");
        modal_into.setAttribute("aria-label","image closeup view")
        const mediaAndInfo =document.createElement( 'section' );//Cette section contient tout le contenu qui doit switcher lorsqu'on change change de média
        mediaAndInfo.setAttribute("id","toConsom")
        mediaAndInfo.style.display ="flex";
        mediaAndInfo.style.flexDirection="column";
        mediaAndInfo.style.justifyContent="flex-start";

        const titles = document.createElement("h1");//Titre média
        titles.style.fontWeight =400;
        titles.style.fontSize = "24px";
        titles.style.lineHeight = 3;
        titles.style.margin = 0;
        titles.textContent = title_media;

        const content =media_select.image ? document.createElement( 'img' ) :  document.createElement( 'video' );//Media dans le modal
        content.style.width ="1050px";
        content.style.height ="900px";
        content.style.objectFit="cover";
        content.style.borderRadius ="5px";

        if(media_select.video){//Media === vidéo
            const src_video = document.createElement( 'source' );
            content.appendChild(src_video);
            src_video.setAttribute("src",` ../assets/photographers/${TakeGoodName(namePhotographer)}/${media_select.video}`);
            src_video.setAttribute("type","video/mp4");
            content.setAttribute("controls","");
        }else{//Media === image
            content.setAttribute("src",`../assets/photographers/${TakeGoodName(namePhotographer)}/${media_select.image}`)
        }


        

        mediaAndInfo.appendChild(content);//Media
        mediaAndInfo.appendChild(titles);//Titre media

        modal_into.appendChild(mediaAndInfo);//Modal complete = mediaAndInfo = Media + Titre media
    }

    function getMediaCardDOM() {

    if(image || video){
        const article = document.createElement( 'article' );
        article.setAttribute("tabindex","0")
        article.setAttribute("id", id);
        const type =image ?"image":"video";
        switch (type) {
            //Affichage d'un média image
            case "image":
                const link_image = document.createElement( 'div' );
                link_image.onclick = function() { openModalPhoto(id,title) };  
                const img = document.createElement( 'img' );

                img.setAttribute("src", picture);

                img.style.width = "350px";
                img.style.height = "300px";
                img.style.borderRadius = "5px";
                img.style.objectFit = "cover";
                img.style.cursor = "pointer";

                link_image.appendChild(img)
                article.appendChild(link_image);
                break;
            //Affichage d'un média vidéo
            case "video":
                const link_video = document.createElement( 'div' );
                const video = document.createElement( 'video' );
                const src_video = document.createElement( 'source' );

                link_video.onclick = function() { openModalPhoto(id,title) }; 
                
                src_video.setAttribute("src", picture);
                src_video.setAttribute("type","video/mp4");

                video.style.width = "350px";
                video.style.height = "300px";
                video.style.borderRadius = "5px";
                video.style.objectFit = "cover";
                video.style.cursor = "pointer";
                video.setAttribute("tabindex","-1");
                video.appendChild(src_video);
                link_video.appendChild(video)
                article.appendChild(link_video);
                break;
            default:
                break;
        }

        const section_foot = document.createElement( 'section' );
        const title_article = document.createElement( 'h1' );

        section_foot.setAttribute("id", "section_foot");

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
        nblike_article.setAttribute("id",image||video);
        nblike_article.textContent = likes;
        nblike_article.style.fontWeight = 500;
        nblike_article.style.margin= 0;
        nblike_article.style.fontStyle ="24px";
        nblike_article.style.fontStyle = "31.25px";

        //icone coeur
        const link_like = document.createElement('div');
        link_like.onclick = function () {LIKE_MEDIA();};

        const icon_like = document.createElement('img');
        icon_like.setAttribute("src","../assets/icons/heart_red.svg");
        icon_like.setAttribute("alt","likes")
        icon_like.style.width="17.5px";
        icon_like.style.height="18.35px";
        icon_like.style.marginLeft="4px";

        link_like.appendChild(icon_like);//Icone coeur pour like -> attribué à la div qui link_like qui possède la fonction d'incrémentation de like

        like_part.appendChild(nblike_article);//Compteur de like au media 
        like_part.appendChild(link_like);//Système de like sous forme d'icone coeur
        //like part = Coeur + compteur like

        section_foot.appendChild(title_article);
        section_foot.appendChild(like_part);
        article.appendChild(section_foot);

        return (article);
    }  
    }
    return {  getMediaCardDOM }
}