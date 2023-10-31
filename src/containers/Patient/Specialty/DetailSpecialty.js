import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import LoadingPage from "../../../components/LoadingPage";
import * as userService from "../../../services/userService";
import HeaderHome from "../../HomePage/HeaderHome";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      this.handleLoading();
      let id = this.props.match.params.id;

      let res = await userService.getDetailSpecialtyById({
        specialtyId: id,
      });
      let resDoctor = await userService.getDoctorBySpecialty({
        specialtyId: id,
        location: "ALL",
      });

      let resProvince = await userService.getAllCodes("PROVINCE");
      if (
        res &&
        res.status === "OK" &&
        resProvince &&
        resProvince.status === "OK" &&
        resDoctor &&
        resDoctor.status === "OK"
      ) {
        let data = resDoctor.doctorSpecialty;

        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let list = data;
          if (list && list.length > 0) {
            list.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;

        if (dataProvince && dataProvince.length > 0) {
          dataProvince.push({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueVi: "Toàn Quốc",
            valueEn: "ALL",
          });
        }
        this.setState({
          dataDetailSpecialty: res.dataSpecialty,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince.reverse() : [],
        });
        this.handleLoading();
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  handleOnchangeSelect = async (e) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = e.target.value;
      let res = await userService.getDetailSpecialtyById({
        specialtyId: id,
      });
      let resDoctor = await userService.getDoctorBySpecialty({
        specialtyId: id,
        location: location,
      });

      if (res && res.status === "OK" && resDoctor && resDoctor.status === "OK") {
        let data = resDoctor.doctorSpecialty;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let list = data;
          if (list && list.length > 0) {
            list.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.dataSpecialty,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let language = this.props.language;
    let { isLoading, arrDoctorId, dataDetailSpecialty, listProvince } = this.state;

    return (
      <div className="detail-specialty-container">
        <HeaderHome />
        {isLoading === true && <LoadingPage />}
        <div className="detail-specialty-body container">
          <div className="description-specialty my-3">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div className="description-specialty-info">
                {React.createElement("div", {
                  dangerouslySetInnerHTML: { __html: dataDetailSpecialty.descriptionHTML },
                })}
              </div>
            )}
          </div>
          <div className="search-doctor-specialty col-2">
            <select onChange={(e) => this.handleOnchangeSelect(e)} className="form-select ">
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="detail-specialty-content " key={index}>
                  <div className="detail-specialty-each-doctor">
                    <div className="detail-specialty-content-left">
                      <ProfileDoctor
                        doctorId={item ? item : ""}
                        isShowDes={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                    <div className="detail-specialty-content-right">
                      <div className="detail-specialty-doctor-schedule">
                        <DoctorSchedule doctorId={item} />
                      </div>
                      <div className="detail-specialty-doctor-extra-info">
                        <DoctorExtraInfo doctorId={item} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
