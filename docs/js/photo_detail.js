"use strict ";
import { photoRenderer } from "/js/renderers/photos.js ";
function main() {
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
}
document.addEventListener("DOMContentLoaded", main);
