import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// import * as actions from "../../../store/actions";
import * as userService from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";

//markdown
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSpecialty: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}
  //handle onChange
  handleOnchange = (e) => {
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
  handleSaveSpecialty = async () => {
    const res = await userService.createNewSpecialty(this.state);
    if (res && res.status === "OK") {
      toast.success("Tạo mới chuyên khoa thành công!!");
    } else {
      toast.error("Tạo chuyên khoa thất bại");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title title py-3">
          <FormattedMessage id="admin.specialty.manage-specialty" />
        </div>
        <div className="manage-content-specialty container">
          <form>
            <div className="row my-3  ">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="admin.specialty.specialty-name" />:
                </label>
                <input
                  type="text"
                  placeholder="Tên chuyên khoa..."
                  value={this.state.nameSpecialty}
                  onChange={(e) => this.handleOnchange(e)}
                  name="nameSpecialty"
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="file">
                  <FormattedMessage id="admin.specialty.specialty-avatar" />:
                </label>
                <input type="file" id="file" onChange={(e) => this.handleOnchangeImage(e)} className="form-control" />
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
              <button
                type="button"
                onClick={() => this.handleSaveSpecialty()}
                className="btn btn-outline-success btn-lg"
              >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
