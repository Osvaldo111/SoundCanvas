import React from "react";
import "../style/colorPicker.css";
import { connect } from "react-redux";
import { setCanvasColor } from "../actions";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#fff",
      colorInput: "",
      errorInput: false
    };
  }

  // Check when a color from the list is selected
  selectColor = event => {
    if (event.target.tagName === "LI") {
      var colorSelected = event.target.getAttribute("data-color");
      this.setState({ color: colorSelected }, () => {
        this.props.setCanvasColor(colorSelected);
      });
    }
  };

  // Submit the color given by the user.
  submitColor = () => {
    this.setState({ errorInput: false }, () => {
      if (this.state.colorInput === "") {
        this.setState({ errorInput: true, colorInput: "" });
      } else {
        this.setState(
          { color: "#" + this.state.colorInput, colorInput: "" },
          () => {
            this.props.setCanvasColor(this.state.color);
          }
        );
      }
    });
  };

  handleChange = event => {
    this.setState({ colorInput: event.target.value });
  };
  render() {
    const { errorInput } = this.state;
    return (
      <div className="colorPickerContainer">
        <ul className="colorPickerlist" onClick={this.selectColor}>
          <li style={{ backgroundColor: "#F56651" }} data-color="#F56651"></li>
          <li style={{ backgroundColor: "#7AE9C9" }} data-color="#7AE9C9"></li>
          <li style={{ backgroundColor: "#606A92" }} data-color="#606A92"></li>
          <li style={{ backgroundColor: "#FDCD47" }} data-color="#FDCD47"></li>
          <li style={{ backgroundColor: "#464849" }} data-color="#464849"></li>
          <li style={{ backgroundColor: "#D7D1D5" }} data-color="#D7D1D5"></li>
          <li style={{ backgroundColor: "#fff" }} data-color="#fff"></li>
        </ul>
        <div className="colorPickInput">
          <div>Enter Hex Color</div>
          <div className="contColPkHex">
            <div className="colorPickHex" onClick={this.submitColor}>
              <p>#</p>
            </div>
            <input
              type="text"
              value={this.state.colorInput}
              onChange={this.handleChange}
              required
            />
          </div>
          <div style={{ color: "red", display: errorInput ? "flex" : "none" }}>
            Please enter a color
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {
  setCanvasColor
};
export default connect(null, mapDispatchToProps)(ColorPicker);
