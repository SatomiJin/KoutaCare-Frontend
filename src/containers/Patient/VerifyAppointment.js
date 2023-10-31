import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./VerifyAppointment.scss";

class VerifyAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "ERR",
    };
  }

  componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      this.props.verifyAppointmentRedux({
        token: token,
        doctorId: doctorId,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.verify !== this.props.verify) {
      if (this.props.verify === true) {
        this.setState({
          status: "OK",
        });
      } else {
        this.setState({
          status: "ERR",
        });
      }
    }
  }
  comeBackHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    // let language = this.props.language;
    let { verify } = this.props;

    return (
      <>
        {/* <HeaderHome /> */}
        <div className="verify-container">
          <div className="verify-wrapper">
            <div className="verify-content">
              {verify === true ? "Xác thực thông tin thành công!!!" : "Lịch khám đã được xác thực hoặc không tồn tại"}
              <br />
            </div>
            <button type="button" className="btn btn-light" onClick={() => this.comeBackHome()}>
              <i className="fa-solid fa-arrow-rotate-left"></i> Trờ lại trang chủ
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    verify: state.user.verify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyAppointmentRedux: (data) => dispatch(actions.verifyBookingAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAppointment);
