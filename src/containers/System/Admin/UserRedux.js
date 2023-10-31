import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { Lightbox } from "react-modal-image";
import * as userService from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      positionArr: [],
      previewImageUrl: "",
      openLigntBox: false,
      arrCheck: {},
      isLoading: false,
      //user info
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const genders = this.props.genderRedux;
    const roles = this.props.roleRedux;
    const positions = this.props.positionRedux;
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: genders,
        gender: genders && genders.length > 0 ? genders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: roles,
        role: roles && roles.length > 0 ? roles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
        position: positions && positions.length > 0 ? positions[0].keyMap : "",
      });
    }

    //
    if (prevProps.users !== this.props.users) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: genders && genders.length > 0 ? genders[0].keyMap : "",
        role: roles && roles.length > 0 ? roles[0].keyMap : "",
        position: positions && positions.length > 0 ? positions[0].keyMap : "",
        avatar: "",
        previewImageUrl: "",
      });
    }
  }
  //event upload imgage for avatar
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  closeLightbox = () => {
    if (!this.state.previewImageUrl) return;

    this.setState({
      openLigntBox: !this.state.openLigntBox,
    });
  };

  //create user
  handleOnchangeInput = (e) => {
    const copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  checkValidate = () => {
    let isValid = true;
    if (this.props.language === "en") {
      this.setState({
        arrCheck: {
          email: "Email",
          password: "Password",
          firstName: "First name",
          lastName: "Last name",
          phoneNumber: "Phone number",
          address: "Address",
        },
      });
    } else {
      this.setState({
        arrCheck: {
          email: "Email",
          password: "Mật khẩu",
          firstName: "Họ",
          lastName: "Tên",
          phoneNumber: "Số điện thoại",
          address: "Địa chỉ",
        },
      });
    }
    for (let i = 0; i < Object.keys(this.state.arrCheck).length; i++) {
      let key = Object.keys(this.state.arrCheck)[i];

      if (!this.state[key]) {
        isValid = false;
        if (this.props.language === "en") {
          alert(`Data ${this.state.arrCheck[key]} is blank, please fill in all information`);
        } else {
          alert(`Dữ liệu ${this.state.arrCheck[key]} cón trống, vui lòng điền đầy đủ thông tin`);
        }
        break;
      }
    }
    return isValid;
  };
  handleCreateUser = async () => {
    let isValid = this.checkValidate();
    if (isValid === true) {
      this.handleLoading();
      //fire action redux
      let data = {
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      };
      let res = await userService.createNewUser(data);
      if (res && res.status === "OK") {
        this.handleLoading();
        toast.success(<FormattedMessage id="toast.create-user-success" />);
      } else {
        this.handleLoading();
        toast.error(<FormattedMessage id="toast.create-user-failed" />);
      }
    }
    this.props.fetchAllUserRedux();
  };
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  render() {
    const genders = this.state.genderArr;
    const roles = this.state.roleArr;
    const positions = this.state.positionArr;
    const language = this.props.language;
    const { email, password, firstName, lastName, phoneNumber, address, gender, role, position } = this.state;

    return (
      // Quản lý người dùng với "Satomi Koutarou"

      <div className="user-redux-container">
        <div className="user-redux-wrapper container">
          <div className="title">
            <FormattedMessage id="manage-user.title" />
          </div>
          <Loading isLoading={this.state.isLoading}>
            <div className="user-redux-body">
              <div className="container">
                <form className="row">
                  <div className="row">
                    <div className="col-12 my-3">
                      <FormattedMessage id="manage-user.add" />
                    </div>

                    <div className="col-3">
                      <label htmlFor="email">
                        <FormattedMessage id="manage-user.email" />:
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="password">
                        <FormattedMessage id="manage-user.password" />:
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="firstName">
                        <FormattedMessage id="manage-user.first-name" />:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="lastName">
                        <FormattedMessage id="manage-user.last-name" />:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="phoneNumber">
                        <FormattedMessage id="manage-user.phone-number" />:
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-9">
                      <label htmlFor="address">
                        <FormattedMessage id="manage-user.address" />:
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="form-control"
                        value={address}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      />
                    </div>
                    <div className="col-3">
                      <label htmlFor="gender">
                        <FormattedMessage id="manage-user.gender" />:
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
                    <div className="col-3">
                      <label htmlFor="role">
                        <FormattedMessage id="manage-user.role" />:
                      </label>
                      <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={role}
                        onChange={(e) => this.handleOnchangeInput(e)}
                      >
                        {roles &&
                          roles.length &&
                          roles.map((role, index) => {
                            return (
                              <option key={index} value={role.keyMap}>
                                {language === LANGUAGES.VI ? role.valueVi : role.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-3">
                      <label htmlFor="position">
                        <FormattedMessage id="manage-user.position" />:
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={position}
                        className="form-select"
                        onChange={(e) => this.handleOnchangeInput(e)}
                      >
                        {positions &&
                          positions.length &&
                          positions.map((position, index) => {
                            return (
                              <option key={index} value={position.keyMap}>
                                {language === LANGUAGES.VI ? position.valueVi : position.valueEn}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-3">
                      <label htmlFor="image">
                        <FormattedMessage id="manage-user.image" />:
                      </label>
                      <div className="preview-img-container">
                        <input id="uploadImg" type="file" hidden onChange={(e) => this.handleOnchangeImage(e)} />

                        <label htmlFor="uploadImg" className="btn btn-outline-info my-3 btn-upload-avatar">
                          <i className="fa-solid fa-arrow-up-from-bracket"></i> Tải ảnh lên
                        </label>

                        <div
                          className="preview-avatar"
                          style={{ backgroundImage: `url(${this.state.previewImageUrl})` }}
                          onClick={() => this.closeLightbox()}
                        ></div>
                        <div>
                          {this.state.openLigntBox && (
                            <Lightbox
                              medium={this.state.previewImageUrl}
                              large={this.state.previewImageUrl}
                              alt={<FormattedMessage id="manage-user.your-avatar" />}
                              onClose={this.closeLightbox}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-outline-success mt-4"
                        onClick={() => this.handleCreateUser()}
                      >
                        <FormattedMessage id="manage-user.create" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Loading>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
