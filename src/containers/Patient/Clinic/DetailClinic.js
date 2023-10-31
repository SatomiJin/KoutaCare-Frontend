import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import LoadingPage from "../../../components/LoadingPage";
import HeaderHome from "../../HomePage/HeaderHome";
import * as userService from "../../../services/userService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: "",
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.handleLoading();
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let clinicId = this.props.match.params.id;
      let res = await userService.getClinicById(clinicId);
      if (res && res.status === "OK") {
        this.handleLoading();
        this.setState({
          dataClinic: res.data,
        });
      }
    }
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { isLoading, dataClinic } = this.state;

    return (
      <>
        <HeaderHome />
        {isLoading === true && <LoadingPage />}
        <div className="detail-clinic-container">
          <div className="detail-clinic">
            <div className="detail-clinic-container-up"></div>
            <div className="detail-clinic-container-down">
              <div className="detail-clinic-wrapper container">
                <div className="detail-clinic-header">
                  <div
                    className="detail-clinic-header-left"
                    style={{ backgroundImage: `url("${dataClinic && dataClinic.image}")` }}
                  ></div>

                  <div className="detail-clinic-header-right">
                    <div className="detail-clinic-header-right-name">{dataClinic && dataClinic.name}</div>
                    <div className="detail-clinic-header-right-address">{dataClinic && dataClinic.address}</div>
                  </div>
                </div>
                <div className="detail-clinic-content my-4">
                  {React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: dataClinic.descriptionHTML },
                  })}
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
