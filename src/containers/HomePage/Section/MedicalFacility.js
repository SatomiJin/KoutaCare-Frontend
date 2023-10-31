import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../../components/Loading";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.handleLoading();
    await this.props.getAllClinicRedux();
    this.setState({
      listClinic: this.props.allClinicRedux,
    });
    this.handleLoading();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allClinicRedux !== this.props.allClinicRedux) {
      this.handleLoading();
      await this.setState({
        listClinic: this.props.allClinicRedux,
      });
      this.handleLoading();
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  render() {
    let { listClinic } = this.state;
    return (
      <Loading isLoading={this.state.isLoading}>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="home-page.outstanding-medical-facilities" />
              </span>
              <button className="btn-section" type="button">
                <FormattedMessage id="home-page.load-more" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {listClinic &&
                  listClinic.length > 0 &&
                  listClinic.map((item, index) => {
                    return (
                      <Link key={index} className="link-to" to={`/detail-clinic/${item.id}`}>
                        <div className="section-custom">
                          <div
                            className="bg-image section-medical-facility"
                            style={{ backgroundImage: ` url("${item.image}")` }}
                          ></div>
                          <div>{item.name}</div>
                        </div>
                      </Link>
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
    allClinicRedux: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClinicRedux: () => dispatch(actions.getAllClinic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
