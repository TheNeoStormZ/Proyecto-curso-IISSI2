"use strict ";

import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { messageRenderer } from "/js/renderers/messages.js";



function main() {
  let button = document.getElementById("test-button");
  button.onclick = clickHandler;

  let galleryContainer = document.querySelector("div.container");

  photosAPI
    .getAll()
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
