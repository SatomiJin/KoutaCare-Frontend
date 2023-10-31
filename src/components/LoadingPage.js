import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoadingPage.scss";
import { FormattedMessage } from "react-intl";
class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <div className="spinner-border-container">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-border-text mx-3 title text-light">
            <FormattedMessage id="admin.manage-patient-booking.loading" />
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
