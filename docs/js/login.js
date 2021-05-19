"use  strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI } from "/js/api/auth.js";

function main() {
  let loginForm = document.getElementById("login-form");
  loginForm.onsubmit = handleSubmitLogin;
}

function handleSubmitLogin(event) {
  event.preventDefault();
  let form = event.target;
  let formData = new FormData(form);
  let errors = [];
  if (errors.length === 0) {
    sendLogin(formData);
  } else {
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";
    for (let error of errors) {
      messageRenderer.showErrorMessage(error);
    }
  }
}

function sendLogin(formData) {
  authAPI
    .login(formData)
    .then((loginData) => {
      let sessionToken = loginData.sessionToken;
      let loggedUser = loginData.user;
      sessionManager.login(sessionToken, loggedUser);
      window.location.href = "index.html";
    })
    .catch((error) => messageRenderer.showErrorMessage(error));
}

document.addEventListener("DOMContentLoaded", main);
