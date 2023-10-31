import React, { Component } from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";

import "./UserManage.scss";
import * as userService from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  //some function event
  getAllUserFromReact = async () => {
    let response = await userService.getAllUser("ALL");
    if (response && response.status === "OK") {
      this.setState({
        listUsers: response.users,
      });
    }
  };
  //add new
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  //toggle user modal
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  //toggle edit user modal
  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  //create new user
  createNewUser = async (data) => {
    try {
      let response = await userService.createNewUser(data);
      if (response) {
        if (response.status === "ERROR") {
          alert(response.message);
        } else {
          alert(response.message);
          await this.getAllUserFromReact();
          this.toggleUserModal();
          emitter.emit("EVENT_CLEAR_MODAL_DATA");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Delete user
  handleDeleteUser = async (user) => {
    try {
      const res = await userService.deleteUser(user.id);
      if (res && res.status === "OK") {
        await this.getAllUserFromReact();
      } else {
        alert(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Edit user
  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  //handle edit user call api
  editUserFromParent = async (user) => {
    try {
      const res = await userService.editUserInfo(user);
      if (res && res.status === "OK") {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        console.log(res.message);
      }
    } catch (e) {
      alert(e);
    }
  };
  render() {
    const listUsers = this.state.listUsers;
    return (
      <div className="users-container">
        {this.state.isOpenModalUser && (
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            createNewUser={this.createNewUser}
            toggleUserModal={this.toggleUserModal}
          />
        )}
        {/* Modal Edit */}
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            currentUserInfo={this.state.userEdit}
            editUser={this.editUserFromParent}
            toggleEditUserModal={this.toggleEditUserModal}
          />
        )}
        <div className="title text-center">Manage Users</div>
        <div className="my-2 mx-5">
          <button type="butto " className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
            <i className="fa-solid fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listUsers &&
                listUsers.map((user, index) => {
                  return (
                    <tr key={user.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>{user.gender === 1 ? "Male" : "Female"}</td>
                      <td>{user.roleId === "1" ? "ADMIN" : user.roleId === "2" ? "DOCTOR" : "PATIENT"}</td>
                      <td>
                        <button type="button" className="btn-edit-user" onClick={() => this.handleEditUser(user)}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button type="button" className="btn-delete-user" onClick={() => this.handleDeleteUser(user)}>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
