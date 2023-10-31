import React, { Component } from "react";
import { connect } from "react-redux";
import "./WelcomToManagement.scss";
import { FormattedMessage } from "react-intl";
class WelcomToManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let language = this.props.language;

    return (
      <div className="welcome-admin-container text-center">
        <div className="welcome-admin-title title">
          <FormattedMessage id="admin.welcome" />
        </div>
        <div className="welcome-admin-wrapper">
          <a
            href={"https://www.linkedin.com/in/h%E1%BB%AFu-tr%E1%BB%8Dng-%C4%91%E1%BB%93ng-777381290/"}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href={"https://www.instagram.com/koutarousatomi/"} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href={"https://www.tiktok.com/@satomikoutarou"} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-tiktok"></i>
          </a>
          <a href={"https://www.facebook.com/shiyoru.satomi.9/"} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomToManagement);
