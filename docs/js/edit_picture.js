"use  strict";
import { photosAPI } from "/js/api/photos.js";
import { categoriesAPI } from "/js/api/categories.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let urlInput = document.getElementById("input-url");
let currentPhoto = null;

//Categories
let CategoriesSelect = document.getElementById("input-phcat");



function main() {
  getCategories();
  if (photoId !== null) {
    loadCurrentPhoto();
  }
  urlInput.addEventListener('change', UpdatePhotoView);

  let registerForm = document.getElementById("form-photo-upload");
  let deleteBtn = document.querySelector("#button-delete");
  registerForm.onsubmit = handleSubmitPhoto;
  deleteBtn.onclick = handleDelete;
}

function getCategories(){
  categoriesAPI
    .getAll()
    .then((categories) => {
     for (let i = 0; i<categories.length;i++){
     // console.log(categories[i].categoryName);
      var opt = document.createElement('option');
      opt.value = categories[i].categoryName;
      opt.innerHTML = categories[i].categoryName;
      CategoriesSelect.appendChild(opt);
     }
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

function sendCategroies(){
  let selectedValues = CategoriesSelect.selectedOptions;
  for (let i = 0;i<selectedValues.length;i++){
    let formData = new FormData();
    console.log(selectedValues[i].label);
    formData.append('categoryId', parseInt((i+1)));
    console.log(formData.getAll('categoryId'));
    //formData.append('photoId',  parseInt(photoId));
    categoriesAPI
    .addToPhoto(formData,photoId)
    .then((data) => (console.log("Success adding the cat to the photo")));
  }
  
}

  function handleSubmitPhoto(event) {
    event.preventDefault();
    sendCategroies();
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
  document.getElementById('myImage').src=urlInput.value;
}



document.addEventListener("DOMContentLoaded", main);
