"use strict ";


import { galleryRenderer } from '/js/renderers/gallery.js';

function main() {

    let container = document.querySelector("div.container");

    let photos = [

        {
            title: " Samoyed ",
            description: "A very good boy. ",
            userName: "User1",
            userId: 1,
            averageStars: 4.3,
            likes: 25,
            comments: 100,
            url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
            date: " 15/08/2020 ",

        },

        {
            title: " Spanish tortilla ",
            description: " With onion ",
            userName: "User2",
            userId: 2,
            averageStars: 3.5,
            likes: 50,
            comments: 100000,
            url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
            date: " 01/01/2021 ",

        },

        {
            title: " Seville ",
            description: "The beautiful city of Seville ",
            userName: "TNS",
            userId: 3,
            averageStars: 4.9,
            likes: 35,
            comments: 56,
            url: "https://www.urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg ",
            date: " 03/02/2019 ",
        },

        {
            title: " Abstract art",
            description: " Clipart ",
            userName: "User4",
            userId: 4,
            averageStars: 4.2,
            likes: 12,
            comments: 45,
            url: "https://www.clipartart.com/images/worst-clipart-ever-1.jpg",
            date: " 14/08/2019 ",
        },

    ];

    let gallery = galleryRenderer.asCardGallery(photos);

    container.appendChild(gallery);

}

document.addEventListener("DOMContentLoaded", main);