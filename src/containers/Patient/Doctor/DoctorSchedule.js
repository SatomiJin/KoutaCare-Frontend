import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import BookingModal from "./Modal/BookingModal";
import "./DoctorSchedule.scss";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleDays: [],
      doctorSchedules: [],
      dataScheduleModal: {},
    };
  }

  componentDidMount() {
    //tạo ngày
    if (this.props.doctorId) {
      const allDays = this.getScheduleDays(this.props.language);
      this.props.getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
      this.setState({
        doctorSchedules: this.props.scheduleDoctorRedux ? this.props.scheduleDoctorRedux : [],
      });
    }
    let { language } = this.props;
    let allDays = this.getScheduleDays(language);
    if (allDays && allDays.length > 0) {
      this.setState({
        scheduleDays: allDays,
      });
    }
  }
  getScheduleDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          obj.label = today;
        } else {
          let firstLetter = moment(new Date()).add(i, "days").format("dddd - DD/MM").charAt(0).toUpperCase();
          obj.label = firstLetter + moment(new Date()).add(i, "days").format("dddd - DD/MM").slice(1);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date()).locale("en").add(i, "days").format("ddd - DD/MM");
        }
      }
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    return arrDate;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let allDays = this.getScheduleDays(this.props.language);
      this.setState({
        scheduleDays: allDays,
      });
    }
    if (prevProps.scheduleDoctorRedux !== this.props.scheduleDoctorRedux) {
      this.setState({
        doctorSchedules: this.props.scheduleDoctorRedux,
      });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      const allDays = this.getScheduleDays(this.props.language);
      this.props.getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
      this.setState({
        doctorSchedules: this.props.scheduleDoctorRedux ? this.props.scheduleDoctorRedux : [],
      });
    }
  }
  //select date
  handleOnChangeSelectDate = (e) => {
    if (this.props.doctorId) {
      let date = e.target.value;
      let doctorId = this.props.doctorId;
      this.props.getScheduleDoctorByDate(doctorId, date);
    }
  };
  //click schedule time
  handleClickScheduleTime = (time) => {
    this.setState({
      dataScheduleModal: time,
    });
  };
  render() {
    let language = this.props.language;

    const { scheduleDays, doctorSchedules, dataScheduleModal } = this.state;

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="time-select-schedule col-3">
            <select
              className="form-select form-select-sm text-center my-2 mx-2"
              aria-label=".form-select-sm example"
              onChange={(e) => this.handleOnChangeSelectDate(e)}
            >
              {scheduleDays &&
                scheduleDays.length > 0 &&
                scheduleDays.map((date, index) => {
                  return (
                    <option key={index} value={date.value}>
                      {date.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="list-schedule-times">
            <div className="calender-text">
              <span>
                <i className="fa-solid fa-calendar-days"></i> &nbsp;
                <FormattedMessage id="doctor-detail.calender" />
              </span>
            </div>
            <div className="schedule-time-content">
              {doctorSchedules && doctorSchedules.length > 0 ? (
                <>
                  <div className="schedule-time-content-btn">
                    {doctorSchedules.map((doctorSchedule, index) => {
                      return (
                        <div key={index}>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => this.handleClickScheduleTime(doctorSchedule)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            {language === LANGUAGES.VI
                              ? doctorSchedule.timeTypeData.valueVi
                              : doctorSchedule.timeTypeData.valueEn}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="booking-free">
                    <span>
                      <i className="fa-solid fa-arrow-pointer mx-2"></i>
                      <FormattedMessage id="doctor-detail.booking-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="col-12 text-lg-center text-uppercase fw-bold text-invalid-schedule">
                  <FormattedMessage id="doctor-detail.not-schedule-valid" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal dataModal={dataScheduleModal} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    scheduleDoctorRedux: state.user.scheduleDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleDoctorByDate: (doctorId, date) => dispatch(actions.getScheduleDoctorByDate(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
