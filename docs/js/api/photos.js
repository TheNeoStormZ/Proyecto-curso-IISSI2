"use_strict";
import { BASE_URL, requestOptions } from "./common.js";
const photosAPI = {
  getAll: function () {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/photos`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },
  //Aqui obtiene el nombre de usuario junto con las fotos
  getAll2: function () {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/photosusers`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },
  getById: function (photoId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response.data.message));
    });
  },
};
export { photosAPI };
