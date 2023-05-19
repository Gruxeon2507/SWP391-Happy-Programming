import axios from "axios";
import api from "./BaseAuthenticationService";

class FeatureServices {
  getUserFeature() {
    return api.get("/api/feature/all");
  }
}

export default new FeatureServices();