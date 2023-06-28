import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./RemedyModel.scss";
import _ from "lodash";
import { toast } from "react-toastify";
import moment from "moment";
import CommonUtils from "../../../utils/CommonUtils";
import * as actions from "../../../store/actions";
class RemedyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    // console.log("check file: ", file);
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handlesendRemedy = () => {
    this.props.sendRemedy(this.state);
    console.log("check state modal: ", this.state);
  };
  render() {
    let { isOpenModal, closeRemedyModel, dataModal, sendRemedy } = this.props;

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
        // backdrop={true}
      >
        <div className="modal-header">
          <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRemedyModel}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email bệnh nhân</label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChangeEmail(event);
                }}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn fie đơn thuốc</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handlesendRemedy()}>
            Send
          </Button>
          <Button color="secondary" onClick={closeRemedyModel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gender: state.admin.gender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
