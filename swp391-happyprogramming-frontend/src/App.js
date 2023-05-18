import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Componentss
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Chat from "./Pages/Chat/Chat";
import Setting from "./Pages/Setting/Setting";
import Homepage from "./Pages/Homepage/Homepage";
import CourseCreate from "./Pages/CourseCreate/CourseCreate";
//CSS
// import "./global/global.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/homepage" element={<Homepage></Homepage>} />

      <Route path="/chat" element={<Chat></Chat>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/setting" element={<Setting></Setting>} />
      <Route path="/creCourse" element={<CourseCreate></CourseCreate>} />
    </Routes>
  );
}

export default App;
