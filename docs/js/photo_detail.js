"use strict ";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { ratingsAPI } from "/js/api/ratings.js";
import { ratingUTILS } from "/js/utils/rating.js"

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let photoContainer = document.querySelector("#photo-details-column");
let userId;
let myUserId = sessionManager.getLoggedId();
let ratingInput = document.getElementById("rating-input");
let globalRatingId;

function main() {
  rednderPhoto();
  loadRating();
  let editBtn = document.querySelector("#button-edit");
  let rateForm = document.getElementById("rating-form");
  editBtn.onclick = handleEdit;
  rateForm.onsubmit = handleRate;
  
}

function loadRating() {
  ratingsAPI.getByPhotoUser(photoId,myUserId).then((rating) => {
    console.log(rating);
    ratingInput.value = rating[0].ratingValue;
    globalRatingId = rating[0].ratingId;
  }).catch ((error) => {
    ratingInput.value = 1;
    globalRatingId = -1;
  })
}

function rednderPhoto(){
  
  photosAPI
    .getById(photoId)
    .then((photos) => {
      let photoDetails = photoRenderer.asDetails(photos[0]);
      userId = photos[0].userId;
      hideActionsColumn();
      photoContainer.appendChild(photoDetails);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

function handleEdit(event) {
  window.location.href = "upload_picture.html?photoId=" + photoId;
  return false; //Forzamos a que se evalue antes
}
function handleRate(event) {
  event.preventDefault();
  let form = event.target;
  console.log(form);
  console.log("Dev: " + globalRatingId);

  let formData = new FormData(form);
  if (globalRatingId === -1){
    formData.append("photoId", photoId);
    formData.append("userId", myUserId);
    ratingsAPI.create(formData)
    .then((data) => (window.location.href = window.location.href))
    .catch((error) => messageRenderer.showErrorMessage(error));
  } else {
    ratingsAPI.update(globalRatingId,formData)
    .then((data) => (window.location.href = window.location.href))
    .catch((error) => messageRenderer.showErrorMessage(error));
  }
    
}
function hideActionsColumn() {
  let actions_col = document.getElementById("actions-col");
  let add_comment = document.getElementById("add-comment");
  let photo_edit = document.getElementById("button-edit");

  console.log("My id:" + myUserId);
  console.log("User id:" + userId);
  console.log("Logica: "+ parseInt(myUserId === parseInt(userId)));
  if (!(sessionManager.getLoggedId() == userId)) {
    photo_edit.style.display = "none";
  } if(!(sessionManager.isLogged())){
    actions_col.style.display = "none";
    add_comment.style.display = "none";
  }
  return false;
}
document.addEventListener("DOMContentLoaded", main);
