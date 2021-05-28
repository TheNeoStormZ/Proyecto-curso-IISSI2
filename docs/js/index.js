"use strict ";

import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);

let galleryContainer = document.querySelector("div.container");

let categorySearch = urlParams.get("category");
let myHeader = document.getElementById("myHeader");

function main() {
  let button = document.getElementById("test-button");
  button.onclick = clickHandler;
  if (categorySearch === null){
    renderAll();
  } else {
    myHeader.innerHTML ='Search Results <img src="images/search2.png" alt="Search"/></i>',
    renderCat();
  }  
}

function renderAll(){
  photosAPI
    .getAll()
    .then((photos) => {
      let gallery = galleryRenderer.asCardGallery(photos);
      galleryContainer.appendChild(gallery);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));

}

function renderCat(){
  photosAPI
    .getByCat(categorySearch)
    .then((photos) => {
      let gallery = galleryRenderer.asCardGallery(photos);
      galleryContainer.appendChild(gallery);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));

}

function clickHandler(event) {
  let target = event.target;
  let text = target.textContent;
  alert(text + "no implementado");
}

document.addEventListener("DOMContentLoaded", main);
