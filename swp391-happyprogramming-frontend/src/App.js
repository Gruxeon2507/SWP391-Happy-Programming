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
import React from "react";
import { useEffect, useState } from "react";
import userProfile from "./Pages/UserProfile/userProfile";
import api from "./services/BaseAuthenticationService";
//CSS
// import "./global/global.css";
function App() {
  const [features, setFeatures] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get("api/feature/all")
      setFeatures(response.data);
      console.log(response.data);
      console.log(features);
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  console.log(features);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setting" element={<Setting />} />
      {features &&
        features.map((feature) => {
          if (feature.url === "/home") {
            return (
              <Route
                key={feature.url}
                path={feature.url}
                element={<Home />}
              />
            );
          }
          return null;
        })}
        <Route path="*" Component={AccessDenied}></Route>
    </Routes>
  );
}
function AccessDenied() {
  return (
    <div className="forbiddenPage">
      <div></div>
      <h1><span className="forbiddenTitle">404</span> - Not Found</h1>
      <p>This Page Is Not Found. <a href="javascript:history.go(-1)">Return To Previous Page</a></p>
    </div>
  );
}
export default App;
