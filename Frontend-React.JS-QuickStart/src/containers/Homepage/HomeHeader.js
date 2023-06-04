import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import * as actions from "../../store/actions";
import logo from "../../assets/images/bookingcare-2020.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    // fire redux event : actions
  };
  render() {
    let language = this.props.language;
    console.log("check userInfo: ", this.props.userInfo);
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="logo" src={logo} />
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.heath-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div
                className={
                  language === LANGUAGE.VI
                    ? `language-vi active`
                    : `lauguage-vi`
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGE.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGE.EN
                    ? `language-en active`
                    : `lauguage-en`
                }
              >
                <span
                  onClick={() => {
                    this.changeLanguage(LANGUAGE.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">
              <FormattedMessage id="banner.MEDICAL-BACKGROUND" />
            </div>
            <div className="title2">
              <FormattedMessage id="banner.COMPREHENSIVE-HEALTH-CARE" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Specialist-examination" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Remote-examination" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-procedures"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.General-examination" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-flask"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Medical-test" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-user-md"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Mental-health" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-stethoscope"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Dental-examination" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-hospital-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Surgery-Package" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-ambulance"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Medical-Products" />
                </div>
              </div>
              <div className="child-option">
                <div className="icon-child">
                  <i className="fas fa-stopwatch"></i>{" "}
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.Health-Test" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
