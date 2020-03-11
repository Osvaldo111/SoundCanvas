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
    this.state = {
      email: "",
      disableSendEmpty: true
    };
  }

  handleClose = () => {
    this.props.handleDisplay();
  };

  handleSend = () => {
    this.props.handleSend(this.state.email);
  };

  handleChange = event => {
    const email = event.target.value;
    if (email.length > 0) {
      this.setState({ disableSendEmpty: false });
    } else {
      this.setState({ disableSendEmpty: true });
    }
    this.setState({ email: email });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleSend();
  };

  render() {
    const { display, disableBttn, message } = this.props;
    const { email, disableSendEmpty } = this.state;
    return (
      <form
        className="overSendCanv"
        style={{
          visibility: display ? "visible" : "",
          opacity: display ? "1" : ""
        }}
        onSubmit={this.handleSubmit}
      >
        <div className="sendCardConta">
          <div className="sendCardForm">
            <div className="sendCarFormTitle">Send Canvas</div>
            <div className="sendCanvFormBdy">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="ruleLnFrm"></div>
            <div className="sendCvaFrmFttr">
              <input
                type="submit"
                value="Send"
                style={{
                  opacity: disableSendEmpty || disableBttn ? "0.5" : "",
                  cursor:
                    disableSendEmpty || disableBttn ? "default" : "pointer"
                }}
                disabled={disableSendEmpty || disableBttn ? true : false}
              />
              <a onClick={this.handleClose}>Close</a>
              <div>{message}</div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {}
const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(SendForm);
