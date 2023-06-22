import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { verifyBookAppointment } from "../../services/userService";
import HomeHeader from "../Homepage/HomeHeader";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    console.log("check props: ", this.props);
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let response = await verifyBookAppointment({
        doctorId: doctorId,
        token: token,
      });
      if (response && response.response.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: response.response.errCode,
        });
      } else {
        console.log("check log: ", response);
        this.setState({
          statusVerify: true,
          errCode:
            response && response.response.errCode
              ? response.response.errCode
              : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    console.log("check state đúng: ", this.state);
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data....</div>
          ) : (
            <div>
              {+errCode === 0 ? (
                <div className="infor-booking">Lịch hẹn đã được xác nhận</div>
              ) : (
                <div className="infor-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
