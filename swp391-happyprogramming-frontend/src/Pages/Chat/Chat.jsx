import React, { Component } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import SettingDrawer from "../../Components/SettingDrawer/SettingDrawer";

function Chat(props) {
  return (
    <div>
      <NavBar></NavBar>
      chat here
      <SettingDrawer></SettingDrawer>
    </div>
  );
}

export default Chat;
