import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import * as actions from "../../store/actions";

import "./Login.scss";
// import { FormattedMessage } from "react-intl";
import * as userService from "../../services/userService";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Loading from "../../components/Loading";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
      isLoading: false,
    };
  }
  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  handleLogin = async () => {
    this.handleLoading();
    this.setState({
      errorMessage: "",
    });
    try {
      const data = await userService.handleLogin(this.state.username, this.state.password);
      if (data && data.status !== "OK") {
        this.setState({
          errorMessage: data.message,
        });
      }
      if (data && data.status === "OK") {
        this.handleLoading();
        toast.success(<FormattedMessage id="login.login-success" />);
        this.props.userLoginSuccess(data.user);
        this.props.navigate("/home");
      }
    } catch (error) {
      this.handleLoading();
      if (error.response) {
        if (error.response.data) {
          this.handleLoading();
          this.setState({
            errorMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleOnkeyDown = (e) => {
    if (e.code === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background" tabIndex="0" onKeyDown={this.handleOnkeyDown}>
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-uppercase text-login text-center">
              <span>
                <img
                  src="https://raw.githubusercontent.com/SatomiJin/sern-stack-host-file-with-github/host-image/logo-k-1.png"
                  alt="myLogo"
                />
              </span>
              <div>
                <FormattedMessage id="login.login" />
              </div>
            </div>
            <div className="col-12 form-group my-4 login-input">
              <label htmlFor="username">
                <FormattedMessage id="login.username" />
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username..."
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group my-4 login-input">
              <label htmlFor="password">
                <FormattedMessage id="login.password" />
              </label>
              <div className="custom-input-password">
                <input
                  autoComplete="new-password"
                  type={this.state.isShowPassword ? "text" : "password"}
                  id="password"
                  className="form-control"
                  placeholder="Enter your password..."
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangePassword(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  {this.state.isShowPassword ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <Loading isLoading={this.state.isLoading}>
              <div className="col-12 wrapper-btn-login">
                <button
                  className="btn btn-login"
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  <FormattedMessage id="login.login" />
                </button>
              </div>
            </Loading>
            <div className="col-12">
              <Link className="link-to-sign-up" to={this.props.isLoggedIn === false ? "/sign-up" : "/home"}>
                <span className="sign-up-now">
                  <FormattedMessage id="login.sign-up-now" />
                </span>
              </Link>
              <span className="forgot-password">
                <FormattedMessage id="login.forgot-password" />
              </span>
            </div>

            <div className="col-12 text-center mt-5 other-login">
              <span className="text-other-login">
                <FormattedMessage id="login.login-orther" />
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus google"></i>
              <i className="fab fa-facebook facebook"></i>
            </div>
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
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
