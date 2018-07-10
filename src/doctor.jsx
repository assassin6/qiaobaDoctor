import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
export default class Doctor extends Component {
  render() {
    let style = {
      container: {
        width: 430,
        padding: 10,
        border: "1px solid #E7E7E7",
        height: 153,
        margin: "20px 20px 0 0",
        float: "left"
      }
    };
    return (
      <div style={style.container}>
        <div
          style={{ float: "left", width: 81, marginTop: 10, marginRight: 5 }}
          onClick={() => {
            if (this.props.userName) {
              $.ajax({
                type: "post",
                url: "http://120.77.204.15:3000/addMessageList/",
                data: {
                  userName: this.props.userName,
                  doctor: this.props.doctor.doctorName,
                  message:{}
                },
                success: data => {
                  if (data === "success") {
                    this.setState({
                      addMessageList: false
                    });
                  }
                }
              });
            }
          }}
        >
          <Link
            to={{
              pathname: "/askDoctor",
              query: {
                doctor: this.props.doctor.doctorName
              }
            }}
          >
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528626588254&di=1180906766b6a6e2f24e608fedf9cd7f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a1955ed02cc32f875a13291fb8b.png"
              style={{ width: 81, height: 81, borderRadius: 40 }}
              alt="暂无图片"
            />
          </Link>
        </div>
        <div style={{ marginTop: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
              marginRight: 10,
              fontSize: 17
            }}
          >
            {this.props.doctor.realName}
          </span>
          <span>{this.props.doctor.branch}</span>
          <span
            style={{
              display: "block",
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            {this.props.doctor.hospital}
          </span>
          <span style={{ display: "inline", marginRight: 50, fontSize: 14 }}>
            质询人次:
          </span>
          <span style={{ display: "inline", fontSize: 14 }}>好评率:</span>
          <hr />
          <span style={{ fontSize: 14 }}>擅长:{this.props.doctor.disease}</span>
        </div>
      </div>
    );
  }
}
