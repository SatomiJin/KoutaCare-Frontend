import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import vn from "../../assets/images/flag-vn.png";
import en from "../../assets/images/flag-uk.png";

import { LANGUAGES, USER_ROLE } from "../../utils/";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageWithRedux(language);
  };
  componentDidMount() {
    const { userInfo } = this.props;
    this.props.getDetailUserRedux(userInfo.email);

    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      const role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { userDetailRedux, processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-admin-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* Language */}

        <div className="languages">
          <span className="welcome">
            {/* {userInfo} */}
            {userInfo && userInfo.lastName && userInfo.firstName ? (
              <span>
                <FormattedMessage id="homeheader.welcome" />
                {userDetailRedux && userDetailRedux.image ? (
                  <img className="user-avatar" src={userDetailRedux.image} alt="avatar" />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}{" "}
                {userInfo.firstName + " " + userInfo.lastName}
              </span>
            ) : (
              <span>
                <FormattedMessage id="homeheader.welcome" />
                <i className="fa-solid fa-user"></i>
                "User"
              </span>
            )}
          </span>
          {language === LANGUAGES.VI ? (
            <>
              <div className="language-vi">
                <img src={vn} alt="vn" onClick={() => this.handleChangeLanguage(LANGUAGES.VI)} />
              </div>
              <div className="language-en">
                <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
              </div>
            </>
          ) : (
            <>
              <div className="language-vi">
                <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div className="language-en">
                <img src={en} alt="en" onClick={() => this.handleChangeLanguage(LANGUAGES.EN)} />
              </div>
            </>
          )}
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout} title="Log out">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    userDetailRedux: state.user.userDetail,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    getDetailUserRedux: (email) => dispatch(actions.getDetailUser(email)),
    changeLanguageWithRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
