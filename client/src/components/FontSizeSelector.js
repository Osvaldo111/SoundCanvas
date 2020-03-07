import React from "react";
import "../style/fontSizeSelector.css";
import arrowDown from "../images/arrowDown.svg";
import { connect } from "react-redux";

/**
 * Date: 03/06/2019
 * author: Osvaldo Carrillo
 * This class is designed to allow the user to select the font size
 * of the text input
 * This class has to use the method "handleGetFontSize(sizeSelected)"
 * as a property which return the selected color.
 */
class FontSizeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      display: false,
      fontSize: "8"
    };
  }

  handleChange = event => {
    this.setState({ fontSize: event.target.value });
  };

  /**
   * Get the font size after the user press the
   * enter button "keycode 13"
   */
  selectFontSizeEnter = event => {
    if (event.keyCode === 13) {
      this.inputRef.current.blur();
      var fontSize = event.target.value;

      if (fontSize > 400) {
        const valueFont = 400;
        this.setState({ fontSize: 400, display: false }, () => {
          this.props.handleGetFontSize(valueFont);
        });
      } else if (fontSize < 8) {
        const valueFont = 8;
        this.setState({ fontSize: 8, display: false }, () => {
          this.props.handleGetFontSize(valueFont);
        });
      } else {
        this.setState({ fontSize: fontSize, display: false }, () => {
          this.props.handleGetFontSize(fontSize);
        });
      }
    }
  };

  /**
   * Get the font size the user selected from the
   * dropdown menu
   */
  selectFontSize = event => {
    if (event.target.tagName === "LI") {
      var fontSize = event.target.getAttribute("data-size");
      this.setState({ fontSize: fontSize }, () => {
        this.props.handleGetFontSize(fontSize);
      });
    }
  };

  /**
   * Open and close the dropdown menu
   */
  displayDropDown = () => {
    const { display } = this.state;
    if (!display) {
      this.setState({ display: true });
    } else {
      this.setState({ display: false });
    }
  };

  render() {
    const { display } = this.state;
    return (
      <div>
        <div>Font Size</div>
        <div className="ftSelConIn" onClick={this.displayDropDown}>
          <input
            type="number"
            value={this.state.fontSize}
            onChange={this.handleChange}
            onKeyUp={this.selectFontSizeEnter}
            ref={this.inputRef}
          />
          <div className="ftSelConInIm">
            <img src={arrowDown} alt="" />
          </div>
        </div>
        <div
          className="ftSelCtnDrpDwn"
          style={{ display: display ? "block" : "none" }}
        >
          <ul onClick={this.selectFontSize}>
            <li data-size="8">8</li>
            <li data-size="6">6</li>
            <li data-size="10">10</li>
            <li data-size="12">12</li>
            <li data-size="14">14</li>
            <li data-size="16">16</li>
            <li data-size="18">18</li>
            <li data-size="21">21</li>
            <li data-size="24">24</li>
            <li data-size="28">28</li>
            <li data-size="32">32</li>
            <li data-size="36">36</li>
            <li data-size="42">42</li>
            <li data-size="48">48</li>
            <li data-size="56">56</li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(FontSizeSelector);
