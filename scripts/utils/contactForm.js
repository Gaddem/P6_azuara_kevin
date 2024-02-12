//Ouverture Modal Contact
function displayModal() {
  unfocusParentsTabindex();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift" }));
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  const overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const mail = document.getElementById("mail");
  const message = document.getElementById("message");
  //On vide les valeurs des champs du modal de contact
  firstName.value = "";
  lastName.value = "";
  mail.value = "";
  message.value = "";
}

//Fermeture Modal Contact
function closeModal(finish) {
  const modal = document.getElementById("contact_modal");
  const main = document.getElementById("main");
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  const overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  if (finish) {
    //Finish => se produit lorsqu'on envoie les données du modal contact
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const mail = document.getElementById("mail").value;
    const message = document.getElementById("message").value;
    let objectLog = {
      Prénom: firstName,
      Nom: lastName,
      Email: mail,
      Message: message,
    };
    console.log(objectLog);
  }
  focusParentsTabindex();
}

const icon_close_contact = document.getElementById("icon_close_contact");
const enter_contact = document.getElementById("enter_contact");

//A l'écoute du bonton entrée sur l'icon de fermeture pour effectuer son action 
icon_close_contact.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    icon_close_contact.click();
  }
});
//A l'écoute du bonton entrée sur le bouton d'envoi pour effectuer son action 
enter_contact.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    enter_contact.click();
  }
});
