import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";

import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";

import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage";
import Doctor from "../routes/Doctor";

import CustomScrollbars from "../components/CustomScrollbars.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import VerifyAppointment from "./Patient/VerifyAppointment";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";
import SignUp from "./Auth/SignUp";
import Profile from "./Auth/Profile";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;

    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />

                  <Route path={path.SIGN_UP} exact component={SignUp} />
                  <Route path={path.PROFILE} component={userIsAuthenticated(Profile)} />

                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />

                  <Route
                    path={path.SYSTEM}
                    component={
                      this.props.userInfo && this.props.userInfo.roleId !== "R3"
                        ? userIsAuthenticated(System)
                        : NotFoundPage
                    }
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                  <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                  <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                  <Route path={path.VERIFY_BOOKING} component={VerifyAppointment} />
                  <Route path={"*"} component={NotFoundPage} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
