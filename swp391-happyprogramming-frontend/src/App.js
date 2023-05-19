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
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
//CSS
// import "./global/global.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/chat" element={<Chat></Chat>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/setting" element={<Setting></Setting>} />
      <Route path="/forgetpassword" element={<ForgetPassword></ForgetPassword>}/>
      <Route path="/resetpassword" element={<ResetPassword></ResetPassword>}/>
      <Route path="/profile/:id" element={<ViewProfile></ViewProfile>}/>
    </Routes>
  );
}

export default App;
