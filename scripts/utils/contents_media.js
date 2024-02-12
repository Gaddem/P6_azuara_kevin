function takeGoodName(nameOfThePhotographer) {
    let firstName = nameOfThePhotographer.split(" ")[0];
    if (firstName.includes("-")) {
      let placeTiret = firstName.indexOf("-");
      let lengthString = firstName.length;
      firstName = firstName.slice(0, placeTiret);
      firstName += " " + nameOfThePhotographer.slice(placeTiret + 1, lengthString);
    }
    return firstName;
  }

  //fonction pour like ou disilike le media
  function likeMedia(image,likes) {
    const likes_now = image? document.getElementById(image) : document.getElementById(video);
    const totalLike = document.getElementById("total_likes_media");
    let actualTotal = totalLike.textContent;
    let isValueInt = parseInt(likes_now.textContent);
    if (likes == isValueInt) {
      let newValueLike = likes + 1;
      likes_now.textContent = newValueLike.toString();
      let valueToUp = parseInt(actualTotal);
      valueToUp++;
      totalLike.textContent = valueToUp.toString();
    } else {
      let newValueLike = likes;
      likes_now.textContent = newValueLike.toString();
      let valueToUp = parseInt(actualTotal);
      valueToUp--;
      totalLike.textContent = valueToUp.toString();
    }
  }

//Fonction qui défocus les éléments parent à la page
  function unfocusParentsTabindex(){
    let arrOftabindex =document.querySelectorAll(".indexable_parent");
    arrOftabindex.forEach(element => {
      element.tabIndex="-1";
    });
  }
  //Fonction qui permet le focus des éléments parent à la page
  function focusParentsTabindex(){
    let arrOftabindex =document.querySelectorAll(".indexable_parent");
    arrOftabindex.forEach(element => {
      element.tabIndex="0";
    });
  }

  
//Fonction qui permet le focus des éléments du modal
  const trapFocus = (element, prevFocusableElement = document.activeElement) => {
    const focusableEls = Array.from(element.querySelectorAll(".indexable_child"));
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    let currentFocus = null;
    firstFocusableEl.focus();
    currentFocus = firstFocusableEl;
    const handleFocus = e => {
      e.preventDefault();
      if (focusableEls.includes(e.target)) {
        currentFocus = e.target;
      } else {
        if (currentFocus === firstFocusableEl) {
          lastFocusableEl.focus();
        } else {
          firstFocusableEl.focus();
        }
        currentFocus = document.activeElement;
      }
    };

    document.addEventListener("focus", handleFocus, true);

    return {
      onClose: () => {
        document.removeEventListener("focus", handleFocus, true);
        prevFocusableElement.focus();
      }
    };
  };

  //Ouverture du modal photo
  function openModalPhoto(id, title_media) {
    unfocusParentsTabindex();
    document.dispatchEvent(new KeyboardEvent('keydown', {'key':'Shift'} ));
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal_photo");
    const parent = document.getElementById("modal_photo_into");
    const icon_close = document.createElement("img");
    const placeMedia = document.querySelector(".placeItem");
    parent.setAttribute("aria-hidden", "false");

    const indexMediaInArray = allArray.findIndex((object) => {
      return object.id == id;
    });
    placeMedia.setAttribute("id", indexMediaInArray);
    icon_close.setAttribute("id", "close_red");
    icon_close.tabIndex = 0;
    icon_close.focus();
    icon_close.onclick = function () {
      closeModalPhoto();
    };
    icon_close.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            icon_close.click();
        }
    });
    icon_close.setAttribute("src", "assets/icons/close_red.svg");
    icon_close.setAttribute("alt", "Close dialog");
    icon_close.setAttribute("ari-label", "Close dialog");
    icon_close.classList.add("indexable_child");
    window.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeModalPhoto();
      }
    });
    DisplayArrow("left"); //Creation flèche gauche
    DisplayContentMedia(title_media, false); //Creation media -> première ouverture
    DisplayArrow("right"); //Creation flèche droite
    modal.style.display = "block";
    overlay.style.display = "block";
    parent.appendChild(icon_close);
    trapFocus(parent);
  }

  function closeModalPhoto() {
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal_photo");
    const modalInto = document.getElementById("modal_photo_into");
    modalInto.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    overlay.style.display = "none";
    modalInto.innerHTML = "";
    focusParentsTabindex();
  }

  //Affichage d'une fleche en fonction de son type ( gauche || droite)+ attribution des actions
  function DisplayArrow(type) {
    const parent = document.getElementById("modal_photo_into");
    const arrowRight = document.createElement("img");
    const arrowLeft = document.createElement("img");
    if (type === "left") {
      arrowLeft.setAttribute("tabindex", "0");
      arrowLeft.setAttribute("src", "./assets/icons/left-arrow.svg");
      arrowLeft.setAttribute("alt", "Previous image");
      arrowLeft.setAttribute("id", "left_ar");
      arrowLeft.setAttribute("aria-label", "Previous image");
      arrowLeft.classList.add("indexable_child");
      arrowLeft.style.width = "48px";
      arrowLeft.style.height = "29.64px";
      arrowLeft.style.cursor = "pointer";
      arrowLeft.style.position = "absolute";
      arrowLeft.style.left = 0;

      arrowLeft.onclick = function () {
        let placeMedia = document.querySelector(".placeItem");
        let newIndex = parseInt(placeMedia.id) - 1;
        if (newIndex === -1) {
          let lengthArray = allArray.length;
          let newMediaNext = allArray[lengthArray - 1];
          newIndex = allArray.findIndex((object) => {
            return object.id == newMediaNext.id;
          });
        }
        let newTitle = allArray[newIndex].title;
        placeMedia.setAttribute("id", newIndex);
        DisplayContentMedia(newTitle, true);
      };
      arrowLeft.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter' ) {
          arrowLeft.click();
            }
        });
        
      parent.appendChild(arrowLeft);
    } else {
      arrowRight.setAttribute("tabindex", "0");
      arrowRight.setAttribute("src", "./assets/icons/left-arrow.svg");
      arrowRight.setAttribute("alt", "Next image");
      arrowRight.setAttribute("aria-label", "Next image");
      arrowRight.setAttribute("id", "right_ar");
      arrowRight.classList.add("indexable_child");
      arrowRight.style.width = "48px";
      arrowRight.style.height = "29.64px";
      arrowRight.style.cursor = "pointer";
      arrowRight.style.position = "absolute";
      arrowRight.style.right = 0;
      arrowRight.style.transform = "rotate(-180deg)";

      arrowRight.onclick = function () {
        let placeMedia = document.querySelector(".placeItem");
        let newIndex = parseInt(placeMedia.id) + 1;
        let lengthArray = allArray.length;
        if (newIndex === lengthArray) {
          newIndex = 0;
        }
        let newTitle = allArray[newIndex].title;
        placeMedia.setAttribute("id", newIndex);
        DisplayContentMedia(newTitle, true);
      };
      arrowRight.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
          arrowRight.click();
            }
        });

      parent.appendChild(arrowRight);
    }
  }


  document.onkeydown = function(e) {
    let arrowRight=document.getElementById("right_ar");
    let arrowLeft= document.getElementById("left_ar");
    if(arrowRight || arrowLeft){
      switch (e.keyCode) {
        case 37:
          arrowLeft.click();
            break;
        case 39:
          arrowRight.click();
            break;
    }
    }
   
};

  //Afficher dans un le media sélectionné
  function DisplayContentMedia(title_media, already) {
    const placeMedia = document.querySelector(".placeItem");
    const id = allArray[placeMedia.id].id;
    const media_select_array = allArray.filter(
      (element) => element.id == id
    );
    let media_select = media_select_array[0];
    
    if (already) {//Already permet de savoir s'il faut vider le contenu actif pour ne pas dupliquer les affichages
      const titleTemp = document.getElementById("title_off");
      titleTemp.textContent = title_media;
      const videoTempChange = document.getElementById("VIDEO_CHANGE");
      const srcTempVideo = document.getElementById("TARGET_SRC_VD");
      const imageTempChange = document.getElementById("IMAGE_CHANGE");
      if (media_select.video) {//Media === video
        imageTempChange.style.display="none";
        srcTempVideo.setAttribute("src", ` ./assets/photographers/${takeGoodName(nameOfThePhotographer)}/${media_select.video}`);
        srcTempVideo.setAttribute("type", "video/mp4");
        srcTempVideo.setAttribute("controls", "");
        srcTempVideo.setAttribute('alt',title_media);
        videoTempChange.load();
        videoTempChange.style.display="flex";
      }else{//Media === image
        videoTempChange.style.display="none";
        imageTempChange.style.display="flex";
        imageTempChange.setAttribute('alt',title_media);
        imageTempChange.setAttribute("src",`./assets/photographers/${takeGoodName(nameOfThePhotographer)}/${media_select.image}`);
      }
    }else{//Création du premier contenu média
      const titles = document.createElement("h1"); //Titre média
      titles.style.fontWeight = 400;
      titles.style.fontSize = "24px";
      titles.style.lineHeight = 3;
      titles.style.margin = 0;
      titles.setAttribute("id","title_off");
      titles.textContent = title_media;
      const modal_into = document.getElementById("modal_photo_into");
      modal_into.setAttribute("aria-label", "image closeup view");
      const mediaAndInfo = document.createElement("section"); //Cette section contient tout le contenu qui doit switcher lorsqu'on change change de média
      mediaAndInfo.setAttribute("id", "toConsom");
      mediaAndInfo.style.display = "flex";
      mediaAndInfo.style.flexDirection = "column";
      mediaAndInfo.style.justifyContent = "flex-start";
  
      const contentImage=document.createElement("img");//Media IMAGE dans le modal  
      const contentVideo=document.createElement("video");//Media VIDEO dans le modal  
      const contentsMedia= [contentImage,contentVideo];
      for (let index = 0; index < contentsMedia.length; index++) {
        const mediaPossible = contentsMedia[index];
        mediaPossible.classList.add("indexable_child");
        mediaPossible.setAttribute("tabindex",0 );
        mediaPossible.style.width = "1050px";
        mediaPossible.style.height = "900px";
        mediaPossible.style.objectFit = "cover";
        mediaPossible.style.borderRadius = "5px";
        mediaPossible.style.display="none"; 
      }
      const src_video = document.createElement("source");
      contentVideo.setAttribute("id","VIDEO_CHANGE");
      contentImage.setAttribute("id","IMAGE_CHANGE");

      src_video.setAttribute("id","TARGET_SRC_VD"); 
      src_video.setAttribute("src","")
      contentVideo.appendChild(src_video);
      if (media_select.video) {
        contentVideo.style.display="flex";
        src_video.setAttribute("src", ` ./assets/photographers/${takeGoodName(nameOfThePhotographer)}/${media_select.video}`);
        src_video.setAttribute("type", "video/mp4");
        src_video.setAttribute('alt', title_media);
        contentVideo.setAttribute("controls", "");
      } else {
        contentImage.style.display="flex";
        contentImage.setAttribute('alt', title_media);
        contentImage.setAttribute("src",`./assets/photographers/${takeGoodName(nameOfThePhotographer)}/${media_select.image}`);
      }
      mediaAndInfo.appendChild(contentImage); //Media Image prêt
      mediaAndInfo.appendChild(contentVideo); //Media Video prêt
      mediaAndInfo.appendChild(titles); //Titre media
      modal_into.appendChild(mediaAndInfo); //Modal complete = mediaAndInfo = Media + Titre media
    }  
  }
