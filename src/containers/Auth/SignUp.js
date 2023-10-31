import React, { Component } from "react";
import { connect } from "react-redux";

import { LANGUAGES } from "../../utils";
import "./SignUp.scss";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/KoutaCode.png";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genders: [],
      isLoading: false,
      //user info
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      role: "R3",
    };
  }

  async componentDidMount() {
    let genderArr = await userService.getAllCodes("GENDER");
    if (genderArr && genderArr.status === "OK") {
      this.setState({
        genders: genderArr.data,
        gender: genderArr.data && genderArr.data.length > 0 ? genderArr.data[0].keyMap : "",
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleSignUp = async (e) => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      roleId: this.state.role,
    };
    let res = await userService.createNewUser(data);
    if (res && res.status === "OK") {
      toast.success(<FormattedMessage id="toast.sign-up-success" />);
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        role: "R3",
      });
    } else {
      toast.error(<FormattedMessage id="toast.sign-up-failed" />);
    }
  };
  handleOnchangeInput = (e) => {
    const copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let language = this.props.language;
    let { genders, gender } = this.state;

    return (
      <div className="sign-up-page-container">
        <div className="sign-up-page-wrapper">
          <div className="logo-background">
            <img src={logo} alt="KoutaCode" className="kouta-code" />
          </div>
          <div className="sign-up-page-wrapper-form">
            <form onSubmit={(e) => this.handleSignUp(e)} className="form-sign-up-container container">
              <div className="title my-3">
                <FormattedMessage id="sign-up.sign-up-now" />
              </div>
              <div className="row p-4">
                <div className="form-group col-12">
                  <label htmlFor="email">
                    <FormattedMessage id="sign-up.email-address" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    value={this.state.email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="example@gmail.com..."
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="password">
                    <FormattedMessage id="sign-up.password" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    name="password"
                    value={this.state.password}
                    type="text"
                    id="password"
                    placeholder="Enter password..."
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="confirm">
                    <FormattedMessage id="sign-up.confirm-password" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    type="text"
                    id="confirm"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    placeholder="Enter confirm password..."
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="firstName">
                    <FormattedMessage id="sign-up.first-name" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    placeholder="Enter your first name..."
                    id="firstName"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label id="label" htmlFor="lastName">
                    <FormattedMessage id="sign-up.last-name" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    value={this.state.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name..."
                    id="lastName"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="address">
                    <FormattedMessage id="sign-up.address" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    name="address"
                    value={this.state.address}
                    type="text"
                    placeholder="54c Đường số 4..."
                    id="address"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="phoneNumber">
                    <FormattedMessage id="sign-up.phone-number" />:
                  </label>
                  <input
                    onChange={(e) => this.handleOnchangeInput(e)}
                    required
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    type="text"
                    id="phoneNumber"
                    placeholder="034-xxx-xxxx..."
                    className="form-control"
                  />
                </div>
                <div className="form-group col-6">
                  <label>
                    <FormattedMessage id="sign-up.gender" />:
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={gender}
                    onChange={(e) => this.handleOnchangeInput(e)}
                  >
                    {genders &&
                      genders.length &&
                      genders.map((gender, index) => {
                        return (
                          <option key={index} value={gender.keyMap}>
                            {language === LANGUAGES.VI ? gender.valueVi : gender.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <button type="submit" className="btn btn-lg btn-sign-up">
                  <FormattedMessage id="sign-up.sign-up" />
                </button>
                <Link className="back-to-sign-in-link" to="/login">
                  <div className="back-to-sign-in col-12  text-center">
                    <i className="fa-solid fa-right-to-bracket"></i> <FormattedMessage id="sign-up.sign-in" />
                  </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
