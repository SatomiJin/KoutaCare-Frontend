import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import "./BookingModal.scss";
import Select from "react-select";
import moment from "moment";
import LoadingPage from "../../../../components/LoadingPage";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "",
      doctorId: "",
      timeType: "",
      //options
      genders: [],
      //modal
      isOpenModal: false,
      LoadingPage: false,
    };
  }

  componentDidMount() {
    this.props.getGenderRedux();
  }

  handleBuildGenderData = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux || prevProps.language !== this.props.language) {
      this.setState({
        genders: this.handleBuildGenderData(this.props.genderRedux),
      });
    }
    if (prevProps.dataModal !== this.props.dataModal) {
      let { dataModal } = this.props;

      if (dataModal) {
        this.setState({
          doctorId: dataModal.doctorId,
          timeType: dataModal.timeType,
        });
      }
    }
  }
  handleLoading = () => {
    this.setState({
      LoadingPage: !this.state.LoadingPage,
    });
  };
  //onChange input
  handleOnchangeInput = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  //onchange Date
  handleOnchangeDate = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  //select gender
  handleOnchangeGender = (selectOption) => {
    this.setState({
      gender: selectOption,
    });
  };
  handleBuildTimeBooking = (time) => {
    const { language } = this.props;
    if (time && !_.isEmpty(time)) {
      let dateTime =
        language === LANGUAGES.VI
          ? moment.unix(+time.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+time.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      let scheduleTime = language === LANGUAGES.VI ? time.timeTypeData.valueVi : time.timeTypeData.valueEn;
      return `${scheduleTime} - ${dateTime}`;
    }
  };

  handleBuildDoctorName = (dataName) => {
    let { language } = this.props;
    if (dataName && !_.isEmpty(dataName)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataName.doctorData.firstName} ${dataName.doctorData.lastName}`
          : `${dataName.doctorData.lastName} ${dataName.doctorData.firstName}`;
      return name;
    }
  };
  //create booking examination
  handleBookingExamination = async (e) => {
    e.preventDefault();
    this.handleLoading();
    let date = new Date(this.state.birthday).getTime();
    let time = this.handleBuildTimeBooking(this.props.dataModal);
    let doctorName = this.handleBuildDoctorName(this.props.dataModal);

    await this.props.createBookingExamination({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataModal.date,
      gender: this.state.gender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      time: time,
      doctorName: doctorName,
    });
    this.handleLoading();
  };
  render() {
    let { dataModal } = this.props;

    let { fullName, phoneNumber, email, address, reason, birthday, gender } = this.state;
    let doctorId = dataModal && !_.isEmpty(dataModal) ? dataModal.doctorId : "";

    return (
      <div className="container">
        {this.state.LoadingPage === true && <LoadingPage />}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg booking-modal">
            <div className="modal-content booking-content">
              <div className="modal-header booking-header">
                <h5 className="modal-title booking-title" id="exampleModalLabel">
                  <FormattedMessage id="doctor-detail.booking-info" />
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <form onSubmit={this.handleBookingExamination} className="row p-3 g-3">
                <div className="modal-body booking-body">
                  <div className="doctor-information">
                    <ProfileDoctor isShowPrice={true} doctorId={doctorId} isShowDes={false} dataModal={dataModal} />
                  </div>

                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.full-name" />:
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        name="fullName"
                        onChange={(e) => this.handleOnchangeInput(e)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.phone-number" />:
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => this.handleOnchangeInput(e)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.email-address" />:
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => this.handleOnchangeInput(e)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.address" />:
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => this.handleOnchangeInput(e)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.reason-booking" />:
                      </label>
                      <input
                        type="text"
                        name="reason"
                        value={reason}
                        onChange={(e) => this.handleOnchangeInput(e)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.birthday" />:
                      </label>
                      <DatePicker
                        style={{ cursor: "pointer" }}
                        className="form-select"
                        onChange={this.handleOnchangeDate}
                        value={birthday}
                        required
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="doctor-detail.gender" />:
                      </label>
                      <Select
                        value={gender}
                        placeholder={"select gender..."}
                        onChange={this.handleOnchangeGender}
                        options={this.state.genders}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary btn-close-booking" data-bs-dismiss="modal">
                    <FormattedMessage id="doctor-detail.close-modal" />
                  </button>
                  <button type="submit" className="btn btn-outline-primary btn-save-booking">
                    <FormattedMessage id="doctor-detail.save-booking" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderRedux: () => dispatch(actions.fetchGenderStart()),
    createBookingExamination: (data) => dispatch(actions.createBookingExamination(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
