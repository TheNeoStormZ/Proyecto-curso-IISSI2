"use strict ";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let userId;

function main() {
  let photoContainer = document.querySelector("#photo-details-column");
  photosAPI
    .getById(photoId)
    .then((photos) => {
      let photoDetails = photoRenderer.asDetails(photos[0]);
      userId = photos[0].userId;
      photoContainer.appendChild(photoDetails);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
  let editBtn = document.querySelector("#button-edit");
  editBtn.onclick = handleEdit;
  getId();
}

function handleEdit(event) {
  window.location.href = "upload_picture.html?photoId=" + photoId;
  return false; //Forzamos a que se evalue antes
}

async function getId() {
  photosAPI
    .getById(photoId)
    .then((photos) => {
      userId = photos[0].userId;
      console.log("Done! User id: " + userId);
      hideActionsColumn();
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

function hideActionsColumn() {
  let actions_col = document.getElementById("actions-col");
  let add_comment = document.getElementById("add-comment");
  let photo_edit = document.getElementById("button-edit");

  console.log("My id:" + sessionManager.getLoggedId());
  console.log("User id:" + userId);
  console.log("Logica: "+ parseInt(sessionManager.getLoggedId()) === parseInt(userId));
  if (!(sessionManager.getLoggedId() == userId)) {
    photo_edit.style.display = "none";
  } if(!(sessionManager.isLogged())){
    actions_col.style.display = "none";
    add_comment.style.display = "none";
  }
  return false;
}
document.addEventListener("DOMContentLoaded", main);
