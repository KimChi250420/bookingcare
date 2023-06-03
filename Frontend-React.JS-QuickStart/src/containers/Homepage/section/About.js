import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền Thông nói về sức khỏe</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/GDQn_l3yUdU"
              title="69 Câu Nói Hay Về Sức Khoẻ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Có gì cũng được trừ có bệnh, không có gì cũng được trừ không có
              tiền, thiếu gì cũng được trừ thiếu sức khỏe. Sức khỏe không phải
              là tất cả nhưng không có sức khỏe sẽ chẳng có thứ gì! Những câu
              nói về sức khỏe.Hãy giữ gìn sức khỏe
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
