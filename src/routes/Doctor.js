import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManageBooking from "../containers/System/Doctor/ManageBooking";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn && <Header />}
        <div className="doctor-container">
          <div className="doctor-list">
            <Switch>
              <Route path="/doctor/manage-schedule" component={ManageSchedule} />
              <Route path="/doctor/manage-patient-booking" component={ManageBooking} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
