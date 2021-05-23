"use_strict";
import { BASE_URL, requestOptions } from "./common.js";

const ratingsAPI = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
          axios
            .get(`${BASE_URL}/ratings`, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },

      getByPhoto: function (photoId) {
        return new Promise(function (resolve, reject) {
          axios
            .get(`${BASE_URL}/ratings/${photoId}`, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },

      getByPhotoUser: function (photoId,userId) {
        return new Promise(function (resolve, reject) {
          axios
            .get(`${BASE_URL}/ratings/${photoId}/${userId}`, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },

      getByPhotoMean: function (photoId) {
        return new Promise(function (resolve, reject) {
          axios
            .get(`${BASE_URL}/ratings/avg/${photoId}`, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },

      create: function (formData) {
        return new Promise(function (resolve, reject) {
          axios
            .post(`${BASE_URL}/ratings`, formData, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },

      update: function (ratingId, formData) {
        return new Promise(function (resolve, reject) {
          axios
            .put(`${BASE_URL}/ratings/${ratingId}`, formData, requestOptions)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error.response.data.message));
        });
      },
      
};

export { ratingsAPI };