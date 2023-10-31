import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import Loading from "../../../components/Loading";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTopDoctors: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.handleLoading();
    this.props.loadTopDoctors();
    this.setState({
      arrTopDoctors: this.props.topDoctorsRedux,
    });
    this.handleLoading();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.handleLoading();

      this.setState({
        arrTopDoctors: this.props.topDoctorsRedux,
      });
      this.handleLoading();
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  //click to view doctor
  handleViewDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    let arrTopDoctors = this.state.arrTopDoctors;
    let { language } = this.props;

    return (
      <Loading isLoading={this.state.isLoading}>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="banner.doctor-featured-last-week" />
              </span>
              <button className="btn-section" type="button">
                <FormattedMessage id="home-page.load-more" />
              </button>
            </div>
            <div className="section-body outstanding-doctor">
              <Slider {...this.props.settings}>
                {arrTopDoctors &&
                  arrTopDoctors.length > 0 &&
                  arrTopDoctors.map((doctor, index) => {
                    let imageBase64 = "";
                    if (doctor.image) {
                      imageBase64 = Buffer.from(doctor.image, "base64").toString("binary");
                    }
                    let nameVi = `${doctor.positionData.valueVi} , ${doctor.firstName} ${doctor.lastName}`;
                    let nameEn = `${
                      doctor.positionData.valueEn === "None" ? "DOCTOR" : doctor.positionData.valueEn
                    } , ${doctor.lastName} ${doctor.firstName}`;

                    return (
                      <div className="section-custom" onClick={() => this.handleViewDoctor(doctor)} key={index}>
                        <div className="section-border">
                          <div className="outer-bg-doctor">
                            <div
                              className="bg-image section-outstanding-doctor"
                              style={{ backgroundImage: `url(${doctor.image})` }}
                            ></div>
                          </div>
                          <div className="position-doctor text-center">
                            <div>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                            <div>{doctor.DoctorInfo.specialtyTypeData.name}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
