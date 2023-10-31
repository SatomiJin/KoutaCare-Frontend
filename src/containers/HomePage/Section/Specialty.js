import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import Loading from "../../../components/Loading";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as userService from "../../../services/userService";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyData: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.handleLoading();
    let res = await userService.getSpecialty();

    if (res && res.status === "OK") {
      this.setState({
        specialtyData: res.data ? res.data : [],
      });
      this.handleLoading();
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  //click to view specialty
  handleViewSpecialty = (specialty) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
  };
  render() {
    const { specialtyData } = this.state;

    return (
      <Loading isLoading={this.state.isLoading}>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-page.popular-specialties" />
              </span>
              <button className="btn-section" type="button">
                <FormattedMessage id="home-page.load-more" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {specialtyData &&
                  specialtyData.length > 0 &&
                  specialtyData.map((item, index) => {
                    return (
                      <div className="section-custom" key={index} onClick={() => this.handleViewSpecialty(item)}>
                        <div
                          className="bg-image section-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div>{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </Loading>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
