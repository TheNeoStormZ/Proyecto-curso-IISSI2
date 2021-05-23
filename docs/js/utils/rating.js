"use strict ";
import { ratingsAPI } from "/js/api/ratings.js";

const ratingUTILS = {

//OLD LOCAL VERSION
getMeanRatev1: function (photoId)  {
  let maxSum = 0;
  let mean = 0;
  return ratingsAPI.getByPhoto(photoId).then((ratings) => {
    for (var i in ratings) {
      console.log(ratings[i].ratingValue);
      maxSum += ratings[i].ratingValue;
    }
    console.log("sum: " + maxSum);
    mean = (maxSum / ratings.length);
    return mean;
  }).catch((error) =>  {
    return 0;
  });
},

//NEW SERVER-SIDE VERSION
getMeanRate: function (photoId)  {
  return ratingsAPI.getByPhotoMean(photoId).then((mean) => {
    if (mean[0].average === null){
      return 0;
    }
    return mean[0].average;
  }).catch((error) =>  {
    return 0;
  });
},
};

export {ratingUTILS};

