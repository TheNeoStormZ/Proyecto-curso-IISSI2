"use  strict";
import { sessionManager } from "/js/utils/session.js";
function main() {
  showUser();
  addLogoutHandler();
  hideHeaderOptions();
}

function showUser() {
  let title = document.getElementById("navbar-title");
  let text;
  if (sessionManager.isLogged()) {
    let username = sessionManager.getLoggedUser().username;
    text = "Hi, " + username;
  } else {
    text = "Guest";
  }
  title.textContent = text;
}

function addLogoutHandler() {
  let logoutButton = document.getElementById("navbar-logout");
  logoutButton.addEventListener("click", function () {
    sessionManager.logout();
    window.location.href = window.location.href;
  });
}

function hideHeaderOptions() {
  let headerLogout = document.getElementById("navbar-logout");
  let headerCreate = document.getElementById("navbar-create");
  let headerProfile = document.getElementById("navbar-profile");
  if (sessionManager.isLogged()) {

  } else {
    headerCreate.style.display = "none";
    headerLogout.style.display = "none";
    headerProfile.href="login.html";
    headerProfile.innerText="Log In";
    
  }
}

document.addEventListener("DOMContentLoaded", main);
