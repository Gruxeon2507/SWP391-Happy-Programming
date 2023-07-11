import axios from "axios";
import api from "./BaseAuthenticationService";
const REPORT_BASE_REST_API_URL = "http://localhost:1111/api";

class ReportServices {
  getAllReports() {}

  insertReport(report) {
    console.log("insert report at service called");
    api.post(`api/reports/create`, report);
  }

}
export default new ReportServices();
