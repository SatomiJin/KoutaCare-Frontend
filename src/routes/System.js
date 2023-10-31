import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import ManageUserInfoRedux from "../containers/System/Admin/ManageUserInfoRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Admin/ManageSpecialty";
import ManageAllSpecialty from "../containers/System/Admin/ManageAllSpecialty";
import ManageClinic from "../containers/System/Admin/ManageClinic";
import ManageAllClinic from "../containers/System/Admin/ManageAllClinic";
import WelcomToManagement from "../containers/System/WelcomToManagement";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user/user-manage" component={UserManage} />
              <Route path="/system/user/user-redux" component={UserRedux} />
              <Route path="/system/doctor/manage-doctor" component={ManageDoctor} />
              <Route path="/system/user/view-all-user" component={ManageUserInfoRedux} />
              <Route path="/system/specialty/add-specialty" component={ManageSpecialty} />
              <Route path="/system/specialty/all-specialty" component={ManageAllSpecialty} />
              <Route path="/system/clinic/add-clinic" component={ManageClinic} />
              <Route path="/system/clinic/all-clinic" component={ManageAllClinic} />
              <Route path="/system/welcome" component={WelcomToManagement} />

              {/* /system/clinic/manage-clinic */}
              {/* <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              /> */}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
