"use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { sessionManager } from "/js/utils/session.js";
const profileRenderer = {

    renderer: function (comments) {
        let parent = parseHTML('<div class= "comments-generated"> </div >');
        for (let comment of comments){
            console.log(comment);
            let card = this.show(comment);
            parent.appendChild(card);
        }
        return parent;
    },

    show: function (comment) {
        let html =`              
        <div class="card mb-3">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <strong strong class="mr-1">
            Published by: <img src="/images/user.png" />
            <a href=user_profile.html?userId=${comment.userId}" class="user-name"></a>
            on ${comment.date}
          </strong>
          <div>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              title="Respond"
            >
              <i class="fa fa-share" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              title="Delete"
            >
            <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <blockquote class="blockquote">
            <p>
                ${comment.commentText}
            </p>
          </blockquote>
        </div>
      </div>`

      let card = parseHTML(html);
      loadUsernameCard(card, comment.userId);
      return card;
    },

};

function loadUsernameCard(card, userId) {
    usersAPI.getById(userId).then((users) => {
      let username = users[0].username;
      let p = card.querySelector("a.user-name");
      p.textContent = "@" + username;
    });
  }

export {profileRenderer};