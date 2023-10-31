import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import localization from "moment/locale/vi";
import * as userService from "../../../services/userService";
import Loading from "../../../components/Loading";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileDoctor: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.handleLoading();

    if (this.props.doctorId) {
      let res = await userService.getProfileDoctor(this.props.doctorId);

      if (res && res.status === "OK") {
        this.setState({
          profileDoctor: res.profile,
          isLoading: false,
        });
      }
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      if (this.props.doctorId) {
        let res = await userService.getProfileDoctor(this.props.doctorId);

        if (res && res.status === "OK") {
          this.setState({
            profileDoctor: res.profile,
            isLoading: false,
          });
        }
      }
    }
    // if (prevProps.profileDoctorRedux !== this.props.profileDoctorRedux) {
    //   this.setState({
    //     profileDoctor: this.props.profileDoctorRedux,
    //   });
    // }
  }

  //render
  displayTimeBooking = (time, address) => {
    const { language } = this.props;
    if (time && address && !_.isEmpty(time)) {
      let dateTime =
        language === LANGUAGES.VI
          ? moment.unix(+time.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+time.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      let scheduleTime = language === LANGUAGES.VI ? time.timeTypeData.valueVi : time.timeTypeData.valueEn;
      return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div>
            <i className="fa-solid fa-clock"></i> {scheduleTime} - {dateTime}{" "}
          </div>
          <div>
            <i className="fa-solid fa-square-check"></i> <FormattedMessage id="doctor-detail.free-booking" />
          </div>
          <div>
            <i className="fa-solid fa-location-dot"></i> {address}
          </div>
        </div>
      );
    }
  };
  render() {
    let { language, dataModal, isShowLinkDetail, isShowPrice } = this.props;
    const { profileDoctor, isLoading } = this.state;

    let nameVi = "";
    let nameEn = "";
    if (profileDoctor && profileDoctor.positionData) {
      nameVi = `${profileDoctor.positionData.valueVi} , ${profileDoctor.firstName} ${profileDoctor.lastName}`;
      nameEn = `${profileDoctor.positionData.valueEn === "None" ? "DOCTOR" : profileDoctor.positionData.valueEn} , ${
        profileDoctor.lastName
      } ${profileDoctor.firstName}`;
    }
    let price = "";

    if (profileDoctor && profileDoctor.DoctorInfo && profileDoctor.DoctorInfo.priceTypeData) {
      if (language === LANGUAGES.VI) {
        price = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(profileDoctor.DoctorInfo.priceTypeData.valueVi);
      } else {
        price = new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(profileDoctor.DoctorInfo.priceTypeData.valueEn);
      }
    }

    return (
      <div className="profile-doctor-container container">
        <Loading isLoading={isLoading}>
          <div className="profile-doctor-intro-doctor">
            <div className="profile-doctor-intro-doctor-left">
              <div
                className="profile-doctor-left-image"
                style={{ backgroundImage: `url(${profileDoctor && profileDoctor.image ? profileDoctor.image : ""})` }}
              ></div>
              {isShowLinkDetail === true && (
                <div className="load-more-profile-doctor">
                  <Link to={`/detail-doctor/${this.props.doctorId}`}>
                    <button type="button" className="btn btn-outline-info">
                      <FormattedMessage id="home-page.load-more" />
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div className="profile-doctor-intro-doctor-right">
              <div className="profile-doctor-content-right-up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
              <div className="profile-doctor-content-right-down">
                {this.props.isShowDes === true ? (
                  <>
                    {profileDoctor && profileDoctor.Markdown ? (
                      <>
                        <span>{profileDoctor.Markdown.description}</span>

                        <div>
                          <i className="fa-solid fa-location-dot"></i> {profileDoctor.address}
                        </div>
                      </>
                    ) : (
                      "Chưa có thông tin mô tả"
                    )}
                  </>
                ) : (
                  this.displayTimeBooking(dataModal, profileDoctor.address)
                )}
              </div>
            </div>
          </div>

          {isShowPrice && (
            <div className="profile-doctor-price my-3">
              {profileDoctor && profileDoctor.DoctorInfo && profileDoctor.DoctorInfo.priceTypeData ? (
                <div className="examination-price">
                  <FormattedMessage id="doctor-detail.examination-price" />: <span>{price}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Loading>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    profileDoctorRedux: state.user.profileDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileDoctorRedux: (id) => dispatch(actions.getProfileDoctorById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
