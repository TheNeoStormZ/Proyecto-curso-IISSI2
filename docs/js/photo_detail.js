"use strict ";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
  let photoContainer = document.querySelector("#photo-details-column");
  photosAPI
    .getById(photoId)
    .then((photos) => {
      let photoDetails = photoRenderer.asDetails(photos[0]);
      photoContainer.appendChild(photoDetails);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
  let editBtn = document.querySelector("#button-edit");
  editBtn.onclick = handleEdit;
  hideActionsColumn();
}

function handleEdit(event) {
  window.location.href = "upload_picture.html?photoId=" + photoId;
  return false; //Forzamos a que se evalue antes
}

function hideActionsColumn() {
  let actions_col = document.getElementById("actions-col");
  let add_comment = document.getElementById("add-comment");
  if (!sessionManager.isLogged()) {
    actions_col.style.display = "none";
    add_comment.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", main);
