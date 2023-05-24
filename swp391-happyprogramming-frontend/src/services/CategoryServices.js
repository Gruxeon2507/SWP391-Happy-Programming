import axios from "axios";
import api from "./BaseAuthenticationService";
const CATEGORY_BASE_REST_API_URL = "http://localhost:1111/api";

class CategoryServices {
  getAllCategories() {
    return axios.get(CATEGORY_BASE_REST_API_URL + "/public/categories/all");
  }

  getCategoryByCourse(courseId) {
    return axios.get(CATEGORY_BASE_REST_API_URL + "/by-course/" + courseId);
  }

  saveCourseCategory(courseId, categoryIds) {
    categoryIds.forEach((categoryId) => {
      axios.post(
        CATEGORY_BASE_REST_API_URL +
          "/insert?courseId=" +
          courseId +
          "&categoryId=" +
          categoryId
      );
    });
  }
}

export default new CategoryServices();
