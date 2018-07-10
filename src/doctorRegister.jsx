import React, { Component } from "react";
import HospitalData from "../a.json";
import $ from "jquery";
export default class doctorRegister extends Component {
  doctorLogin() {
    $.ajax({
      url: "http://120.77.204.15:3000/doctorLogin",
      data: {
        doctorName: this.refs.doctorName.value,
        password: this.refs.password.value
      },
      type: "post",
      success: data => {
        if (data === "success") {
          this.props.changeLoginStatus(true, this.refs.doctorName.value,'doctor');
        } else {
          alert("账号或密码有误");
        }
      }
    });
  }
  render() {
    let style = {
      input: {
        width: 300,
        height: 18,
        fontSize: 18,
        marginTop: 30,
        padding: 9
      },
      inputFile: {
        width: 300,
        height: 18,
        fontSize: 18,
        marginTop: 30,
        padding: 9,
        marginLeft: 0,
        backgroundColor: "white"
      },
      button: {
        color: "#f8f8f8",
        height: 48,
        backgroundColor: "red",
        width: 200,
        margin: "50px 63px",
        borderRadius: 5,
        border: "none"
      },
      signForm: {
        width: 326,
        padding: "10px 100px 10px 100px",
        height: 370,
        margin: "0 auto",
        borderRadius: 10,
        border: "1px solid black",
        backgroundColor: "white",
        boxShadow: "10px 10px 5px #888888",
        paddingTop: 50
      },
      title: {
        marginLeft: 0,
        borderBottom: "solid 1px black",
        width: "100%",
        marginBottom: 20
      }
    };
    return (
      <div>
        <div style={style.title}>
          <h4>医生登录</h4>
        </div>
        <div id="signForm" style={style.signForm}>
          <input
            style={style.input}
            name="doctorName"
            type="text"
            ref="doctorName"
            placeholder="账号"
            required="required"
          />
          <input
            style={style.input}
            name="password"
            type="password"
            ref="password"
            placeholder="密码"
            required="required"
          />
          <button style={style.button} onClick={this.doctorLogin.bind(this)}>
            登录
          </button>
        </div>
      </div>
    );
  }
}
