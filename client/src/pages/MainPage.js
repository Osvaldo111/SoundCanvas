import React from "react";
import "../style/mainPage.css";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Canvas from "../components/Canvas";
/**
 * @author Osvaldo Carrillo
 * Date: 02/08/2020
 * This class should hold all the components of the main page
 * of the application.
 */
export default class MainPage extends React.Component {
  render() {
    return (
      <div className="mainPageContainer">
        <NavBar />
        <SideBar />
        <Canvas />
      </div>
    );
  }
}
