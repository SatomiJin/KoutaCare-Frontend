import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from "../../utils";
import "./Profile.scss";
import { FormattedMessage } from "react-intl";
import HeaderHome from "../HomePage/HeaderHome";
import * as userService from "../../services/userService";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genders: [],
      isLoading: false,
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      roleId: "",
      gender: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    let { match } = this.props;
    this.handleLoading();
    if (match && match.params && match.params.email) {
      let resUser = await userService.getDetailUser(match.params.email);
      if (resUser && resUser.status === "OK") {
        this.handleLoading();
        this.setState({
          id: resUser.userData.id,
          email: resUser.userData.email,
          firstName: resUser.userData.firstName,
          lastName: resUser.userData.lastName,
          phoneNumber: resUser.userData.phoneNumber,
          address: resUser.userData.address,
          gender: resUser.userData.gender,
          avatar: resUser.userData.image,
          roleId: resUser.userData.roleId,
        });
      }
    }
    let resGender = await userService.getAllCodes("GENDER");
    if (resGender && resGender.status === "OK") {
      this.setState({
        genders: resGender.data,
      });
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
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
  handleOnchange = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleUpdateProfile = async (e) => {
    e.preventDefault();
    this.handleLoading();

    let data = {
      id: this.state.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      gender: this.state.gender,
      avatar: this.state.avatar,
      roleId: this.state.roleId,
    };
    let res = await userService.editUserInfo(data);
    if (res && res.status === "OK") {
      this.handleLoading();
      this.setState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        roleId: "",
        gender: "",
        avatar: "",
      });
      toast.success("Cập nhật thông tin thành công!!!");
    } else {
      toast.error("Cập nhật thông tin thất bại!!!");
    }
  };
  s;
  render() {
    let language = this.props.language;
    let { genders, gender, address, email, firstName, lastName, phoneNumber, avatar } = this.state;
    return (
      <>
        <HeaderHome />
        <div className="profile-user-container">
          <div className="profile-user-wrapper container">
            <Loading isLoading={this.state.isLoading}>
              <form className="profile-user-wrapper-form p-4" onSubmit={(e) => this.handleUpdateProfile(e)}>
                <div className="row">
                  <div className="title">Thông tin cá nhân</div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={email}
                      style={{ cursor: "not-allowed" }}
                      type="email"
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="form-group col-4">
                    <label>Họ:</label>
                    <input
                      value={firstName}
                      onChange={(e) => this.handleOnchange(e)}
                      type="text"
                      name="firstName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-4">
                    <label>Tên:</label>
                    <input
                      value={lastName}
                      name="lastName"
                      onChange={(e) => this.handleOnchange(e)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-4">
                    <label>Giới tính:</label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={gender}
                      onChange={(e) => this.handleOnchange(e)}
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
                  <div className="form-group col-12">
                    <label>Địa chỉ:</label>
                    <input
                      type="text"
                      value={address}
                      name="address"
                      onChange={(e) => this.handleOnchange(e)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>Số điện thoại:</label>
                    <input
                      value={phoneNumber}
                      name="phoneNumber"
                      onChange={(e) => this.handleOnchange(e)}
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col-6">
                    <label htmlFor="avatar">Ảnh đại diện:</label>
                    <input type="file" onChange={(e) => this.handleOnchangeImage(e)} className="form-control" />
                    {avatar && (
                      <div className="profile-user-avatar m-3" style={{ backgroundImage: `url(${avatar})` }}></div>
                    )}
                  </div>
                  <div className="btn-wrapper px-4">
                    <button type="submit" className="btn btn-update-profile my-4">
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </Loading>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
