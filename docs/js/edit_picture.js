"use  strict";
import { photosAPI } from "/js/api/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let urlInput = document.getElementById("input-url");
let currentPhoto = null;

function main() {
  if (photoId !== null) {
    loadCurrentPhoto();
  }

  urlInput.addEventListener('change', UpdatePhotoView);

  let registerForm = document.getElementById("form-photo-upload");
  let deleteBtn = document.querySelector("#button-delete");
  registerForm.onsubmit = handleSubmitPhoto;
  deleteBtn.onclick = handleDelete;
}

  function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    if (currentPhoto === null) {
      //  Creating a new  photo// Add the  current  user's ID
      formData.append("userId", sessionManager.getLoggedId());
      photosAPI
        .create(formData)
        .then((data) => (window.location.href = "index.html"))
        .catch((error) => messageRenderer.showErrorMessage(error));
    } else {
      //  Updating  an  existing  photo
      formData.append("userId", sessionManager.getLoggedId());
      formData.append("date", currentPhoto.date);
      photosAPI
        .update(photoId, formData)
        .then((data) => (window.location.href = "index.html"))
        .catch((error) => messageRenderer.showErrorMessage(error));
    }
  }
function handleDelete(event) {
  let answer = confirm("Do you  really  want to  delete  this  photo?");
  if (answer) {
    photosAPI
      .delete(photoId)
      .then((data) => (window.location.href = "index.html"))
      .catch((error) => messageRenderer.showErrorMessage(error));
  }
}
function loadCurrentPhoto() {
  let titleInput = document.getElementById("input-title");
  let descriptionInput = document.getElementById("input-description");
  let visibilityInput = document.getElementById("input-visibility");
  document.getElementById("button-delete").style.display="inline";

  photosAPI
    .getById(photoId)
    .then((photos) => {
      currentPhoto = photos[0];
      document.getElementById('myImage').src=currentPhoto.url;
      urlInput.value = currentPhoto.url;
      titleInput.value = currentPhoto.title;
      descriptionInput.value = currentPhoto.description;
      visibilityInput.value = currentPhoto.visibility;
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

function UpdatePhotoView(){
  console.log("Hello guys");
  document.getElementById('myImage').src=urlInput.value;
}



document.addEventListener("DOMContentLoaded", main);
