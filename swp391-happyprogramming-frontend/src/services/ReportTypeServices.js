import axios from "axios";
import api from "./BaseAuthenticationService";
const REPORT_TYPE_BASE_REST_API_URL = "http://localhost:1111/api";

class ReportTypeServices {
    getAllReportTypes(){
        return axios.get(`${REPORT_TYPE_BASE_REST_API_URL}/report-types/`)
    }
}
export default new ReportTypeServices();