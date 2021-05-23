"use strict ";
import { ratingsAPI } from "/js/api/ratings.js";

const ratingUTILS = {

getMeanRate: function (photoId)  {
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
}

export {ratingUTILS};

