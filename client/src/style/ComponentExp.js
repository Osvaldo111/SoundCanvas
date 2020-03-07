import React from "react";
import "../style/YOUR_STYLE.css";
import { connect } from "react-redux";

/**
 * Date: 02/27/2019
 * author: Osvaldo Carrillo
 * This class is designed to allow the user to pick different
 * colors of the set provided and also introduced colors in
 * hexadecimal value.
 * This class has to use the method "handleGetColor(colorSelected)"
 * as a property which return the selected color.
 */
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(Component);
