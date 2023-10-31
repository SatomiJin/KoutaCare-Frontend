import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
      //thông tin check
      arrCheck: {
        email: "Email",
        password: "Mật khẩu",
        firstName: "Tên",
        lastName: "Họ",
        phoneNumber: "Số điện thoại",
        address: "Địa chỉ",
      },
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: 1,
        roleId: 3,
      });
    });
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleUserModal();
  };

  //handle
  handleOnchangeInput = (event) => {
    let copyState = { ...this.state };
    copyState[event.target.name] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  //add new user
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address", "phonenumber", "gender", "roleId"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameters: ${arrInput[i]}, Please fill in all the blanks`);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create user
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className="modal-user-container"
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>password:</label>
              <input
                type="password"
                name="password"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First name:</label>
              <input
                type="text"
                name="firstName"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name:</label>
              <input
                type="text"
                name="lastName"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.address}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phonenumber"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.phonenumber}
              />
            </div>
            <div className="input-container">
              <label>Sex:</label>
              <select
                id="gender"
                className="form-control"
                name="gender"
                value={this.state.gender}
                onChange={(event) => this.handleOnchangeInput(event)}
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="input-container">
              <label>Role:</label>
              <select
                name="roleId"
                id="roleId"
                value={this.state.roleId}
                className="form-control"
                onChange={(event) => this.handleOnchangeInput(event)}
              >
                <option value={1}>Admin</option>
                <option value={2}>Doctor</option>
                <option value={3}>Patient</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.handleAddNewUser()} color="primary" className="px-3">
            Add new
          </Button>{" "}
          <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
