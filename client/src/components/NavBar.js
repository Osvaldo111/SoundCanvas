import React from "react";
import "../style/navBar.css";
/**
 * @author Osvaldo Carrillo
 * Date: 02/08/2020
 * This class is the top navigation bar
 * of the application.
 */
export default class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar">
        <div className="navBarLogo">
          <p>Sound Canvas</p>
        </div>
        <div className="navBarBttn">
          <button>Reset</button>
        </div>
      </div>
    );
  }
}
