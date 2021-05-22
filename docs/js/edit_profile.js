"use  strict";
import { usersAPI } from "/js/api/users.js";
import { sessionManager } from "/js/utils/session.js";
import { userValidator } from "/js/validators/users.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { authAPI } from "/js/api/auth.js";

let userId = sessionManager.getLoggedId();

function main() {
  let registerForm = document.getElementById("user-edit");
  let userPhoto = document.getElementById("user-photo");
  let realName = document.getElementById("real-name");
  let fisrtSurname = document.getElementById("first-surname-input");
  let secondSurname = document.getElementById("second-surname-input");
  let email = document.getElementById("e-mail");
  let username = document.getElementById("username");
  let picture = document.getElementById("avatarUrl");

  registerForm.onsubmit = handleSubmitEdit;

  usersAPI
    .getById(userId)
    .then((data) => {
      if(data[0].avatarUrl ===null){
        data[0].avatarUrl = "images/user1.svg";
    }
      let currentProfile = data[0];
      console.log(currentProfile);
      userPhoto.src = currentProfile.avatarUrl;
      realName.value = currentProfile.firstName;
      fisrtSurname.value = currentProfile.lastName;
      secondSurname.value = currentProfile.secondSurname;
      email.value = currentProfile.email;
      username.value = currentProfile.username;
      picture.value = currentProfile.avatarUrl;

    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

function handleSubmitEdit(event) {
  event.preventDefault();
  let form = event.target;
  let formData = new FormData(form);
  let errors = userValidator.validateRegister(formData);
  if (errors.length === 0) {
    sendUpdate(formData);
  } else {
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    for (let error of errors) {
      messageRenderer.showErrorMessage(error);
    }
  }

}

function sendUpdate(formData) {
    authAPI
    .update(userId, formData)
    .then((data) => (window.location.href = "user_profile.html"))
    .catch((error) => messageRenderer.showErrorMessage(error));
  }

document.addEventListener("DOMContentLoaded", main);
