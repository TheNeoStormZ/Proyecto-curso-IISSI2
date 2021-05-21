"use strict ";

import { usersAPI } from "/js/api/users.js";
import { photosAPI } from "/js/api/photos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { sessionManager } from "/js/utils/session.js";
import {profileRenderer} from "/js/renderers/profile.js";
import { messageRenderer } from "/js/renderers/messages.js";

let userId = sessionManager.getLoggedId();

function main() {
    if(!sessionManager.isLogged()){
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
      let gallery = galleryRenderer.asProfile(photos);
      photoContainer.appendChild(gallery);
    })
    .catch((error) => messageRenderer.showErrorMessage(error));

    
}

document.addEventListener("DOMContentLoaded", main);
