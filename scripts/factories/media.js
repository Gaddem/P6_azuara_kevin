function mediaFactory(data,arrayComplete) {
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
       

        
        // console.log(isValueInt);
        
    }
    const picture = `../assets/photographers/${TakeGoodName(namePhotographer)}/${image||video}`;



    function openModalPhoto(id,title_media) {
        const overlay = document.getElementById("overlay");
        const modal = document.getElementById("modal_photo");
        const parent  = document.getElementById("modal_photo_into");
        const icon_close = document.createElement('img');
        const titles = document.createElement("h1");
        titles.style.fontWeight =400;
        titles.style.fontSize = "24px";
        titles.style.lineHeight = 3;
        titles.style.margin = 0;
        // title.style.Al
        titles.textContent = title_media;
        icon_close.setAttribute("id","close_red");
        icon_close.setAttribute("onclick","closeModalPhoto()");
        icon_close.setAttribute("src","assets/icons/close_red.svg")
        DisplayArrow(id,"left");
        DisplayContentMedia(id);
        DisplayArrow(id,"right");
        modal.style.display ="block";
        overlay.style.display = "block";
        parent.appendChild(icon_close);
        parent.appendChild(titles);

        // console.log(TakeGoodName(namePhotographer))  
    }
    

    
    function DisplayArrow (id,type) {
        // const contentMid  = media_select.image ? document.createElement( 'img' ) :  document.createElement( 'video' );
        const parent  = document.getElementById("modal_photo_into");
        const arrowRight = document.createElement('img');
        const arrowLeft = document.createElement('img');
        if(type==="left"){
            arrowLeft.setAttribute("src","../assets/icons/left-arrow.svg");
            arrowLeft.style.width = "48px";
            arrowLeft.style.height = "29.64px";
            arrowLeft.style.cursor = "pointer";
            arrowLeft.style.position ="absolute";
            arrowLeft.style.left =0;

            parent.appendChild(arrowLeft);
        }else{
            arrowRight.setAttribute("src","../assets/icons/left-arrow.svg");
            arrowRight.style.width = "48px";
            arrowRight.style.height = "29.64px";
            arrowRight.style.cursor = "pointer";
            arrowRight.style.position ="absolute";
            arrowRight.style.right =0;

            arrowRight.style.transform = "rotate(-180deg)";
            parent.appendChild(arrowRight);

        }

    

    }
    function DisplayContentMedia (id) {
        let media_select_array = arrayComplete.filter(element => element.id === id);
        let media_select = media_select_array[0];
        const modal_into = document.getElementById("modal_photo_into");

        const content =media_select.image ? document.createElement( 'img' ) :  document.createElement( 'video' );
        content.setAttribute("id","mediaMid");
        if(media_select.video){
            const src_video = document.createElement( 'source' );
            content.appendChild(src_video);
            src_video.setAttribute("src",` ../assets/photographers/${TakeGoodName(namePhotographer)}/${media_select.video}`);
            src_video.setAttribute("type","video/mp4");
            content.setAttribute("controls","");

        }else{
            content.setAttribute("src",`../assets/photographers/${TakeGoodName(namePhotographer)}/${media_select.image}`)
        }
        content.style.width ="1050px";
        content.style.height ="900px";
        content.style.objectFit="cover";


        content.style.borderRadius ="5px";

        modal_into.appendChild(content);
    }

    function getMediaCardDOM() {

    if(image || video){
        const article = document.createElement( 'article' );
        article.setAttribute("id", id);
        const type =image ?"image":"video"
        switch (type) {
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
            case "video":
                const link_video = document.createElement( 'div' );
                link_video.onclick = function() { openModalPhoto(id,title) }; 
                const video = document.createElement( 'video' );
                const src_video = document.createElement( 'source' );
                video.appendChild(src_video);
                src_video.setAttribute("src", picture);
                src_video.setAttribute("type","video/mp4")
                video.style.width = "350px";
                video.style.height = "300px";
                video.style.borderRadius = "5px";
                video.style.objectFit = "cover";
                video.style.cursor = "pointer";
                link_video.appendChild(video)
                article.appendChild(link_video);
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
        nblike_article.setAttribute("id",image||video);
        nblike_article.textContent = likes;
        nblike_article.style.fontWeight = 500;
        nblike_article.style.margin= 0;
        nblike_article.style.fontStyle ="24px";
        nblike_article.style.fontStyle = "31.25px";

        //icone coeur
        const link_like = document.createElement('div');
        link_like.onclick = function () {LIKE_MEDIA();};
        // link_like.setAttribute("onClick",);

        const icon_like = document.createElement('img');
        icon_like.setAttribute("src","../assets/icons/heart_red.svg");
        icon_like.style.width="17.5px";
        icon_like.style.height="18.35px";
        icon_like.style.marginLeft="4px";

        like_part.appendChild(nblike_article);
        link_like.appendChild(icon_like);
        like_part.appendChild(link_like);

        section_foot.appendChild(title_article);
        section_foot.appendChild(like_part);
        article.appendChild(section_foot);

        return (article);
    }  
    }
    return {  getMediaCardDOM }
}