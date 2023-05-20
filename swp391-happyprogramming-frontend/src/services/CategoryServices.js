import axios from "axios";
const CATEGORY_BASE_REST_API_URL = "http://localhost:1111/api/categories";

class CategoryServices {
  getAllCategories() {
    return axios.get(CATEGORY_BASE_REST_API_URL);
  }

  getCategoryByCourse(courseId) {
    return axios.get(CATEGORY_BASE_REST_API_URL + "/by-course/" + courseId);
  }
}

export default new CategoryServices();
