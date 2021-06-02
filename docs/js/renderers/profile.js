"use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { sessionManager } from "/js/utils/session.js";

const profileRenderer = {
    show: function (profile) {
        //console.log(profile);
        let myId = sessionManager.getLoggedId();
        let html;
      if (profile.secondSurname === null){
        profile.secondSurname ="";
      }
      if (myId === profile.userId){
        html = 
        `<div class="row text-left">
        <div class="col-md" id="user-info-column">
          <img src=${profile.avatarUrl} alt="User photo" class="user-photo mb-3" />
          <p class="text-left" id="user-name">${profile.username} </p>
          <a href="user_profile_edit.html"><button class="btn btn-outline-primary my-2 my-sm-0" type="submit">
            Edit Profile
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        </a>
        </div>
        <div class="col-md" id="user-details-column">
          <p class="text-left" id="user-real-name">${profile.firstName} ${profile.lastName} ${profile.secondSurname}</p>
          <p class="text-left" id="email">${profile.email}</p>
        </div>
        <div class="col-md" id="user-info-column">
          <img src="images/gallery.svg" alt="User photo" class="user-photo" />
        </div>
  
        <div class="col-md" id="user-photo-counts-column">
          <p class="text-left" id="user-photos-count">6 photos uploaded</p>
          <p class="text-left" id="user-private-photos">6 private photos</p>
        </div>
      </div>`;
      } else {
        html = 
      `<div class="row text-left">
      <div class="col-md" id="user-info-column">
        <img src=${profile.avatarUrl} alt="User photo" class="user-photo mb-3" />
        <p class="text-left" id="user-name">${profile.username} </p>
      </div>
      <div class="col-md" id="user-details-column">
        <p class="text-left" id="user-real-name">${profile.firstName} ${profile.lastName} ${profile.secondSurname}</p>
        <p class="text-left" id="email">${profile.email}</p>
      </div>
      <div class="col-md" id="user-info-column">
        <img src="images/gallery.svg" alt="User photo" class="user-photo" />
      </div>

      <div class="col-md" id="user-photo-counts-column">
        <p class="text-left" id="user-photos-count">6 photos uploaded</p>
        <p class="text-left" id="user-private-photos">6 private photos</p>
      </div>
    </div>`;
      }
      
  
      let card = parseHTML(html);
      return card;
    }
}
export { profileRenderer };