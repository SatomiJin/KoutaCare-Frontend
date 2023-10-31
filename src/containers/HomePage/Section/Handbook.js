import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
class Handbook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="home-page.handbook" />
            </span>
            <button className="btn-section" type="button">
              <FormattedMessage id="home-page.load-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 1</div>
              </div>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 2</div>
              </div>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 3</div>
              </div>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 4</div>
              </div>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 5</div>
              </div>
              <div className="section-custom">
                <div className="bg-image section-handbook"></div>
                <div>Bệnh viện đại học Y dược 6</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
