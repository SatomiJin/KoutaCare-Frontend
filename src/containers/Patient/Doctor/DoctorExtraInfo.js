import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfo.scss";
import { FormattedMessage } from "react-intl";
import * as userService from "../../../services/userService";

import LoadingScreen from "react-loading-screen";
import Loading from "../../../components/Loading";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      extraInformation: {},
      isLoading: false,
      doctorId: "",
    };
  }

  async componentDidMount() {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      this.handleLoading();
      let res = await userService.getExtraInfoDoctor(this.props.doctorId);

      if (res && res.status === "OK") {
        this.handleLoading();

        this.setState({
          extraInformation: res.users,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.extraInfoDoctorRedux !== this.props.extraInfoDoctorRedux) {
    //   this.setState({
    //     extraInformation: this.props.extraInfoDoctorRedux,
    //   });
    // }
    if (prevProps.doctorId !== this.props.doctorId) {
      if (this.props.doctorId && this.props.doctorId !== -1) {
        this.handleLoading();
        let res = await userService.getExtraInfoDoctor(this.props.doctorId);
        if (res && res.status === "OK") {
          this.handleLoading();
          this.setState({
            extraInformation: res.users,
          });
        }
      }
    }
  }

  handleReverseShowDetail = () => {
    this.setState({
      showDetail: !this.state.showDetail,
    });
  };
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  render() {
    let { language } = this.props;
    let { showDetail, extraInformation, isLoading } = this.state;

    let price = "";
    let priceX2 = "";
    if (extraInformation && extraInformation.priceTypeData) {
      if (language === LANGUAGES.VI) {
        price = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(extraInformation.priceTypeData.valueVi);
        priceX2 = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(extraInformation.priceTypeData.valueVi * 2);
      } else {
        price = new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(extraInformation.priceTypeData.valueEn);
        priceX2 = new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(extraInformation.priceTypeData.valueEn * 2);
      }
    }

    return (
      <div className="doctor-extra-info-container">
        <Loading isLoading={isLoading}>
          <div className="doctor-extra-content-up my-2 p-2">
            <div className="text-address">
              <FormattedMessage id="doctor-detail.address-clinic" />:
            </div>
            <div className="name-clinic my-2">
              {extraInformation && extraInformation.nameClinic ? extraInformation.nameClinic : "Chưa có phòng khám"}
            </div>
            <div className="address-detail-clinic">
              {extraInformation && extraInformation.addressClinic
                ? extraInformation.addressClinic
                : "Chưa có địa chỉ cụ thể "}
            </div>
          </div>
          <div className="doctor-extra-content-down my-2 p-2">
            {showDetail === false ? (
              <div className="collapse-detail">
                <span className="collapse-detail-title">
                  <FormattedMessage id="doctor-detail.examination-price" />: {price}
                </span>
                <span className="see-more-detail" style={{ cursor: "pointer" }} onClick={this.handleReverseShowDetail}>
                  {" "}
                  <i className="fa-regular fa-eye"></i> <FormattedMessage id="doctor-detail.see-detail" />
                </span>
              </div>
            ) : (
              <div className="more-details">
                <div className="more-details-title">
                  <FormattedMessage id="doctor-detail.examination-price" />:
                </div>
                <div className="more-details-container">
                  <div className="more-details-content">
                    <div className="more-details-content-top">
                      <div className="more-details-left">
                        <FormattedMessage id="doctor-detail.examination-price" />:
                      </div>
                      <div className="more-details-right">
                        {extraInformation && extraInformation.priceTypeData ? price : ""}
                      </div>
                    </div>
                    <FormattedMessage id="doctor-detail.price-15-m" />: {price} <br />
                    <FormattedMessage id="doctor-detail.price-30-m" />: {priceX2}
                  </div>
                  <div className="more-details-payment-options">
                    {extraInformation && extraInformation.paymentTypeData ? (
                      <FormattedMessage
                        id={
                          extraInformation.paymentTypeData.keyMap === "PAY1"
                            ? "doctor-detail.payment-cash"
                            : extraInformation.paymentTypeData.keyMap === "PAY2"
                            ? "doctor-detail.payment-atm"
                            : "doctor-detail.payment-all"
                        }
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="hide-detail" onClick={this.handleReverseShowDetail}>
                    <i className="fa-regular fa-eye-slash"></i> <FormattedMessage id="doctor-detail.hide-detail" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    extraInfoDoctorRedux: state.user.extraInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorRedux: (id) => dispatch(actions.getExtraInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
