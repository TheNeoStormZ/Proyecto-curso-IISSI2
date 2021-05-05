"use strict ";
import { photosAPI } from "/js/api/photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
  /*
  let photoContainer = document.querySelector("#photo-details-column");
  let photo = {
    title: " Samoyed ",
    description: "A very good boy. ",
    userName: "lightbringer",
    userId: 1,
    averageStars: 4.3,
    likes: 25,
    comments: 3,
    url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg ",
    date: " 15/08/2020 ",
  };
  let photoDetails = photoRenderer.asDetails(photo);
  photoContainer.appendChild(photoDetails);
  */

  let photoContainer = document.querySelector("#photo-details-column");
  photosAPI
    .getById(photoId)
    .then((photos) => {
      let photoDetails = photoRenderer.asDetails(photos[0]);
      photoContainer.appendChild(photoDetails);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}
document.addEventListener("DOMContentLoaded", main);
