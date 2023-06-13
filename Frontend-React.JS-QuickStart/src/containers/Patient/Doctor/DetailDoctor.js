import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../Homepage/HomeHeader";
import { Fragment } from "react";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGE } from "../../../utils";
import DoctorSchedule from "../../System/Doctor/DoctorSchedule";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: 1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforDoctor(id);
      if (res && res.infor.errCode === 0) {
        this.setState({
          detailDoctor: res.infor.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    console.log("check state kimchi: ", this.state);
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGE.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorIdFromParent={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="content-right"></div>
          </div>
          <div className="detail-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment"></div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
