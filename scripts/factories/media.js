function mediaFactory(data, arrayComplete) {
  const {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    namePhotographer,
    video,
  } = data;

  //Fonction qui retourn le nom du photographe tout à le modifiant pour qu'il soit similaire aux Fichiers
  const media_general = `./assets/photographers/${takeGoodName(
    namePhotographer
  )}/${image || video}`; //ancien picture
  const type = image ? "image" : "video";
  //Création card d'un média
  function getMediaCardDOM() {
    if (image || video) {
      const article = document.createElement("article");
      article.setAttribute("tabindex", "0");
      article.classList.add("indexable_parent");
      article.setAttribute("id", id);

      switch (type) {
        //Affichage d'un média image
        case "image":
          const link_image = document.createElement("div");
          link_image.onclick = function () {
            openModalPhoto(id, title);
          };
          article.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (
              event.key === "Enter" &&
              !like_part.contains(document.activeElement)
            ) {
              link_image.click();
            }
            article.focus();
          });
          const img = document.createElement("img");
          img.setAttribute("alt", `Image ${title}`);
          img.setAttribute("src", media_general);

          img.style.width = "350px";
          img.style.height = "300px";
          img.style.borderRadius = "5px";
          img.style.objectFit = "cover";
          img.style.cursor = "pointer";

          link_image.appendChild(img);
          article.appendChild(link_image);
          break;
        //Affichage d'un média vidéo
        case "video":
          const link_video = document.createElement("div");
          const video = document.createElement("video");
          const src_video = document.createElement("source");
          video.setAttribute("alt", `Video ${title}`);
          link_video.onclick = function () {
            openModalPhoto(id, title);
          };
          article.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (
              event.key === "Enter" &&
              !like_part.contains(document.activeElement)
            ) {
              link_video.click();
            }
            article.focus();
          });
          src_video.setAttribute("src", media_general);
          src_video.setAttribute("type", "video/mp4");

          video.style.width = "350px";
          video.style.height = "300px";
          video.style.borderRadius = "5px";
          video.style.objectFit = "cover";
          video.style.cursor = "pointer";
          video.setAttribute("tabindex", "-1");
          video.appendChild(src_video);
          link_video.appendChild(video);
          article.appendChild(link_video);
          break;
        default:
          break;
      }

      const section_foot = document.createElement("section");
      const title_article = document.createElement("h1");

      section_foot.setAttribute("id", "section_foot");

      title_article.textContent = title;
      title_article.style.fontWeight = 400;
      title_article.style.margin = 0;
      title_article.style.fontStyle = "24px";
      title_article.style.fontStyle = "31.25px";

      //partie like et son icon
      const like_part = document.createElement("div");

      like_part.setAttribute("id", "like_part");

      //nombre like
      const nblike_article = document.createElement("h1");
      nblike_article.setAttribute("id", image || video);
      nblike_article.textContent = likes;
      nblike_article.style.fontWeight = 500;
      nblike_article.style.margin = 0;
      nblike_article.style.fontStyle = "24px";
      nblike_article.style.fontStyle = "31.25px";

      //icone coeur
      const link_like = document.createElement("div");
      link_like.onclick = function () {
        let media = image ? image : video;
        likeMedia(media, likes);
      };
      like_part.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "Enter") {
          let media = image ? image : video;
          likeMedia(media, likes);
        }
      });

      const icon_like = document.createElement("img");
      icon_like.setAttribute("src", "./assets/icons/heart_red.svg");
      icon_like.setAttribute("alt", "likes");
      icon_like.style.width = "17.5px";
      icon_like.style.height = "18.35px";
      icon_like.style.marginLeft = "4px";

      link_like.appendChild(icon_like); //Icone coeur pour like -> attribué à la div qui link_like qui possède la fonction d'incrémentation de like
      like_part.setAttribute("tabindex", "0");
      like_part.appendChild(nblike_article); //Compteur de like au media
      like_part.appendChild(link_like); //Système de like sous forme d'icone coeur
      //like part = Coeur + compteur like

      section_foot.appendChild(title_article);
      section_foot.appendChild(like_part);
      article.appendChild(section_foot);
      article.addEventListener("focusin", function (event) {
        if (!like_part.contains(document.activeElement)) {
          like_part.focus();
        } else {
          article.focus();
        }
      });
      return article;
    }
  }
  return { getMediaCardDOM };
}
