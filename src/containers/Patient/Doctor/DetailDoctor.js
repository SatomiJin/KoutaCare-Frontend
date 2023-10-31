import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import HeaderHome from "../../HomePage/HeaderHome";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import * as userService from "../../../services/userService";
import LoadingPage from "../../../components/LoadingPage";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsDoctor: {},
      currentDoctorId: -1,
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const id = this.props.match.params.id;
      this.handleLoading(true);
      let res = await userService.getDetailDoctorByID(id);
      if (res && res.status === "OK") {
        this.handleLoading(false);
        this.setState({
          currentDoctorId: id,
          detailsDoctor: res.users,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleLoading = (status) => {
    this.setState({
      isLoading: status,
    });
  };
  render() {
    const { detailsDoctor, isLoading } = this.state;

    let nameVi = "";
    let nameEn = "";
    if (detailsDoctor && detailsDoctor.positionData) {
      nameVi = `${detailsDoctor.positionData.valueVi} , ${detailsDoctor.firstName} ${detailsDoctor.lastName}`;
      nameEn = `${detailsDoctor.positionData.valueEn === "None" ? "DOCTOR" : detailsDoctor.positionData.valueEn} , ${
        detailsDoctor.lastName
      } ${detailsDoctor.firstName}`;
    }
    let language = this.props.language;

    return (
      <>
        <HeaderHome isShowBanner={false} />
        {isLoading === true && <LoadingPage />}
        <div className="detail-container">
          <div className="doctor-detail-container">
            <div className="intro-doctor">
              <div className="intro-doctor-left">
                <div
                  className="left-image"
                  style={{ backgroundImage: `url(${detailsDoctor && detailsDoctor.image ? detailsDoctor.image : ""})` }}
                ></div>
              </div>
              <div className="intro-doctor-right">
                <div className="content-right-up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                <div className="content-right-down">
                  {detailsDoctor && detailsDoctor.Markdown ? (
                    <span>{detailsDoctor.Markdown.description}</span>
                  ) : (
                    "Chưa có thông tin mô tả"
                  )}
                </div>
              </div>
            </div>
            <div className="schedule-doctor row">
              <div className="content-schedule-left col-8">
                <DoctorSchedule doctorId={this.state.currentDoctorId} />
              </div>
              <div className="content-schedule-right col-4">
                <DoctorExtraInfo doctorId={this.state.currentDoctorId} />
              </div>
            </div>
            <div className="detail-information-doctor">
              {detailsDoctor && detailsDoctor.Markdown && detailsDoctor.Markdown.contentHTML && (
                <div className="details-doctor-info">
                  {React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: detailsDoctor.Markdown.contentHTML },
                  })}
                </div>
              )}
            </div>
            <div className="rate-by-comment"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorDetailsRedux: state.user.doctorDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
