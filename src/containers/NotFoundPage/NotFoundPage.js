import React, { Component } from "react";
import { connect } from "react-redux";

import "./NotFoundPage.scss";
import { FormattedMessage } from "react-intl";

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let language = this.props.language;

    return <div>404 - Not Found Page</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);
