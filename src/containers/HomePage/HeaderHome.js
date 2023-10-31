import React, { Component } from "react";
import { connect } from "react-redux";
// import * as actions from "../../store/actions";
import "./HeaderHome.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

import en from "../../assets/images/flag-uk.png";
import vn from "../../assets/images/flag-vn.png";
import logo from "../../assets/images/kouta-logo.svg";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import OffCanvas from "../../components/OffCanvas";
import * as userService from "../../services/userService";

class HeaderHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailUser: {},
      isLoading: false,
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageWithRedux(language);
    //fire actions rudux
  };
  async componentDidMount() {
    this.handleLoading();
    let { userInfo } = this.props;
    if (userInfo) {
      let res = await userService.getDetailUser(userInfo.email);
      if (res && res.status === "OK") {
        await this.setState({
          detailUser: res.userData,
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
    if (this.props.isLoggedIn) {
      if (prevProps.userInfo !== this.props.userInfo) {
        this.handleLoading();
        let { userInfo } = this.props;
        let res = await userService.getDetailUser(userInfo.email);

        if (res && res.status === "OK") {
          await this.setState({
            detailUser: res.userData,
            isLoading: false,
          });
        }
      }
    }
  }
  comeBackHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;

    return (
      <>
        <OffCanvas
          role={
            this.props.isLoggedIn && this.props.userInfo && this.props.userInfo.roleId ? this.props.userInfo.roleId : ""
          }
          userInfo={this.props.isLoggedIn && !this.state.detailUser !== true && this.state.detailUser}
          isLoading={this.props.isLoggedIn && this.state.isLoading}
        />
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="home-header-left-content">
              <i
                className="fa-solid fa-bars"
                data-bs-toggle="offcanvas"
                data-bs-target="#menuOptionHeader"
                aria-controls="menuOptionHeader"
              ></i>
              <img src={logo} alt="Logo" className="home-header-logo" onClick={() => this.comeBackHome()} />
            </div>
            <div className="home-header-center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.select-hospital" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.choose-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.pack" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.Comprehensive" />
                </div>
              </div>
            </div>
            <div className="home-header-right-content">
              <div className="support">
                <i className="fa-regular fa-circle-question"></i> <FormattedMessage id="homeheader.support" />
              </div>

              <div className="home-header-language">
                {language === LANGUAGES.VI ? (
                  <>
                    <div className="language-vn">
                      <img src={vn} alt="vn" onClick={() => this.handleChangeLanguage(LANGUAGES.VI)} />
                    </div>
                    <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                      <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="language-vn">
                      <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    </div>
                    <div className="language-en">
                      <img src={en} alt="en" onClick={() => this.handleChangeLanguage(LANGUAGES.EN)} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-first-banner">
                <FormattedMessage id="banner.first-title-header" />
              </div>
              <div className="title-second-banner">
                <FormattedMessage id="banner.second-title-header" />
              </div>

              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" className="input-search" placeholder="Tìm kiếm bệnh viện" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.speciality-examination" />
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.remote-medical" />
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-house-chimney-medical"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.routine-medical" />
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-microscope"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.medical-testing" />
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-head-side-virus"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.mental-health" />
                  </div>
                </div>
                <div className="options-child">
                  <div className="icon-option-child">
                    <i className="fa-solid fa-tooth"></i>
                  </div>
                  <div className="text-option-child">
                    <FormattedMessage id="banner.dentistry" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    userDetailRedux: state.user.userDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageWithRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
