import React from "react";
import "../../style/textBar.css";
import { connect } from "react-redux";
import ColorPicker from "../colorPicker";
import FontSizeSelector from "../FontSizeSelector";
import { setFontSize } from "../../actions";
import { setFontColor } from "../../actions";
import { isTxtCanvas } from "../../actions";

class TextBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTxt: false
    };
  }

  /**
   * Add or remove the text when the user clicks
   */
  addTextToCanvas = () => {
    const { displayTxt } = this.state;
    if (!displayTxt) {
      this.setState({ displayTxt: true }, () => {
        this.props.isTxtCanvas(true);
      });
    } else {
      this.setState({ displayTxt: false }, () => {
        this.props.isTxtCanvas(false);
      });
    }
  };

  handleChangeFontSize = value => {
    this.props.setFontSize(value);
  };

  handleChangeFontColor = color => {
    this.props.setFontColor(color);
  };
  render() {
    const { display } = this.props;
    return (
      <div className="textBar" style={{ display: display ? "flex" : "none" }}>
        <div className="textBarTitle">Text</div>
        <div>
          <div>Click text to add to page</div>
          <div className="txtBarBdyTxt" onClick={this.addTextToCanvas}>
            <p>Add some body text</p>
          </div>
        </div>
        <div className="txtBarColFnt">
          <div>Select font color</div>
          <ColorPicker handleGetColor={this.handleChangeFontColor} />
        </div>
        <div>
          <FontSizeSelector handleGetFontSize={this.handleChangeFontSize} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {
  setFontSize,
  setFontColor,
  isTxtCanvas
};
export default connect(null, mapDispatchToProps)(TextBar);
