import React from "react";
import "../style/sendForm.css";
import { connect } from "react-redux";

/**
 * author: Osvaldo Carrillo
 * This class is designed to display the send form when the user
 * wants to send the canvas via email. This class uses the props
 * "display" to show the form accordingly. And it uses the methods
 * "handleClose()" to close the form when the button is closed. And the
 * function "handleSend" to verify when the send button is pressed.
 */
class SendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    this.props.handleDisplay();
  };

  handleSend = () => {
    this.props.handleSend(true);
  };

  render() {
    const { display } = this.props;
    return (
      <div
        className="overSendCanv"
        style={{
          visibility: display ? "visible" : "",
          opacity: display ? "1" : ""
        }}
      >
        <div className="sendCardConta">
          <div className="sendCardForm">
            <div className="sendCarFormTitle">Send Canvas</div>
            <div className="sendCanvFormBdy">
              <div>
                <input type="text" placeholder="Email Address" />
              </div>
            </div>
            <div className="ruleLnFrm"></div>
            <div className="sendCvaFrmFttr">
              <a onClick={this.handleSend}>Send</a>
              <a onClick={this.handleClose}>Close</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SendForm);
