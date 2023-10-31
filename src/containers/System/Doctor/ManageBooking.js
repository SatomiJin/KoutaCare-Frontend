import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import * as actions from "../../../store/actions";
import "./ManageBooking.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import * as userService from "../../../services/userService";
import moment from "moment";
import RemedyModal from "./RemedyModal";
import LoadingPage from "../../../components/LoadingPage";

class ManageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataBookingPatient: [],
      dataModal: {},
      isOpenModal: false,
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.handleBuildDataBooking();
  }
  handleBuildDataBooking = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await userService.getPatientBooking(user.id, formattedDate);
    if (res && res.status === "OK") {
      this.setState({
        dataBookingPatient: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {}
  //select date for schedule medical
  handleOnChangeDate = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.handleBuildDataBooking();
      }
    );
  };
  handleConfirmBooking = (item) => {
    this.handleOpenModal();
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.lastName,
    };
    this.setState({
      dataModal: data,
    });
  };
  sendRemedy = async (data) => {
    this.handleIsLoading();
    let { dataModal } = this.state;
    let res = await userService.sendRemedyToEmail({
      email: data.email,
      imageBase64: data.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.status === "OK") {
      this.handleIsLoading();
      toast.success("Send remedy to patient's email is success!!!");
      await this.handleBuildDataBooking();
      this.setState({
        dataModal: [],
      });
      this.handleCloseModal();
    } else {
      toast.error("Send remedy to patient's email is failed!!");
    }
  };
  handleIsLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };
  handleOpenModal = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  render() {
    let { dataBookingPatient, isLoading } = this.state;
    let { language } = this.props;

    return (
      <>
        {isLoading === true && <LoadingPage />}
        <div className="manage-patient-booking-container">
          <div className="manage-patient-booking-wrapper container">
            <div className="manage-patient-booking-title title">
              <FormattedMessage id="admin.manage-patient-booking.manage-booking" />
            </div>

            <div style={{ borderRadius: "1rem" }} className="manage-patient-booking-body px-2 row">
              <div className="col-3 form-group" style={{ marginBottom: "2rem" }}>
                <label htmlFor="date">
                  <FormattedMessage id="admin.manage-patient-booking.choose-date" />:
                </label>
                <DatePicker
                  id="date"
                  className="form-select"
                  value={this.state.currentDate}
                  style={{ cursor: "pointer" }}
                  onChange={this.handleOnChangeDate}
                />
              </div>
              <div className="col-12" style={{ border: "1px solid #ccc", borderRadius: "1rem" }}>
                <table className="table table-striped table-hover manage-patient-booking-table">
                  <thead className="text-center">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.full-name" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.gender" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.phone-number" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.address" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.status" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.time" />
                      </th>
                      <th scope="col">
                        <FormattedMessage id="admin.manage-patient-booking.actions" />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {dataBookingPatient && dataBookingPatient.length > 0 ? (
                      dataBookingPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.patientData.lastName}</td>
                            <td>
                              {language === LANGUAGES.VI
                                ? item.patientData.genderData.valueVi
                                : item.patientData.genderData.valueEn}
                            </td>
                            <td>{item.patientData.phoneNumber}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.statusId}</td>
                            <td>
                              {language === LANGUAGES.VI ? item.timeTypeBooking.valueVi : item.timeTypeBooking.valueEn}
                            </td>
                            <td>
                              <button
                                onClick={() => this.handleConfirmBooking(item)}
                                type="button"
                                className="btn btn-outline-success"
                                // data-bs-toggle="modal"
                                // data-bs-target="#remedyModal"
                              >
                                <FormattedMessage id="admin.manage-patient-booking.confirm" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} style={{ textTransform: "uppercase", fontSize: "1.2rem", fontWeight: 600 }}>
                          <FormattedMessage id="admin.manage-patient-booking.no-appointment" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={this.state.isOpenModal}
          dataModal={this.state.dataModal}
          sendRemedy={this.sendRemedy}
          handleCloseModal={this.handleCloseModal}
          handleOpenModal={this.handleOpenModal}
          toggle={this.toggle}
          handleIsLoading={this.handleIsLoading}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
