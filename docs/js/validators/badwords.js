"use  strict";
import { messageRenderer } from "/js/renderers/messages.js";
import { commentsAPI } from "/js/api/comments.js";
const wordsValidator = {
  validateCommment: function (formData,userId,photoId) {
    let errors = [];
    formData.append("userId", userId);
    commentsAPI.create(formData,photoId)
 .then((data) => window.location.href = window.location.href)
 .catch((error) => {
     errors.push(error);
     messageRenderer.showErrorMessage(error);
 });
  },
};
export { wordsValidator };
