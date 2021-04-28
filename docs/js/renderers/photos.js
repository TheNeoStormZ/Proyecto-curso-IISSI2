"use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
  asCard: function (photo) {
    let html = `<div class= " col-md">
                  <div class="photo-block">
                    <div class= "card">
                    <div class="card-horizontal">
                    <a href= "photo_detail.html">
                    <img src= "${photo.url}" class= " card-img-top ">
                    </a >
                    <div class= " card-body ">
                    <h5 class= " card-title text-center ">${photo.title}
                    </h5 >
                    <p class= " text-center ">${photo.description}</p>
                    <p class= " text-left ">Published by: <img src="/images/user.png"> <a href= "user_profile.html">${photo.userName}</a></p >
                    <p class= " text-left "><img src="/images/clock.png"> Photo published on: ${photo.date}</p >
                    <p class= " text-left "><img src="/images/star.png"> ${photo.averageStars} stars average</p >
                    <p class= " text-left "><img src="/images/dialog.png"> ${photo.likes} likes and ${photo.comments} comments</p>
                    </div >
                    </div >
                    </div>
                    </div>
                    </div >`;
    let card = parseHTML(html);

    return card;
  },
  asDetails: function ( photo ) {
    let html = `<div class= "photo-details">
    <h3 >${ photo.title } </h3 >
    <h6 >${ photo.description } </h6 >
    <p class= " text-left ">Published by: <img src="/images/user.png"> <a href= "user_profile.html " class= "user-link ">${photo.userName}</a></p >
    <p class= " text-left "><img src="/images/clock.png"> Photo published on: ${photo.date}</p >
    <hr >
    <img src= "${ photo.url }" class= "img-fluid">
    <p class= " text-right "><img src="/images/star.png"> ${photo.averageStars} stars average</p >
    <p class= " text-right "><img src="/images/dialog.png"> ${photo.likes} likes and ${photo.comments} comments</p>
    </div >`;
    let photoDetails = parseHTML (html);
    return photoDetails;
    },
};

export { photoRenderer };
