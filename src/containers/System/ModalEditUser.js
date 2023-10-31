import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {
    let { currentUserInfo } = this.props;

    if (currentUserInfo && !_.isEmpty(currentUserInfo)) {
      this.setState({
        id: currentUserInfo.id,
        email: currentUserInfo.email,
        firstName: currentUserInfo.firstName,
        lastName: currentUserInfo.lastName,
        address: currentUserInfo.address,
        phoneNumber: currentUserInfo.phoneNumber,
      });
    }
  }
  toggle = () => {
    this.props.toggleEditUserModal();
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
    let arrInput = ["firstName", "lastName", "address", "phoneNumber"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameters: ${arrInput[i]}, Please fill in all the blanks`);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api edit user
      this.props.editUser(this.state);
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
        <ModalHeader toggle={() => this.toggle()}>Edit user's infomation</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container max-width-input">
              <label>Email:</label>
              <input
                disabled
                style={{ opacity: "0.7", cursor: "not-allowed" }}
                type="email"
                name="email"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.email}
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
            <div className="input-container">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.address}
              />
            </div>
            <div className="input-container">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={(event) => this.handleOnchangeInput(event)}
                value={this.state.phoneNumber}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => this.handleSaveUser()} color="primary" className="px-3">
            Save changes
          </Button>{" "}
          <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
            Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
