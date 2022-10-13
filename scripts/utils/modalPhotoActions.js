function closeModalPhoto() {
    const overlay = document.getElementById("overlay");
    const modal = document.getElementById("modal_photo");
    const modalInto = document.getElementById("modal_photo_into");
    
    modal.style.display ="none";
    overlay.style.display = "none";
    modalInto.innerHTML = '';
    // console.log(TakeGoodName(namePhotographer))  
}
