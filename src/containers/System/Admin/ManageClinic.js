import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// import * as actions from "../../../store/actions";
import * as userService from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

//markdown
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClinic: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
  //handle onChange
  handlOnchange = (e) => {
    let copyState = { ...this.state };
    copyState[e.target.name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  //image
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      //   const objectUrl = URL.createObjectURL(file);
      this.setState({
        // previewImageUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };
  //save
  handleSaveClinic = async () => {
    const res = await userService.createNewClinic(this.state);
    if (res && res.status === "OK") {
      toast.success("Tạo mới phòng khám thành công!!");
      this.setState({
        nameClinic: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        address: "",
      });
    } else {
      toast.error("Tạo phòng khám thất bại");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title title py-3">
          <FormattedMessage id="admin.clinic.add-clinic" />
        </div>
        <div className="manage-content-specialty container">
          <form>
            <div className="row my-3  ">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="admin.clinic.name-clinic" />:
                </label>
                <input
                  type="text"
                  placeholder="Tên chuyên khoa..."
                  value={this.state.nameClinic}
                  onChange={(e) => this.handlOnchange(e)}
                  name="nameClinic"
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="file">
                  <FormattedMessage id="admin.clinic.clinic-image" />:
                </label>
                <input type="file" id="file" onChange={(e) => this.handleOnchangeImage(e)} className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="admin.clinic.clinic-address" />:
                </label>
                <input
                  type="text"
                  onChange={(e) => this.handlOnchange(e)}
                  name="address"
                  value={this.state.address}
                  className="form-control"
                  placeholder="54c Đường số 4..."
                />
              </div>
            </div>
            <MdEditor
              className="mdEditor"
              style={{ height: "500px" }}
              value={this.state.descriptionMarkdown}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
            <div
              className="btn-save-specialty my-3
            "
            >
              <button type="button" onClick={() => this.handleSaveClinic()} className="btn btn-outline-success btn-lg">
                <FormattedMessage id="admin.specialty.specialty-save" />
              </button>
            </div>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
