import React, { Component } from "react";
import { connect } from "react-redux";
import * as userService from "../../../services/userService";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      //detail
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  async componentDidMount() {
    this.props.getRequiredDoctorDetailsRedux();

    let res = await userService.getAllDoctors();
    if (res && res.status === "OK") {
      let dataSelect = this.handleBuildInputSelect(res.users, "USERS");

      this.setState({
        listDoctors: dataSelect,
      });
    }
    // this.props.getDetailDoctorById(this.state.selectedDoctor);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    let res = await userService.getAllDoctors();

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.handleBuildInputSelect(res.users, "USERS");

      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevState.selectedDoctor !== this.state.selectedDoctor || prevProps.language !== this.props.language) {
      let res = await userService.getDetailDoctorByID(this.state.selectedDoctor.value);
      const { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
      let paymentMethod = {};
      let totalPrice = {};
      let province = {};
      let specialty = {};
      let clinic = {};
      if (res.users && res.users.DoctorInfo && res.users.DoctorInfo !== null) {
        paymentMethod = listPayment.find((item) => {
          return item && item.value === res.users.DoctorInfo.paymentId;
        });
        totalPrice = listPrice.find((item) => {
          return item && item.value === res.users.DoctorInfo.priceId;
        });
        province = listProvince.find((item) => {
          return item && item.value === res.users.DoctorInfo.provinceId;
        });
        specialty = listSpecialty.find((item) => {
          return item && item.value === res.users.DoctorInfo.specialtyId;
        });
        clinic = listClinic.find((item) => {
          return item && item.value === res.users.DoctorInfo.clinicId;
        });
      }

      this.setState({
        contentMarkdown: res.users && res.users.Markdown ? res.users.Markdown.contentMarkdown : "",
        contentHTML: res.users && res.users.Markdown ? res.users.Markdown.contentHTML : "",
        description: res.users && res.users.Markdown ? res.users.Markdown.description : "",
        selectedPrice: totalPrice,
        selectedPayment: paymentMethod,
        selectedProvince: province,

        nameClinic: res.users && res.users.DoctorInfo ? res.users.DoctorInfo.nameClinic : "",
        addressClinic: res.users && res.users.DoctorInfo ? res.users.DoctorInfo.addressClinic : "",
        note: res.users && res.users.DoctorInfo ? res.users.DoctorInfo.note : "",
        selectedSpecialty: specialty,
        selectedClinic: clinic,
      });
    }

    // if (prevProps.doctorDetailsRedux !== this.props.doctorDetailsRedux) {
    //   const { doctorDetailsRedux } = this.props;
    //   const { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state;
    //   let paymentMethod = {};
    //   let totalPrice = {};
    //   let province = {};
    //   let specialty = {};
    //   let clinic = {};
    //   if (doctorDetailsRedux && doctorDetailsRedux.DoctorInfo && doctorDetailsRedux.DoctorInfo !== null) {
    //     paymentMethod = listPayment.find((item) => {
    //       return item && item.value === doctorDetailsRedux.DoctorInfo.paymentId;
    //     });
    //     totalPrice = listPrice.find((item) => {
    //       return item && item.value === doctorDetailsRedux.DoctorInfo.priceId;
    //     });
    //     province = listProvince.find((item) => {
    //       return item && item.value === doctorDetailsRedux.DoctorInfo.provinceId;
    //     });
    //     specialty = listSpecialty.find((item) => {
    //       return item && item.value === doctorDetailsRedux.DoctorInfo.specialtyId;
    //     });
    //     clinic = listClinic.find((item) => {
    //       return item && item.value === doctorDetailsRedux.DoctorInfo.clinicId;
    //     });
    //   }

    //   this.setState({
    //     contentMarkdown:
    //       doctorDetailsRedux && doctorDetailsRedux.Markdown ? doctorDetailsRedux.Markdown.contentMarkdown : "",
    //     contentHTML: doctorDetailsRedux && doctorDetailsRedux.Markdown ? doctorDetailsRedux.Markdown.contentHTML : "",
    //     description: doctorDetailsRedux && doctorDetailsRedux.Markdown ? doctorDetailsRedux.Markdown.description : "",
    //     selectedPrice: totalPrice,
    //     selectedPayment: paymentMethod,
    //     selectedProvince: province,

    //     nameClinic: doctorDetailsRedux && doctorDetailsRedux.DoctorInfo ? doctorDetailsRedux.DoctorInfo.nameClinic : "",
    //     addressClinic:
    //       doctorDetailsRedux && doctorDetailsRedux.DoctorInfo ? doctorDetailsRedux.DoctorInfo.addressClinic : "",
    //     note: doctorDetailsRedux && doctorDetailsRedux.DoctorInfo ? doctorDetailsRedux.DoctorInfo.note : "",
    //     selectedSpecialty: specialty,
    //     selectedClinic: clinic,
    //   });
    // }
    if (
      prevProps.allRequiredDetailDoctorRedux !== this.props.allRequiredDetailDoctorRedux ||
      prevProps.language !== this.props.language
    ) {
      let { dataPrice, dataPayment, dataProvince, dataSpecialty, dataClinic } = this.props.allRequiredDetailDoctorRedux;
      let dataSelectPrice = this.handleBuildInputSelect(dataPrice, "PRICE");
      let dataSelectPayment = this.handleBuildInputSelect(dataPayment, "PAYMENT");
      let dataSelectProvince = this.handleBuildInputSelect(dataProvince, "PROVINCE");
      let dataSelectSpecialty = this.handleBuildInputSelect(dataSpecialty, "SPECIALTY");
      let dataSelectClinic = this.handleBuildInputSelect(dataClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }
  //build data input select
  handleBuildInputSelect = (data, type) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      if (type === "USERS") {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.value = item.id;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          result.push(object);
        });
      }
      if (type === "PRICE") {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let formattedVi = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          });
          let labelVi = formattedVi.format(item.valueVi);
          let labelEn = `${item.valueEn} USD`;
          object.value = item.keyMap;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.value = item.keyMap;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;

          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "CLINIC") {
        data.map((item) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      return result;
    }
  };
  //onchange
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  //change description
  handleOnchangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  //save content markdown
  handleSaveInfoDoctor = () => {
    this.props.saveDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,

      //info
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };
  //edit detail doctor
  handleEditDetailDoctor = () => {
    this.props.editDetailDoctorRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,

      //info
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
  };
  //select in react-select
  handleChange = (selectedDoctor) => {
    this.setState({
      selectedDoctor,
    });
  };
  //change doctor info
  handleChangeSelectDetail = (selectedOption, name) => {
    const nameOption = name.name;
    let copyState = { ...this.state };
    copyState[nameOption] = selectedOption;

    this.setState({
      ...copyState,
    });
  };
  render() {
    let mdParser = new MarkdownIt(/* Markdown-it options */);
    let { nameClinic, addressClinic, note, listSpecialty } = this.state;
    let { doctorDetailsRedux } = this.props;

    return (
      <div className="container-doctor-management">
        <div className="title my-4">
          <FormattedMessage id="admin.title" />
        </div>
        <div className="doctor-info-container container">
          <div className="more-info">
            <div className="content-left form-group">
              <label htmlFor="choose">
                <FormattedMessage id="admin.select-doctor" />
              </label>
              <Select
                id="choose"
                name="doctor"
                placeholder={<FormattedMessage id="admin.select-doctor" />}
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right form-group">
              <label htmlFor="textarea">
                <FormattedMessage id="admin.doctor-description" />
              </label>
              <textarea
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "description")}
                value={this.state.description}
                id="textarea"
              ></textarea>
            </div>
          </div>
          <div className="select-options-doctor row my-3 mx-1">
            <div className="col-4 form-group">
              <label htmlFor="price">
                <FormattedMessage id="admin.select-price" />:
              </label>
              <Select
                id="price"
                name="selectedPrice"
                className="form-control"
                placeholder={<FormattedMessage id="admin.select-price" />}
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDetail}
                options={this.state.listPrice}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="payment">
                <FormattedMessage id="admin.select-payment" />:
              </label>
              <Select
                id="payment"
                name="selectedPayment"
                className="form-control"
                placeholder={<FormattedMessage id="admin.select-payment" />}
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDetail}
                options={this.state.listPayment}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="province">
                <FormattedMessage id="admin.select-province" />:
              </label>
              <Select
                id="province"
                name="selectedProvince"
                className="form-control"
                placeholder={<FormattedMessage id="admin.select-province" />}
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDetail}
                options={this.state.listProvince}
              />
            </div>
          </div>
          <div className="select-options-clinic row my-3 mx-1">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.clinic-name" />:
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "nameClinic")}
                value={nameClinic || ""}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.clinic-address" />:
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnchangeText(e, "addressClinic")}
                value={addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.note" />:
              </label>
              <input className="form-control" onChange={(e) => this.handleOnchangeText(e, "note")} value={note} />
            </div>
          </div>

          <div className="row my-3 mx-1">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.select-specialty" />:
              </label>
              <Select
                id="specialty"
                name="selectedSpecialty"
                className="form-control"
                placeholder={<FormattedMessage id="admin.select-specialty" />}
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDetail}
                options={listSpecialty}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.select-clinic" />:
              </label>
              {/* <input type="text" className="form-control" /> */}
              <Select
                id="clinic"
                name="selectedClinic"
                className="form-control"
                placeholder={<FormattedMessage id="admin.select-clinic" />}
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelectDetail}
                options={this.state.listClinic}
              />
            </div>
          </div>
          <div className="manage-doctor-details-editor">
            <MdEditor
              className="mdEditor"
              style={{ height: "300px" }}
              value={this.state.contentMarkdown}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>

          {doctorDetailsRedux && doctorDetailsRedux.Markdown && doctorDetailsRedux.DoctorInfo ? (
            <button
              type="button"
              className="btn btn-outline-info my-3 btn-lg save-details-doctor"
              onClick={() => this.handleEditDetailDoctor()}
            >
              <FormattedMessage id="admin.updates-information" />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success my-3 btn-lg save-details-doctor"
              onClick={() => this.handleSaveInfoDoctor()}
            >
              <FormattedMessage id="admin.save-information" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    doctorDetailsRedux: state.user.doctorDetails,
    allRequiredDetailDoctorRedux: state.admin.allRequiredDetailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    editDetailDoctorRedux: (data) => dispatch(actions.editDetailDoctor(data)),
    getDetailDoctorById: (id) => dispatch(actions.getDetailDoctorById(id)),
    getRequiredDoctorDetailsRedux: () => dispatch(actions.getRequiredDoctorDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
