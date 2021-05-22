"use strict ";

import { usersAPI } from "/js/api/users.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";
import {profileRenderer} from "/js/renderers/profile.js";
import { messageRenderer } from "/js/renderers/messages.js";

let userId = sessionManager.getLoggedId();
let urlParams = new URLSearchParams(window.location.search);
let chosenUserId = urlParams.get("userId");
let aboutHeader = document.getElementById("about-header");
let galleryHeader = document.getElementById("gallery-header");

function main() {

    if (chosenUserId !==null){
      userId = chosenUserId;
      aboutHeader.innerHTML='About User <i class="fa fa-user" aria-hidden="true"></i>';
      galleryHeader.innerHTML='Gallery <i class="fa fa-clone" aria-hidden="true"></i>';
    }

    if (userId === null){
      window.location.href = "login.html";
    }

    let detailsContainer = document.getElementById("user-details");
    let photoContainer = document.getElementById("user-photos");
  usersAPI
    .getById(userId)
    .then((data) =>  {
        if(data[0].avatarUrl ===null){
            data[0].avatarUrl = "images/user1.svg";
        }

       let profile = profileRenderer.show(data[0]);
       detailsContainer.appendChild(profile);
      })
    .catch((error) => messageRenderer.showErrorMessage(error));

    photosAPI
    .getByUserId(userId)
    .then((photos) => {
      console.log(photos);
      let gallery = galleryRenderer.asProfile(photos);
      photoContainer.appendChild(gallery);
      let photoCount = document.getElementById("user-photos-count");
      let photoPrivateCount = document.getElementById("user-private-photos");
      let numPrivate = photos.filter(x => x.visibility==='Private');
      photoCount.textContent= photos.length + " photos uploaded";
      photoPrivateCount.textContent = numPrivate.length + " private photos"
    })
    .catch((error) => messageRenderer.showErrorMessage(error));

    
}

document.addEventListener("DOMContentLoaded", main);
