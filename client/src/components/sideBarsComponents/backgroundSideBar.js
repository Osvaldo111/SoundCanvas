import React from "react";
import "../../style/backgroundSideBar.css";
import { connect } from "react-redux";

class BackgroundSideBar extends React.Component {
  render() {
    // console.log(this.props);

    const { display } = this.props;
    return (
      <div
        className="backgroundBar"
        style={{
          display: display ? "flex" : "none"
        }}
      >
        <div>
          <p>Colors</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(BackgroundSideBar);
