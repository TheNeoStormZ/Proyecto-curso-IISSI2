"use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";
import { usersAPI } from "/js/api/users.js";
import { commentsAPI } from "/js/api/comments.js";
import { ratingUTILS } from "/js/utils/rating.js";
import { categoriesAPI } from "/js/api/categories.js";

const photoRenderer = {
  asCard: function (photo) {
    let html = `<div class= " col-md">
                  <div class="photo-block">
                    <div class= "card">
                    <div class="card-horizontal">
                    <a href="photo_detail.html?photoId=${photo.photoId}">
                    <img src="${photo.url}" class="card-img-top">
                    </a>
                    <div class= " card-body ">
                    <h5 class= " card-title text-center ">${photo.title}
                    </h5 >
                    <p class= " text-center ">${photo.description}</p>
                    <p class= " text-left">Published by: <img src="/images/user.png"> <a href= "user_profile.html?userId=${photo.userId}" class="user-name"></a></p >
                    <p class= " text-left "><img src="/images/clock.png"> Photo published on: ${photo.date}</p >
                    <p class= " text-left " id="rating"><img src="/images/star.png"> <a class="rating"></a> stars average</p >
                    <p class= " text-left "><img src="/images/dialog.png"> <a class="count"></a> comments</p>
                    <p class= " text-left "><img src="/images/category.png"> <strong>Categories: </strong> <a class="categories"></a></p>
                    </div >
                    </div >
                    </div>
                    </div>
                    </div >`;

    let card = parseHTML(html);
    loadUsernameCard(card, photo.userId);
    loadCommentsCountCard(card, photo.photoId);
    loadRating(card, photo.photoId);
    loadCategoriesCard(card, photo.photoId);
    
    return card;
  },
  asDetails: function (photo) {
    let html = `<div class= "photo-details">
    <h3 >${photo.title} </h3 >
    <h6 >${photo.description} </h6 >
    <p class= " text-left ">Published by: <img src="/images/user.png"> <a href= "user_profile.html?userId=${photo.userId}" class= "user-name">${photo.username}</a></p >
    <p class= " text-left "><img src="/images/clock.png"> Photo published on: ${photo.date}</p >
    <p class= " text-left "><img src="/images/category.png"> <strong>Categories: </strong> <a class="categories"></a></p>
    <hr >
    <img src= "${photo.url}" class= "img-fluid">
    <p class= " text-right "><img src="/images/star.png"> <a class="rating"></a> stars average</p >
    <p class= " text-right "><img src="/images/dialog.png"> <a class="count"></a> comments</p>
    </div >`;
    let card = parseHTML(html);
    loadUsernameCard(card, photo.userId);
    loadRating(card, photo.photoId);
    loadCommentsCountCard(card, photo.photoId);
    loadCategoriesCard(card, photo.photoId);
    return card;
  },

  asLittleCard: function (photo) {
    let html = `
    <div class= " col-md">

    <div class="card">
    <a href="photo_detail.html?photoId=${photo.photoId}">
        <img
          src="${photo.url}"
          alt="photo1"
          class="user-displayed-photo"
        />
    </a>
      <h4 class="text-center">${photo.title}</h4>
      <div class="card-footer">
        <small class="text-muted">${photo.visibility} photo</small>
      </div>
    </div>
    </div>`;

    let card = parseHTML(html);
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

function loadRating(card, photoId) {
  ratingUTILS.getMeanRate(photoId).then((rating) => {
    let p = card.querySelector("a.rating");
    p.textContent = rating;
  })
}

function loadCommentsCountCard(card, photoId) {
  commentsAPI.getByIdCount(photoId).then((count) => {
    //console.log(count[0].countValue);
   let p = card.querySelector("a.count");
   p.textContent = count[0].countValue;
  });
}

function loadCategoriesCard(card, photoId) {
  let parent =  card.querySelector("a.categories");
  //console.log(parent);
 // let text = parseHTML('<strong>Categories: </strong>');
 // parent.appendChild(text);
  categoriesAPI.getByPhotoNamed(photoId).then((categories) => {
    if (categories.length === 0){
      let categoryHTML = parseHTML("<a>None</a>");
      parent.appendChild(categoryHTML);
    }
    for (let i=0; i<categories.length;i++){
        //console.log(categories[i]);
        let categoryHTML = parseHTML('<a class="cat-class" href=index.html?category=' + categories[i].categoryName + '>' + categories[i].categoryName + ' </a>');
        parent.appendChild(categoryHTML);
    }
  });
}

export { photoRenderer };
