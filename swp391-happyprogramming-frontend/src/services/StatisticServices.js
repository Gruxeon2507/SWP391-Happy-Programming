import axios from "axios";
import api from "./BaseAuthenticationService.js";


class StatisticServices {

  //@maiphuonghoang 
  getAllCourseStatusCounts(){
    console.log(`http://localhost:1111/courseStatusCounts`);
    return api.get("/courseStatusCounts")
  }
  //@maiphuonghoang
  getCourseStatusCountsByCourseId(courseId){
    console.log(`http://localhost:1111/courseStatusCounts/mentor?courseId=${courseId}`);
    return api.get(`/courseStatusCounts/mentor?courseId=${courseId}`)
  }

}
export default new StatisticServices();
