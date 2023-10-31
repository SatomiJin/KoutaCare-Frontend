import React, { Component } from "react";
import { connect } from "react-redux";
import MdEditor from "react-markdown-editor-lite";
import moment from "moment";
import MarkdownIt from "markdown-it";
import { toast } from "react-toastify";

import * as actions from "../../../store/actions";
import "./ManageAllSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { CommonUtils } from "../../../utils";
import * as userService from "../../../services/userService";
import Loading from "../../../components/Loading";
import LoadingPage from "../../../components/LoadingPage";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageAllSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameSpecialty: "",
      createdAt: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      image: "",
      listSpecialty: [],
      selectedSpecialty: "",
      isLoading: false,
      isLoadingModal: false,
    };
  }

  componentDidMount() {
    this.handleLoading("isLoading");
    this.props.getAllSpecialtyRedux();
    this.setState({
      listSpecialty: this.props.allSpecialtyRedux,
    });
  }
  handleLoading = (type) => {
    if (type === "isLoading") {
      this.setState({
        isLoading: !this.state.isLoading,
      });
    }
    if (type === "isLoadingModal") {
      this.setState({
        isLoadingModal: !this.state.isLoadingModal,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
      this.handleLoading("isLoading");
      this.setState({
        listSpecialty: this.props.allSpecialtyRedux,
        isLoading: false,
      });
    }
    if (prevProps.allSpecialtyRedux !== this.props.allSpecialtyRedux) {
      this.setState({
        nameSpecialty: "",
        descriptionHTML: "",
        image: "",
        createdAt: "",
        updatedAt: "",
      });
    }
  }
  //specialty information
  handleBuildInfoSpecialty = (item) => {
    this.handleLoading("isLoadingModal");
    this.setState({
      id: item.id,
      descriptionMarkdown: item.descriptionMarkdown,
      nameSpecialty: item.name,
      descriptionHTML: item.descriptionHTML,
      image: item.image,
      createdAt: item.createdAt,
      updatedAt: new Date(),
      isLoadingModal: false,
    });
  };
  //handle delete
  handleDeleteSpecialty = (item) => {
    this.setState({
      selectedSpecialty: item.id,
      nameSpecialty: item.name,
    });
  };
  deleteSpecialtyById = async (data) => {
    await this.props.deleteSpecialtyRedux(data.id);

    await this.props.getAllSpecialtyRedux();
    this.setState({
      listSpecialty: this.props.allSpecialtyRedux,
    });
  };
  //format
  formatDate = (date) => {
    let dateTime = moment(date.createdAt).utc().format("DD/MM/YYYY");
    return dateTime;
  };
  //
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  //
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

  handleEditSpecialty = async () => {
    let res = await userService.editSpecialtyById({
      id: this.state.id,
      name: this.state.nameSpecialty,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      image: this.state.image,
      updatedAt: this.state.updatedAt,
    });
    if (res && res.status === "OK") {
      await this.props.getAllSpecialtyRedux();
      this.setState({
        listSpecialty: this.props.allSpecialtyRedux,
      });
      toast.success("Sửa chuyên khoa thành công!");
    } else {
      toast.error("Sửa chuyên khoa thất bại!");
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
    let { isLoading, isLoadingModal, listSpecialty } = this.state;
    return (
      <>
        {isLoading && <LoadingPage />}
        <div className="all-specialty-container">
          <div className="container">
            <div className="title my-3">
              <FormattedMessage id="admin.specialty.manage-specialty-info" />
            </div>
            <table className="table table-hover table-all-specialty text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    {" "}
                    <FormattedMessage id="admin.specialty.specialty-name" />:
                  </th>
                  <th scope="col">
                    {" "}
                    <FormattedMessage id="admin.specialty.created-at" />:
                  </th>

                  <th scope="col">
                    <FormattedMessage id="manage-user.actions" />:
                  </th>
                </tr>
              </thead>
              <tbody>
                {listSpecialty &&
                  listSpecialty.length > 0 &&
                  listSpecialty.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{this.formatDate(item.createdAt)}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => this.handleBuildInfoSpecialty(item)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => this.deleteSpecialtyById(item)}
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
            <Loading isLoading={isLoadingModal}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      <FormattedMessage id="admin.specialty.detail-specialty" />
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="form-group col-6">
                        <label>
                          <FormattedMessage id="admin.specialty.specialty-name" />:
                        </label>
                        <input
                          type="text"
                          onChange={(e) => this.handleOnchangeEdit(e)}
                          className="form-control"
                          value={this.state.nameSpecialty}
                          name="nameSpecialty"
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
                      <div className="form-group col-12 my-3">
                        <label>
                          <FormattedMessage id="admin.specialty.specialty-avatar" />:
                        </label>
                        <input type="file" className="form-control" onChange={(e) => this.handleOnchangeImage(e)} />
                        <div
                          className="detail-specialty-image"
                          style={{ backgroundImage: `url("${this.state.image}")` }}
                        ></div>
                      </div>
                      <div className="form-group col-12 my-3">
                        <label>
                          {" "}
                          <FormattedMessage id="admin.specialty.specialty-description" />:
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
                      onClick={() => this.handleEditSpecialty()}
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
              </div>
            </Loading>
          </div>
        </div>
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
                    <FormattedMessage id="admin.specialty.quest-delete" /> {this.state.nameSpecialty}?
                  </h3>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    <FormattedMessage id="admin.specialty.close-modal-specialty" />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteSpecialtyById(this.state.selectedSpecialty)}
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
    allSpecialtyRedux: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyRedux: () => dispatch(actions.getAllSpecialty()),
    deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialtyById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAllSpecialty);
