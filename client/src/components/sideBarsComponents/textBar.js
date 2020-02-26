import React from "react";
import "../../style/textBar.css";
import { connect } from "react-redux";

class TextBar extends React.Component {
  render() {
    const { display } = this.props;
    return (
      <div className="textBar" style={{ display: display ? "flex" : "none" }}>
        <div>
          <p>Text</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(TextBar);
