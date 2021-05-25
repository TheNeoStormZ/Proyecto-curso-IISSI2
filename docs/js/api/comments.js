"use_strict";

import { BASE_URL, requestOptions } from "./common.js";
const commentsAPI = {
  getById: function (photoId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/photos/${photoId}/comments`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },

  getByIdCount: function (photoId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/photos/${photoId}/comments/count`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },

    create: function (formData,photoId) {
      return new Promise(function (resolve, reject) {
        axios
          .post(`${BASE_URL}/photos/${photoId}/comments`, formData, requestOptions)
          .then((response) => resolve(response.data))
          .catch((error) => reject(error.response.data.message));
      });
  },
};
export { commentsAPI };