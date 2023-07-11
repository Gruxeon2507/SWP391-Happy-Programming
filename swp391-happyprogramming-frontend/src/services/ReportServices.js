import axios from "axios";
import api from "./BaseAuthenticationService";
const REPORT_BASE_REST_API_URL = "http://localhost:1111/api";

class ReportServices {
  getAllReports() {}

  insertReport(report) {
    console.log("insert report at service called");
    api.post(`api/reports/create`, report);
  }
  getNoReportOfUser(username){
    console.log("api", username);
    api.get(`http://localhost:1111/api/reports/find/by-username/${username}`)
  }
}
export default new ReportServices();
