import React, { Component } from "react";
import { connect } from "react-redux";
import "./OffCanvas.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../store/actions";
import Loading from "../components/Loading";
import * as userService from "../services/userService";
import { LANGUAGES } from "../utils";
import { Link } from "react-router-dom";

class OffCanvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genders: [],
      roles: [],
    };
  }

  async componentDidMount() {
    let resGender = await userService.getAllCodes("GENDER");
    let resRole = await userService.getAllCodes("ROLE");
    if (resGender && resGender.status === "OK" && resRole && resRole.status === "OK") {
      this.setState({
        genders: resGender.data,
        roles: resRole.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  renderMenu() {
    if (this.props.isLoggedIn) {
      return (
        <div className="menu-wrapper row">
          <div className="col-12">
            <Link to={`/profile/${this.props.userInfo.email}`}>
              <button type="button" className="btn btn-lg form-control">
                <i className="fa-solid fa-user"></i> Thông tin cá nhân
              </button>
            </Link>
          </div>
          {this.props.role !== "R3" && (
            <div className="col-12">
              <Link to={this.props.role === "R1" || this.props.role === "R2" ? "/system/welcome" : "*"}>
                <button type="button" className="btn btn-lg form-control">
                  <i className="fa-solid fa-gears"></i> Quản lý hệ thống
                </button>
              </Link>
            </div>
          )}
          <div className="col-12">
            <button type="button" className="btn btn-lg form-control">
              <i className="fa-regular fa-calendar-days"></i> Thông tin đặt lịch
            </button>
          </div>
          <div className="col-12">
            <button onClick={this.props.processLogout} type="button" className="btn btn-lg form-control">
              <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="menu-wrapper row">
          <div className="col-12">
            <Link to="/login">
              <button type="button" className="btn btn-lg form-control">
                <i className="fa-solid fa-gears"></i> Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      );
    }
  }
  render() {
    let { language, userInfo } = this.props;

    return (
      <div>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="menuOptionHeader"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Tùy chọn
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {this.props.isLoggedIn && (
              <Loading isLoading={this.props.isLoading}>
                <div className="user-info">
                  <div className="detail-user-wrapper">
                    <div className="detail-user-avatar" style={{ backgroundImage: `url(${userInfo.image})` }}></div>
                    <div className="detail-user">
                      <div>
                        <i className="fa-solid fa-user"></i>: {userInfo.firstName + " " + userInfo.lastName}
                      </div>

                      {this.state.genders.map((item, index) => {
                        if (item.keyMap === userInfo.gender) {
                          return (
                            <div key={index}>
                              <i className="fa-solid fa-venus-mars"></i>{" "}
                              {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                            </div>
                          );
                        }
                      })}
                      <div>
                        <i className="fa-solid fa-location-dot"></i> {userInfo.address}
                      </div>
                      {this.state.roles.map((item, index) => {
                        if (item.keyMap === this.props.role) {
                          return (
                            <div key={index}>
                              <i className="fa-solid fa-flag"></i>{" "}
                              {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </Loading>
            )}
            <div className="menu-options my-4">{this.renderMenu()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffCanvas);
