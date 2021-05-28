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
  let createBtn = document.getElementById("button-create");
  registerForm.onsubmit = handleSubmitPhoto;
  deleteBtn.onclick = handleDelete;
  createBtn.onclick = createCat;
}

function getCategories(){
  categoriesAPI
    .getAll()
    .then((categories) => {
     for (let i = 0; i<categories.length;i++){
     // //console.log(categories[i].categoryName);
      var opt = document.createElement('option');
      opt.value = categories[i].categoryName;
      opt.innerHTML = categories[i].categoryName;
      opt.id = "opt" + i;
      CategoriesSelect.appendChild(opt);
     }
     previouslySelected();

    })
    .catch((error) => messageRenderer.showErrorMessage(error));
    return false;
}

function previouslySelected(){
  categoriesAPI
  .getByPhoto(photoId)
  .then((categories) => {
   for (let i = 0; i<categories.length;i++){
   // //console.log(categories[i].categoryName);
   let id = parseInt(categories[i].categoryId);
   document.getElementById("opt" + (id-1)).selected = true;
   }
  })
  .catch((error) => messageRenderer.showErrorMessage(error));
  return false;
}

function purgePhotoAndSend(){
  categoriesAPI.purgePhoto(photoId).then((data) => {
    //console.log("purge ok");
    let selectedValues = CategoriesSelect.selectedOptions;
    //console.log(selectedValues);
    console.log("selectedValues");
    console.log(selectedValues.length);
    sendCategroies(selectedValues);
});
}

function sendCategroies(selectedValues){
  //Time to reboot - Wait until all categories are saved
  let itsTimeToReboot = 0;
  let myTime = selectedValues.length;
  if(selectedValues.length === 0){
    window.location.href = "index.html";
  }
  for (let i = 0;i<selectedValues.length;i++){
    let formData = new FormData();
    //console.log(selectedValues[i].label);
    let id = selectedValues[i].id.replace("opt","");
    //console.log(id);
    let numId = parseInt((id))+1;
    formData.append('categoryId', numId);
    //console.log(formData.getAll('categoryId'));
    //formData.append('photoId',  parseInt(photoId));
    categoriesAPI
    .addToPhoto(formData,photoId)
    .then((data) => {
      //console.log("Success adding the cat to the photo");
      itsTimeToReboot++;
      if (parseInt(itsTimeToReboot) === parseInt(myTime)){
       window.location.href = "index.html";
      }
    }
    ).catch((error) => messageRenderer.showErrorMessage(error));
  }
  return false;
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
        .then((data) => {
          //console.log(data);
          photoId = data.lastId;
          let selectedValues = CategoriesSelect.selectedOptions;
          console.log("selectedValues");
          console.log(selectedValues.length);
          sendCategroies(selectedValues);
      }
        )
        .catch((error) => messageRenderer.showErrorMessage(error));
    } else {
      //  Updating  an  existing  photo
      formData.append("userId", sessionManager.getLoggedId());
      formData.append("date", currentPhoto.date);
      photosAPI
        .update(photoId, formData)
        .then((data) =>  {
          purgePhotoAndSend();
      })
        .catch((error) => messageRenderer.showErrorMessage(error));
    }
    return false;
  }
function handleDelete(event) {
  let answer = confirm("Do you  really  want to  delete  this  photo?");
  if (answer) {
    photosAPI
      .delete(photoId)
      .then((data) => (window.location.href = "index.html"))
      .catch((error) => messageRenderer.showErrorMessage(error));
  }
  return false;
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

    return false;
}

function UpdatePhotoView(){
  document.getElementById('myImage').src=urlInput.value;
  return false;
}

function createCat(){
  let newCat = document.getElementById("new_cat");
  let formData = new FormData();
  //console.log(newCat);
  //console.log(newCat.value);
  formData.append('categoryName',newCat.value);
  categoriesAPI.create(formData).then((data) => {
    //console.log("create ok");
    window.location.href = window.location.href;

}).catch((error) => messageRenderer.showErrorMessage(error));;
}

document.addEventListener("DOMContentLoaded", main);
