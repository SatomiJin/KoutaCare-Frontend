import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FormattedMessage } from "react-intl";

import "./RemedyModal.scss";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
      previewImageUrl: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  //send remedyModal
  handleSendRemedy = async () => {
    await this.props.sendRemedy(this.state);
  };
  //onchange email
  handleOnchangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  //imageBase64
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };
  toggle = () => {
    this.props.toggle();
  };
  render() {
    let { dataModal } = this.props;
    let { imageBase64, previewImageUrl } = this.state;
    return (
      <div className="container remedy-modal-container">
        <Modal size="lg" toggle={this.toggle} isOpen={this.props.isOpenModal}>
          <ModalHeader style={{ position: "relative" }}>
            <FormattedMessage id="admin.manage-patient-booking.invoice" />
            <button
              type="button"
              style={{ position: "absolute", right: 20 }}
              className="btn btn-close btn-sm"
              aria-label="Close"
              onClick={() => this.props.handleCloseModal()}
            ></button>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  {" "}
                  <FormattedMessage id="admin.manage-patient-booking.patient-email" />:
                </label>
                <input
                  type="email"
                  required
                  value={this.state.email || ""}
                  onChange={(e) => this.handleOnchangeEmail(e)}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="admin.manage-patient-booking.remedy-invoice" />:
                </label>
                <input
                  required
                  className="form-control"
                  onChange={(e) => this.handleOnchangeImage(e)}
                  type="file"
                  id="file"
                />
                {previewImageUrl && (
                  <div
                    className="preview-remedy-image form-control m-3"
                    style={{ backgroundImage: `url("${previewImageUrl}")` }}
                  ></div>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" onClick={() => this.handleSendRemedy()} className="btn btn-outline-primary">
              <FormattedMessage id="admin.manage-patient-booking.send-invoice" />
            </button>
            <button className="btn btn-secondary" onClick={() => this.props.handleCloseModal()}>
              <FormattedMessage id="admin.manage-patient-booking.cancel" />
            </button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
