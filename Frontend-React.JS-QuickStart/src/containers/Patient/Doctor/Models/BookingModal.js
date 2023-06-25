import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import "./BookingModal.scss";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGE } from "../../../../utils";
import Select from "react-select";
import { patientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phonenumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      doctorId: "",
      genders: "",
      selectedGender: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        console.log("check datatime: ", this.props.dataTime);
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let statecopy = { ...this.state };
    statecopy[id] = valueInput;
    this.setState({
      ...statecopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  buildDataBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGE.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGE.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return ``;
  };
  handleConfirmBooking = async () => {
    // validate input
    // !data.email || !data.doctorId || !data.date || !data.timeType
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildDataBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let response = await patientBookAppointment({
      fullName: this.state.fullName,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      doctorId: this.state.doctorId,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    console.log("check response : ", response);
    if (response && response.response.errCode === 0) {
      this.props.closeBookingModal();
      toast.success("Booking a new appointment success!");
    }
    toast.error("Booking a new appointment error!");
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGE.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return ``;
  };
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    let timeType = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
      timeType = dataTime.timeType;
    }
    console.log("data profile: ", dataTime);
    console.log("check state booking: ", this.state.genders);

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
        // backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="price"></div>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phonenumber" />
                </label>
                <input
                  className="form-control"
                  value={this.state.phonenumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phonenumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.birthday}
                />
              </div>
              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.genders" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.confirm" />
            </button>
            <button className="btn-booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.cancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
