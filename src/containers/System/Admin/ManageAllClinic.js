import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import moment from "moment";
import * as userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import LoadingPage from "../../../components/LoadingPage";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageAllClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameClinic: "",
      createdAt: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      image: "",
      updatedAt: "",
      listClinic: [],
      selectedClinic: "",
      isLoading: false,
      isLoadingModal: false,
    };
  }

  async componentDidMount() {
    this.handleLoading("LOADINGPAGE");
    let res = await userService.getAllClinic();
    if (res && res.status === "OK") {
      this.handleLoading("LOADINGPAGE");
      this.setState({
        listClinic: res.data,
      });
    }
  }
  handleLoading = (type) => {
    console.log(type);
    if (type === "LOADING") {
      this.setState({
        isLoadingModal: !this.state.isLoadingModal,
      });
    }
    if (type === "LOADINGPAGE") {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  //specialty information
  handleBuildInfoClinic = (item) => {
    this.handleLoading("LOADING");
    this.setState({
      id: item.id,
      nameClinic: item.name,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionMarkdown,
      image: item.image,
      address: item.address,
      updatedAt: new Date(),
      createdAt: item.createdAt,
      isLoadingModal: false,
    });
  };
  //handle delete
  handleDeleteClinic = (item) => {
    this.setState({
      selectedClinic: item.id,
      nameClinic: item.name,
    });
  };
  deleteClinicById = async (id) => {
    this.handleLoading("LOADINGPAGE");
    await this.props.deleteClinicByIdRedux(id);
    await this.props.getAllClinicRedux();
    this.setState({
      listClinic: this.props.allClinicRedux,
      isLoading: !this.state.isLoading,
    });
  };
  //format
  formatDate = (date) => {
    let dateTime = moment(date.createdAt).utc().format("DD/MM/YYYY");
    return dateTime;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      //   const objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImageUrl: objectUrl,
        image: base64,
      });
    }
  };

  handleEditClinic = async () => {
    let res = await userService.editClinicById({
      id: this.state.id,
      nameClinic: this.state.nameClinic,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      image: this.state.image,
      updatedAt: this.state.updatedAt,
      address: this.state.address,
    });

    if (res && res.status === "OK") {
      await this.props.getAllClinicRedux();
      this.setState({
        listClinic: this.props.allClinicRedux,
      });
      toast.success("Sửa phòng khám thành công!");
    } else {
      toast.error("Sửa phòng khám thất bại!");
    }
  };
  //edit
  handleOnchangeEdit = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    let { isLoading, isLoadingModal, listClinic } = this.state;
    console.log("isLoading", isLoading);
    console.log("isLoadingModal", isLoadingModal);
    return (
      <>
        {isLoading === true && <LoadingPage />}
        <div className="all-specialty-container">
          <div className="container">
            <div className="title my-3">
              <FormattedMessage id="admin.clinic.all-clinic" />
            </div>
            <table className="table table-hover table-all-specialty">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <FormattedMessage id="admin.clinic.name-clinic" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="admin.specialty.created-at" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="admin.clinic.clinic-address" />:
                  </th>
                  <th scope="col">
                    <FormattedMessage id="manage-user.actions" />:
                  </th>
                </tr>
              </thead>
              <tbody>
                {listClinic &&
                  listClinic.length > 0 &&
                  listClinic.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{this.formatDate(item.createdAt)}</td>
                        <td>{item.address}</td>
                        <td style={{ display: "flex" }}>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => this.handleBuildInfoClinic(item)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            type="button"
                            onClick={() => this.handleDeleteClinic(item)}
                            className="btn btn-danger mx-2"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="view-info-modal-container">
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <Loading isLoading={isLoadingModal}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      <FormattedMessage id="admin.clinic.clinic-detail" />
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="form-group col-6">
                        <label>
                          <FormattedMessage id="admin.clinic.name-clinic" />:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => this.handleOnchangeEdit(e)}
                          className="form-control"
                          value={this.state.nameClinic}
                          name="nameClinic"
                        />
                      </div>

                      <div className="form-group col-6">
                        <label>
                          <FormattedMessage id="admin.specialty.created-at" />:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.formatDate(this.state.createdAt)}
                          disabled
                        />
                      </div>
                      <div className="form-group col-6 my-3">
                        <label>
                          <FormattedMessage id="admin.clinic.clinic-address" />
                        </label>
                        <input
                          type="text"
                          onChange={(e) => this.handleOnchangeEdit(e)}
                          className="form-control"
                          value={this.state.address}
                          name="address"
                        />
                      </div>
                      <div className="form-group col-6 my-3">
                        <label>
                          <FormattedMessage id="admin.clinic.clinic-image" />:
                        </label>
                        <input type="file" className="form-control" onChange={(e) => this.handleOnchangeImage(e)} />
                        <div
                          className="detail-specialty-image"
                          style={{ backgroundImage: `url("${this.state.image}")` }}
                        ></div>
                      </div>
                      <div className="form-group col-12 my-3">
                        <label>
                          <FormattedMessage id="admin.clinic.clinic-description" />:
                        </label>
                        <MdEditor
                          className="mdEditor"
                          style={{ height: "500px" }}
                          value={this.state.descriptionMarkdown}
                          renderHTML={(text) => mdParser.render(text)}
                          onChange={this.handleEditorChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={() => this.handleEditClinic()}
                      className="btn btn-success btn-lg"
                      data-bs-dismiss="modal"
                    >
                      <FormattedMessage id="admin.specialty.save-modal-specialty" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-lg" data-bs-dismiss="modal">
                      <FormattedMessage id="admin.specialty.close-modal-specialty" />
                    </button>
                  </div>
                </div>
              </Loading>
            </div>
          </div>
        </div>
        {/* delete */}
        <div className="delete-specialty-modal-container">
          <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    <FormattedMessage id="admin.specialty.delete-specialty" />
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <h3>
                    <FormattedMessage id="admin.clinic.question-delete-clinic" />
                    <br />
                    {this.state.nameClinic}
                  </h3>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    <FormattedMessage id="admin.specialty.close-modal-specialty" />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteClinicById(this.state.selectedClinic)}
                    className="btn btn-outline-success"
                    data-bs-dismiss="modal"
                  >
                    <FormattedMessage id="admin.specialty.accept-delete" />
                  </button>
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
    allClinicRedux: state.admin.allClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClinicRedux: () => dispatch(actions.getAllClinic()),
    deleteClinicByIdRedux: (id) => dispatch(actions.deleteClinicById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAllClinic);
