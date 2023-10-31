import React, { Component } from "react";
import { connect } from "react-redux";
import { Lightbox } from "react-modal-image";
import { FormattedMessage } from "react-intl";
import Loading from "../../../components/Loading";
import LoadingPage from "../../../components/LoadingPage";

import * as actions from "../../../store/actions";
import "./ManageUserInfoRedux.scss";
import { LANGUAGES, CommonUtils } from "../../../utils";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserRedux: [],
      previewImageUrl: "",
      isLoading: false,
      isLoadingModal: false,
      //user info
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",
      //validate
      arrCheck: {},
    };
  }

  componentDidMount() {
    this.handleLoading("table");
    this.props.fetchAllUserRedux();
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  handleLoading = (type) => {
    if (type === "table") {
      this.setState({
        isLoading: !this.state.isLoading,
      });
      return;
    }
    if (type === "modal") {
      this.setState({
        isLoadingModal: !this.state.isLoadingModal,
      });
      return;
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    const genders = this.props.genderRedux;
    const roles = this.props.roleRedux;
    const positions = this.props.positionRedux;
    if (prevProps.users !== this.props.users) {
      this.handleLoading("table");

      this.setState({
        listUserRedux: this.props.users,
        isLoading: false,
      });
    }

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
      });
    }
  }
  //delete user
  handleDeleteUser = async (user) => {
    this.handleLoading("table");
    await this.props.deleteUserRedux(user.id);
    await this.props.fetchAllUserRedux();
    this.setState({
      isLoading: false,
    });
  };
  //checkValidate
  checkValidate = () => {
    let isValid = true;
    if (this.props.language === "en") {
      this.setState({
        arrCheck: {
          firstName: "First name",
          lastName: "Last name",
          phoneNumber: "Phone number",
          address: "Address",
        },
      });
    } else {
      this.setState({
        arrCheck: {
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
  //edit user
  handleEditUser = (user) => {
    this.handleLoading("modal");
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("binary");
    }

    this.setState({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      previewImageUrl: imageBase64,
      avatar: "",
      isLoadingModal: false,
    });
  };
  handleOnchangeInput = (e) => {
    const copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleUpdateUser = () => {
    let isValid = this.checkValidate();
    if (isValid === false) return;
    //fire redux edit user
    this.props.updateUserRedux({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      gender: this.state.gender,
      roleId: this.state.role,
      positionId: this.state.position,

      avatar: this.state.avatar,
    });
  };
  //image manage
  closeLightbox = () => {
    if (!this.state.previewImageUrl) return;

    this.setState({
      openLigntBox: !this.state.openLigntBox,
    });
  };
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

  render() {
    const language = this.props.language;
    const genders = this.state.genderArr;
    const roles = this.state.roleArr;
    const positions = this.state.positionArr;
    const { isLoading, firstName, lastName, phoneNumber, address, gender, role, position } = this.state;

    const listUser = this.state.listUserRedux;
    return (
      // Quản lý thông tin người dùng với "Satomi Koutarou"
      <div className="manage-user-redux-container">
        {isLoading === true && <LoadingPage />}
        <div className="container">
          <div className="title my-3">quản lý thông tin người dùng</div>

          <div className="users-table mt-3 mx-1">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.email" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.first-name" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.last-name" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.gender" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.role" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.actions" />:
                  </th>
                </tr>
              </thead>
              <tbody>
                {listUser &&
                  listUser.length > 0 &&
                  listUser.map((user, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.gender}</td>
                        <td>{user.roleId}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info mx-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => this.handleEditUser(user)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => this.handleDeleteUser(user)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <Loading isLoading={this.state.isLoadingModal}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    <FormattedMessage id="manage-user.edit-user" />
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body modal-lg">
                  <div className="row">
                    <div className="col-4">
                      <label htmlFor="firstName">Họ:</label>
                      <input
                        type="text"
                        onChange={(e) => this.handleOnchangeInput(e)}
                        value={firstName}
                        className="form-control"
                        id="firstName"
                        name="firstName"
                      />
                    </div>
                    <div className="col-4">
                      <label htmlFor="lastName">Tên:</label>
                      <input
                        onChange={(e) => this.handleOnchangeInput(e)}
                        type="text"
                        value={lastName}
                        className="form-control"
                        id="lastName"
                        name="lastName"
                      />
                    </div>
                    <div className="col-4">
                      <label htmlFor="phoneNumber">Số điện thoại:</label>
                      <input
                        type="text"
                        onChange={(e) => this.handleOnchangeInput(e)}
                        value={phoneNumber}
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="address">Địa chỉ:</label>
                      <input
                        onChange={(e) => this.handleOnchangeInput(e)}
                        type="text"
                        value={address}
                        id="address"
                        name="address"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3">
                      <label htmlFor="gender">
                        <FormattedMessage id="manage-user.gender" />:
                      </label>
                      <select
                        id="gender"
                        onChange={(e) => this.handleOnchangeInput(e)}
                        name="gender"
                        className="form-select"
                        value={gender}
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
                          style={{
                            backgroundImage: `url(${this.state.previewImageUrl})`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.handleUpdateUser()}
                    data-bs-dismiss="modal"
                  >
                    Save changes
                  </button>
                </div>
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    language: state.app.language,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id)),
    updateUserRedux: (data) => dispatch(actions.updateUserStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
