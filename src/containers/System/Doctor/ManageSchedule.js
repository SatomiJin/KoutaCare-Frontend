import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import "./ManageSchedule.scss";
import { toast } from "react-toastify";
// import moment from "moment";
import * as userService from "../../../services/userService";
import LoadingPage from "../../../components/LoadingPage";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDoctor: "",
      listDoctors: [],
      currentDate: "",
      rangeTimes: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.getAllDoctorsRedux();
    this.handleLoading();
    let res = await userService.getAllDoctors();

    if (res && res.status === "OK") {
      this.handleLoading();

      let dataSelect = this.handleBuildInputSelect(res.users);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    this.props.getAllTimesRedux();
  }
  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.allDoctors !== this.props.allDoctors) {
    //   let dataSelect = this.handleBuildInputSelect(this.props.allDoctors);

    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
    if (prevProps.language !== this.props.language) {
      this.handleLoading();

      let res = await userService.getAllDoctors();

      if (res && res.status === "OK") {
        this.handleLoading();

        let dataSelect = this.handleBuildInputSelect(res.users);
        this.setState({
          listDoctors: dataSelect,
        });
      }
    }
    if (prevProps.allTimesRedux !== this.props.allTimesRedux) {
      let range = this.props.allTimesRedux;
      if (range && range.length > 0) {
        // range = range.map((times) => {
        //   times.isSelected = false;
        //   return times;
        // });
        range = range.map((times) => ({ ...times, isSelected: false }));
      }
      this.setState({
        rangeTimes: range,
      });
    }
  }
  //build data input select
  handleBuildInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((doctor) => {
        let object = {};
        let labelVi = `${doctor.firstName} ${doctor.lastName}`;
        let labelEn = `${doctor.lastName} ${doctor.firstName}`;
        object.value = doctor.id;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        result.push(object);
      });
    }
    return result;
  };
  //select in react-select
  handleChange = (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    });
  };
  //select date for schedule medical
  handleOnChangeDate = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  //click choose time
  handleSelectedTime = (times) => {
    let { rangeTimes } = this.state;

    if (rangeTimes && rangeTimes.length > 0) {
      rangeTimes = rangeTimes.map((time) => {
        if (time.id === times.id) time.isSelected = !time.isSelected;
        return time;
      });
      this.setState({
        rangeTimes: rangeTimes,
      });
    }
  };
  //save schedule medical
  handleSaveScheduleDoctor = () => {
    const { rangeTimes, selectedDoctor, currentDate } = this.state;
    console.log(selectedDoctor);

    let result = [];
    if (!currentDate) {
      toast.error(<FormattedMessage id="manage-schedule.invalid-date" />);
      return;
    }
    if (!selectedDoctor) {
      toast.error(<FormattedMessage id="manage-schedule.invalid-doctor" />);
      return;
    }
    const formatDate = new Date(currentDate).getTime();
    if (rangeTimes && rangeTimes.length > 0) {
      const listTimeSelected = rangeTimes.filter((time) => time.isSelected === true);
      if (listTimeSelected && listTimeSelected.length > 0) {
        // eslint-disable-next-line array-callback-return
        listTimeSelected.map((time) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatDate;
          obj.timeType = time.keyMap;
          result.push(obj);
        });
      } else {
        toast.error(<FormattedMessage id="manage-schedule.invalid-time" />);
        return;
      }
    }
    this.props.saveScheduleDoctor({
      listSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatDate,
    });
  };
  render() {
    const { rangeTimes } = this.state;
    const { language } = this.props;
    console.log(this.state.listDoctors);
    let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
    return (
      <div className="manage-schedule-medical-container">
        {this.state.isLoading === true && <LoadingPage />}
        <div className="container manage-schedule">
          <div className="title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container my-4 schedule-content">
            <div className="row my-3">
              <div className="col-6 form-group">
                <label htmlFor="choose">
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  id="choose"
                  value={this.state.selectedDoctor}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                />
              </div>

              <div className="col-6 form-group">
                <label htmlFor="date">
                  <FormattedMessage id="manage-schedule.select-date" />
                </label>
                <DatePicker
                  className="form-select"
                  value={this.state.currentDate}
                  minDate={yesterday}
                  style={{ cursor: "pointer" }}
                  onChange={this.handleOnChangeDate}
                />
              </div>
            </div>
            <div className="col-12 form-group select-hours-container">
              <label className="form-control">
                <FormattedMessage id="manage-schedule.choose-times" />
              </label>
              {rangeTimes &&
                rangeTimes.length &&
                rangeTimes.map((times, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        times.isSelected ? "btn btn-info btn-times-schedule" : "btn btn-outline-info btn-times-schedule"
                      }
                      onClick={() => this.handleSelectedTime(times)}
                      type="button"
                    >
                      {language === LANGUAGES.VI ? times.valueVi : times.valueEn}
                    </button>
                  );
                })}
            </div>
            <div className="col-12">
              <button type="button" onClick={this.handleSaveScheduleDoctor} className="btn btn-info my-3">
                <FormattedMessage id="manage-schedule.save-schedule" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allTimesRedux: state.admin.allTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    getAllTimesRedux: (type) => dispatch(actions.getAllTimesSchedule(type)),
    saveScheduleDoctor: (data) => dispatch(actions.saveScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
