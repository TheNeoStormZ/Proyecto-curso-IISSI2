"use strict ";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
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
}

function handleEdit(event) {
  window.location.href = "upload_picture.html?photoId=" + photoId;
  return false; //Forzamos a que se evalue antes
}
document.addEventListener("DOMContentLoaded", main);
