"use_strict";

import { BASE_URL, requestOptions } from "./common.js";
const categoriesAPI = {
  getAll: function () {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/categories`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },

  
  create: function (formData) {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${BASE_URL}/categories`, formData, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },

  addToPhoto: function (formData,photoId) {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${BASE_URL}/photos/${photoId}/categories`, formData, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },


};
export { categoriesAPI };