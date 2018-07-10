import React, { Component } from "react";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import HospitalData from "../a.json";
import "../css/pageContent.css";
import $ from "jquery";
import Doctor from "./doctor.jsx";
import DoctorRegister from "./doctorRegister.jsx";
const socket = io.connect("http://120.77.204.15:3000");
class PageContent extends Component {
  constructor() {
    super();
    this.state = {
      department: []
    };
  }

  render() {
    return (
      <div id="pageContent" style={{ marginLeft: "10%", width: "80%" }}>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route
          path="/Login"
          render={props => (
            <Login
              {...this.props}
              changeLoginStatus={this.props.changeLoginStatus}
              loginStatus={this.props.loginStatus}
              userName={this.props.userName}
            />
          )}
        />
        <Route
          path="/signUp"
          render={props => (
            <SignUp
              {...this.props}
              changeLoginStatus={this.props.changeLoginStatus}
              loginStatus={this.props.loginStatus}
              userName={this.props.userName}
            />
          )}
        />
        <Route path="/searchByDoctor" component={SearchByDoctor} />
        <Route
          path="/searchByHospital"
          render={props => (
            <SearchByHospital {...this.props} userName={this.props.userName} />
          )}
        />
        <Route path="/searchByBranch" render={props => <SearchByBranch />} />
        <Route
          path="/diseaseKnowledge"
          render={props => <DiseaseKnowledge />}
        />
        <Route
          path="/askDoctor"
          render={props => (
            <AskDoctor
              {...this.props}
              userType={this.props.userType}
              loginStatus={this.props.loginStatus}
              userName={this.props.userName}
            />
          )}
        />
        <Route path="/hospitalDetail" component={HospitalDetail} />
        <Route path="/diseaseDetail/" component={DiseaseDetail} />
        <Route
          path="/doctorRegister"
          render={props => (
            <DoctorRegister
              {...this.props}
              changeLoginStatus={this.props.changeLoginStatus}
              loginStatus={this.props.loginStatus}
              userName={this.props.userName}
            />
          )}
        />
      </div>
    );
  }
}
export default PageContent;
class Home extends Component {
  constructor() {
    super();
    socket.on("timer", data => {
      console.log(data, 1);
    });
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}
class Login extends Component {
  sendLoginMessage() {
    $.ajax({
      url: "http://120.77.204.15:3000/login",
      data: {
        userName: this.refs.userName.value,
        password: this.refs.password.value
      },
      type: "post",
      success: data => {
        if (data === "success") {
          localStorage.userName=this.refs.userName.value
          localStorage.password=this.refs.password.value
          this.props.changeLoginStatus(true, this.refs.userName.value, "user");
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
      button: {
        color: "#f8f8f8",
        height: 48,
        backgroundColor: "red",
        width: 200,
        margin: "50px 63px",
        borderRadius: 5
      },
      signForm: {
        float: "left",
        width: 326,
        height: 270,
        marginRight: "5%",
        marginLeft: "17%"
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
          <h4>用户登录</h4>
        </div>
        <div id="signForm" style={style.signForm}>
          <input
            style={style.input}
            id="userName"
            type="text"
            placeholder="账号"
            ref="userName"
          />
          <input
            style={style.input}
            id="password"
            type="password"
            placeholder="密码"
            ref="password"
          />
          <Link to="/forgetPassword">忘记密码</Link>
          <Link to="/signUp" style={{ float: "right" }}>
            注册账号
          </Link>
          <button
            style={style.button}
            onClick={this.sendLoginMessage.bind(this)}
          >
            登录
          </button>
        </div>
        <div style={{ float: "left", width: 400, marginLeft: 0 }}>
          <img
            src="http://120.77.204.15:3000/img/乔巴.png"
            style={{ width: 380 }}
            alt={"Error"}
          />
        </div>
      </div>
    );
  }
}

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      userType: true,
      branchList: []
    };
  }
  componentDidMount() {
    $.ajax({
      type: "get",
      url: "http://120.77.204.15:3000/api/department",
      success: data => {
        this.setState({
          branchList: data
        });
      }
    });
  }
  sendSignMessage() {
    if (this.refs.signUserName.value.length < 8) {
      alert("用户名小于八位");
    } else if (this.refs.signUserName.value.length > 16) {
      alert("用户名不能超过16位");
    } else if (!this.refs.signPassword.value) {
      alert("密码不能为空");
    } else if (this.refs.signPassword.value !== this.refs.passwordTwo.value) {
      alert("两次输入的密码不相符");
    } else {
      $.ajax({
        url: "http://120.77.204.15:3000/sign",
        data: {
          userName: this.refs.signUserName.value,
          password: this.refs.signPassword.value
        },
        type: "post",
        success: data => {
          console.log(data);
          if (data === "success") {
            this.props.changeLoginStatus(true, this.refs.signUserName.value);
          } else {
            alert("用户名已存在");
          }
        }
      });
    }
  }
  doctorRegister() {
    $.ajax({
      url: "http://120.77.204.15:3000/doctorRegister",
      data: {
        userName: this.refs.userName.value,
        realName: this.refs.realName.value,
        password: this.refs.password.value,
        hospital: this.refs.hospital.value,
        branch: this.refs.branch.value,
        disease: this.refs.disease.value
      },
      type: "post",
      success: data => {}
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
      input2: {
        width: 300,
        float: "left",
        height: 18,
        fontSize: 18,
        marginTop: 30,
        padding: 9,
        marginLeft: 10
      },
      button: {
        color: "#f8f8f8",
        height: 48,
        backgroundColor: "red",
        width: 200,
        margin: "40px 63px",
        borderRadius: 5
      },
      button2: {
        color: "#f8f8f8",
        height: 48,
        backgroundColor: "red",
        width: 200,
        margin: "40px 230px",
        borderRadius: 5
      },
      signForm: {
        float: "left",
        width: 326,
        height: 330,
        marginRight: "5%",
        marginLeft: 20
      },
      signForm2: {
        float: "left",
        width: "72%",
        height: 330,
        marginRight: "5%",
        marginLeft: 20
      }
    };
    // const completePage = (
    //   <div style={{ marginLeft: 0 }}>
    //     <div style={style.signForm}>
    //       <h2>欢迎用户{this.props.userName}</h2>
    //       <span>请继续完善您的资料</span>
    //       <input
    //         style={style.input}
    //         ref="realName"
    //         type="text"
    //         placeholder="真实姓名"
    //       />
    //       <input
    //         style={style.input}
    //         ref="age"
    //         type="number"
    //         placeholder="年龄"
    //       />
    //       <input
    //         style={style.input}
    //         ref="weight"
    //         type="number"
    //         placeholder="体重:kg"
    //       />
    //       <input
    //         style={style.input}
    //         ref="height"
    //         type="number"
    //         placeholder="身高:cm"
    //       />
    //       <button
    //         style={style.button}
    //         onClick={this.submitUserDetail.bind(this)}
    //       >
    //         提交
    //       </button>
    //     </div>
    //   </div>
    // );
    let loginPage = this.state.userType ? (
      <div style={{ marginLeft: 0, height: 330 }}>
        <div id="signForm" style={style.signForm}>
          <input
            style={style.input}
            id="userName"
            type="text"
            placeholder="账号 8-16位字符数字组合"
            ref="signUserName"
          />
          <input
            style={style.input}
            id="password"
            type="password"
            placeholder="密码"
            ref="signPassword"
          />
          <input
            style={style.input}
            id="passwordTwo"
            type="password"
            ref="passwordTwo"
            placeholder="确认密码"
          />
          <Link to="/Login">已有账号，直接登录</Link>
          <button
            style={style.button}
            onClick={this.sendSignMessage.bind(this)}
          >
            注册
          </button>
        </div>
        <div style={{ float: "left", width: 400, marginLeft: 0 }}>
          <img
            src="http://120.77.204.15:3000/img/乔巴.png"
            style={{ width: 380 }}
            alt="加载出错"
          />
        </div>
      </div>
    ) : (
      <div style={{ marginLeft: 0, height: 330 }}>
        <div id="signForm" style={style.signForm2}>
          <input
            style={style.input2}
            ref="userName"
            type="text"
            placeholder="账号"
            required="required"
          />
          <input
            style={style.input2}
            ref="realName"
            placeholder="真实姓名"
            required="required"
          />
          <input
            style={style.input2}
            ref="password"
            type="password"
            placeholder="密码"
            required="required"
          />
          <input
            style={style.input2}
            ref="hospital"
            list="hospitalList"
            placeholder="所属医院"
            required="required"
          />
          <input
            style={style.input2}
            ref="branch"
            list="branchList"
            placeholder="所属科室"
            required="required"
          />
          <input
            ref="disease"
            style={style.input2}
            type="text"
            placeholder="主治疾病"
            required="required"
          />
          <button
            style={style.button2}
            onClick={this.doctorRegister.bind(this)}
          >
            注册
          </button>
          <datalist id="hospitalList">
            {HospitalData.map(obj => {
              return obj.hospital.map(obj2 => {
                return obj2.hospital.map(obj3 => {
                  return <option value={obj3.hospitalName} />;
                });
              });
            })}
          </datalist>
          <datalist id="branchList">
            {this.state.branchList.map(obj => {
              return <option value={obj.department_2_name} />;
            })}
          </datalist>
        </div>
      </div>
    );
    return (
      <div style={{ height: 400, boxShadow: "0 0 15px #888888", padding: 10 }}>
        <div id="signTap">
          <a
            className="signTap"
            href="#"
            onClick={() => {
              this.setState({
                userType: true
              });
            }}
          >
            用户注册
          </a>
          <span className="signTap" style={{ marginLeft: 10, marginRight: 10 }}>
            |
          </span>
          <a
            className="signTap"
            href="#"
            onClick={() => {
              this.setState({
                userType: false
              });
            }}
          >
            医生注册
          </a>
        </div>
        <div>{loginPage}</div>
      </div>
    );
  }
}
class SearchByDoctor extends Component {
  render() {
    return (
      <div>
        <h1>SearchByDoctor</h1>
      </div>
    );
  }
}
class SearchByHospital extends Component {
  constructor() {
    super();
    this.state = {
      currentProvience: "北京"
    };
  }
  changeProvience(ev) {
    this.setState({
      currentProvience: ev.target.innerHTML
    });
  }
  render() {
    return (
      <div style={{ width: "100%", marginLeft: 0 }}>
        <div style={{ width: "18%", textAlign: "center", float: "left" }}>
          <h2>按省市找医院</h2>
          <ul
            style={{
              width: "100%",
              backgroundColor: "#F8F8F8",
              textAlign: "left",
              paddingLeft: 10
            }}
          >
            {HospitalData.map(obj => {
              return (
                <li
                  style={{
                    listStyle: "none",
                    fontSize: 18,
                    backgroundColor: "#F2F2F2",
                    marginTop: 5,
                    paddingLeft: 10,
                    height: 28
                  }}
                  onClick={this.changeProvience.bind(this)}
                  key={obj.provience}
                >
                  {obj.provience}
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ float: "left", width: "60%", marginLeft: 14 }}>
          {HospitalData.filter(
            obj => obj.provience === this.state.currentProvience
          )[0].hospital.map(obj => {
            return (
              <div
                style={{
                  float: "left",
                  marginLeft: 0,
                  width: "100%",
                  marginTop: 10
                }}
                key={obj.area}
              >
                <span
                  className="area"
                  style={{
                    float: "left",
                    marginLeft: 0,
                    width: "100%",
                    backgroundColor: "#DADADA",
                    paddingLeft: 10
                  }}
                  onClick={() => {
                    if (this.refs[obj.area].className === "hideHospital") {
                      this.refs[obj.area].className = "showHospital";
                    } else {
                      this.refs[obj.area].className = "hideHospital";
                    }
                  }}
                >
                  {obj.area}
                </span>
                <br />
                <div className="showHospital" ref={obj.area}>
                  {obj.hospital.map(object => {
                    return (
                      <Link
                        style={{
                          float: "left",
                          marginLeft: 0,
                          fontSize: 15,
                          width: "50%",
                          marginBottom: 5,
                          marginTop: 5
                        }}
                        to={{
                          pathname: "/hospitalDetail",
                          query: {
                            hospital: object.hospitalName,
                            provience: this.state.currentProvience,
                            area: obj.area,
                            hospitalType: object.typeOf,
                            userName: this.props.userName
                          }
                        }}
                        key={object.hospitalName}
                      >
                        {object.hospitalName}
                        {object.typeOf}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
class SearchByBranch extends Component {
  constructor() {
    super();
    this.state = {
      firstBranch: "妇科",
      secondBranch: "妇科",
      diseaseList: []
    };
  }
  componentDidMount() {
    $.ajax({
      url: "http://120.77.204.15:3000/api/diseaseList",
      type: "get",
      success: data => {
        console.log(data.length);
        this.setState({
          diseaseList: data
        });
      }
    });
  }
  render() {
    let fbName = []; //一级科室重复的筛选
    let sbName = []; //二级科室重复的筛选
    let firstBranch = this.state.diseaseList.map(list => {
      if (!fbName.includes(list.firstBranch)) {
        fbName.push(list.firstBranch);
        return (
          <div
            className={
              this.state.firstBranch === list.firstBranch
                ? "onSelect"
                : "unSelect"
            }
            style={{ width: 160, float: "left", marginLeft: 0 }}
          >
            <span
              key={list.firstBranch}
              onClick={() => {
                this.setState({
                  firstBranch: list.firstBranch,
                  secondBranch: this.state.diseaseList.filter(
                    obj => obj.firstBranch === list.firstBranch
                  )[0].secondBranch
                });
              }}
            >
              {list.firstBranch}
            </span>
          </div>
        );
      }
    });
    let secondBranch = this.state.diseaseList.map(list => {
      if (
        list.firstBranch === this.state.firstBranch &&
        !sbName.includes(list.secondBranch)
      ) {
        sbName.push(list.secondBranch);
        return (
          <div
            className={
              this.state.secondBranch === list.secondBranch
                ? "onSelect"
                : "unSelect"
            }
            style={{ width: 160, float: "left", marginLeft: 0 }}
          >
            <span
              key={list.secondBranch}
              onClick={() => {
                this.setState({
                  secondBranch: list.secondBranch
                });
              }}
            >
              {list.secondBranch}
            </span>
          </div>
        );
      }
    });
    let symptom = this.state.diseaseList.map(list => {
      if (
        list.secondBranch === this.state.secondBranch &&
        list.firstBranch === this.state.firstBranch
      ) {
        return (
          <div style={{ width: 160, float: "left", marginLeft: 0 }}>
            <Link
              key={list.disease}
              style={{ listStyle: null }}
              to={{
                pathname: "/diseaseDetail",
                query: {
                  diseaseName: list.disease,
                  diseaseId: list.id
                }
              }}
            >
              {list.disease}
            </Link>
          </div>
        );
      }
    });
    return (
      <div style={{ width: "100%", marginLeft: 0 }}>
        <div id="byGroup">
          <h2>按人群分</h2>
          <br />
        </div>
        <div id="byBranch">
          <h2>按科室分</h2>
          <br />
          <div
            id="firstBranch"
            style={{
              marginLeft: 0,
              marginBottom: 20,
              width: "100%",
              height: 80,
              borderBottom: 1,
              borderBottomStyle: "dashed"
            }}
          >
            {firstBranch}
          </div>

          <div
            id="secondBranch"
            style={{
              marginLeft: 0,
              marginBottom: 20,
              width: "100%",
              height: 45,
              borderBottom: 1,
              borderBottomStyle: "dashed"
            }}
          >
            {secondBranch}
          </div>
          <div id="diseaseList" style={{ marginLeft: 0, width: "100%" }}>
            {symptom}
          </div>
        </div>
      </div>
    );
  }
}
class DiseaseKnowledge extends Component {
  render() {
    return <h1>Helo</h1>;
  }
}
class AskDoctor extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      currentDoctor: "",
      userType: "",
      message: [],
      currentUser: ""
    };
    socket.on("receive", data => {
      if (
        data.userName === this.props.userName ||
        data.doctorName === this.props.userName
      ) {
        //从医生来的消息会发送到每一个客户端，比对当前用户是否与消息中的用户相同，选择接收
        let message = this.state.dataList;
        message
          .filter(
            obj =>
              obj.doctorName === this.state.currentDoctor ||
              obj.userName === this.state.currentUser
          )[0]
          .messageList.push(data);
        this.setState({
          dataList: message
        });
      }
    });
  }
  componentWillUnmount() {
    console.log(this.state.dataList);
    $.ajax({
      type: "post",
      data: JSON.stringify(this.state.dataList),
      url:
        this.props.userType === "user"
          ? "http://120.77.204.15:3000/saveMessage/user/" + this.props.userName
          : "http://120.77.204.15:3000/saveMessage/doctor/" +
            this.props.userName
    });
  }
  componentDidMount() {
    if (this.props.loginStatus) {
      $.ajax({
        type: "get",
        url:
          this.props.userType === "user"
            ? "http://120.77.204.15:3000/messageList/user/" +
              this.props.userName
            : "http://120.77.204.15:3000/messageList/doctor/" +
              this.props.userName,
        success: data => {
          console.log(data,1)
          data.map(obj => {
            if(!obj.messageList){
              obj.messageList = [];
            } else {
              obj.messageList = JSON.parse(obj.messageList)
            }
            
          });
          console.log(data,2);
          if (this.props.userType === "user") {
            this.setState({
              dataList: data,
              userType: this.props.userType,
              currentDoctor: data[0].doctorName
            });
          } else if (this.props.userType === "doctor") {
            this.setState({
              dataList: data,
              userType: this.props.userType,
              currentUser: data[0].userName
            });
          }
        }
      });
    }
  }
  sendMessage() {
    let data = {
      userName: this.props.userName,
      doctorName: this.state.currentDoctor,
      message: this.refs.message.value,
      sendTime: Date(),
      from: this.props.userName
    };
    let message = this.state.dataList;
    message
      .filter(
        obj =>
          obj.doctorName === this.state.currentDoctor ||
          obj.userName === this.state.currentUser
      )[0]
      .messageList.push(data);
    this.setState({
      dataList: message
    });
    if (this.props.userType === "user") {
      socket.emit("message", {
        userName: this.props.userName,
        doctorName: this.state.currentDoctor,
        message: this.refs.message.value,
        sendTime: Date(),
        from: this.props.userName
      });
    } else if (this.props.userType === "doctor") {
      socket.emit("message", {
        userName: this.state.currentUser,
        doctorName: this.props.userName,
        message: this.refs.message.value,
        sendTime: Date(),
        from: this.props.userName
      });
    }
    //{userName:this.props.userName,doctorName:this.state.currentDoctor,message:this.refs.message}
  }
  render() {
    return this.props.loginStatus ? (
      <div
        style={{
          width: 960,
          height: window.innerHeight - 270,
          border: "1px solid black"
        }}
      >
        <div
          style={{
            width: 192,
            height: window.innerHeight - 270,
            float: "left",
            borderRight: "1px solid black"
          }}
        >
          {this.state.dataList.map(obj => {
            return (
              <div
                style={{
                  width: 182,
                  height: 52,
                  borderBottom: "1px solid black",
                  padding: 5
                }}
                onClick={() => {
                  if (this.state.currentDoctor) {
                    this.setState({
                      currentDoctor: obj.doctorName
                    });
                  } else if (this.state.currentUser) {
                    this.setState({
                      currentUser: obj.userName
                    });
                  }
                }}
              >
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528626588254&di=1180906766b6a6e2f24e608fedf9cd7f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a1955ed02cc32f875a13291fb8b.png"
                  style={{ width: 51, height: 51, borderRadius: 25 }}
                  alt="暂无图片"
                />
                {this.state.currentDoctor ? (
                  <span style={{ marginLeft: 10 }}>{obj.doctorName}</span>
                ) : (
                  <span style={{ marginLeft: 10 }}>{obj.userName}</span>
                )}
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: 767,
            height: window.innerHeight - 270,
            float: "left"
          }}
        >
          <div
            style={{
              height: window.innerHeight - 330,
              //padding: "10px 30px 10px 30px",
              backgroundColor: "white"
            }}
          >
            <div
              style={{
                width: 705,
                height: 30,
                padding: "10px 30px 10px 30px"
              }}
            >
              {this.state.currentDoctor ? (
                <h2
                  style={{
                    height: 30
                  }}
                >
                  {this.state.currentDoctor}
                </h2>
              ) : (
                <h2
                  style={{
                    height: 30
                  }}
                >
                  {this.state.currentUser}
                </h2>
              )}
            </div>
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                height: window.innerHeight - 380,
                backgroundColor: "white"
              }}
            >
              {this.state.dataList
                .filter(
                  obj =>
                    obj.doctorName === this.state.currentDoctor ||
                    obj.userName === this.state.currentUser
                )
                .map(obj => {
                  return obj.messageList.map(a => {
                    return (
                      <div
                        style={{
                          width: 765,
                          backgroundColor: "white",
                          display: "block",
                          marginTop: 10,
                          marginBottom: 10,
                          height: "auto"
                        }}
                      >
                        <img
                          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528626588254&di=1180906766b6a6e2f24e608fedf9cd7f&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F016a1955ed02cc32f875a13291fb8b.png"
                          style={{
                            width: 41,
                            height: 41,
                            borderRadius: 20,
                            marginRight: 10
                          }}
                          alt="暂无图片"
                        />
                        <div style={{ backgroundColor: "white" }}>
                          <div
                            style={{
                              marginBottom: 5,
                              backgroundColor: "white"
                            }}
                          >
                            <span>{a.from}</span>
                          </div>
                          <span
                            style={{
                              backgroundColor: "#0188FB",
                              border: "1px solid #0188FB",
                              padding: "3px 10px 3px 10px",
                              borderRadius: 5,
                              color: "white"
                            }}
                          >
                            {a.message}
                          </span>
                        </div>
                      </div>
                    );
                  });
                })}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: window.innerHeight - 90,
              height: 40,
              padding: "10px 30px 10px 30px"
            }}
          >
            <input
              type="text"
              style={{ width: 610, height: 40, lineHeight: 20 }}
              ref="message"
            />
            <input
              type="button"
              value="发送"
              style={{ width: 73, height: 40, marginLeft: 20, border: "none" }}
              onClick={this.sendMessage.bind(this)}
            />
          </div>
        </div>
      </div>
    ) : (
      <div>
        <span>您还没有登录,请先</span>
        <Link to="/Login">登录</Link>
        <span>或</span>
        <Link to="/signUp">注册</Link>
      </div>
    );
  }
}
class DiseaseDetail extends Component {
  constructor() {
    super();
    this.state = {
      changeDetail: "疾病介绍",
      diseaseData: {},
      doctors: 0,
      doctorOnline: 0,
      diseaseDoctor: []
    };
  }
  componentDidMount() {
    $.ajax({
      url:
        "http://120.77.204.15:3000/api/diseaseDoctor/" +
        this.props.location.query.diseaseName,
      type: "get",
      success: data => {
        this.setState({
          diseaseDoctor: data,
          doctors: data.length
        });
      }
    });
    $.ajax({
      url:
        "http://120.77.204.15:3000/api/disease/" +
        this.props.location.query.diseaseId,
      type: "get",
      success: data => {
        this.setState({
          diseaseData: data
        });
      }
    });
  }
  render() {
    let a = [];
    Object.keys(this.state.diseaseData).forEach(key => {
      a.push(
        <h3
          style={
            this.state.changeDetail === key
              ? { float: "left", width: 106.6, color: "red" }
              : { float: "left", width: 106.6 }
          }
          key={key}
          onClick={() => {
            this.setState({
              changeDetail: key
            });
          }}
        >
          {key}
        </h3>
      );
    });
    return (
      <div style={{ width: "100%", marginLeft: 0, marginTop: 20 }}>
        <div style={{ width: "100%", height: 50 }}>{a}</div>
        <div>{this.state.diseaseData[this.state.changeDetail]}</div>
        <div
          style={{ marginLeft: 0, width: "100%", fontSize: 14, marginTop: 10 }}
        >
          <span style={{ fontSize: 20, margin: "10px 0 10px 0" }}>
            好医生推荐
          </span>
          <hr />
        </div>
        <div style={{ width: 960, height: 200, float: "left" }}>
          {this.state.diseaseDoctor.map(obj => {
            return <Doctor doctor={obj} />;
          })}
        </div>
      </div>
    );
  }
}
class HospitalDetail extends Component {
  constructor() {
    super();
    this.state = {
      doctors: 0,
      doctorOnline: 0,
      hospitalIntroduce: "",
      hospitalDoctor: []
    };
  }
  componentDidMount() {
    $.ajax({
      url:
        "http://120.77.204.15:3000/api/hospitalDetail/" +
        this.props.location.query.hospital +
        "/" +
        this.props.location.query.area,
      type: "get",
      success: data => {
        console.log(data);
        this.setState({
          hospitalIntroduce: data.toString()
        });
      }
    });
    $.ajax({
      url:
        "http://120.77.204.15:3000/api/hospitalDoctor/" +
        this.props.location.query.hospital,
      type: "get",
      success: data => {
        console.log(data);
        this.setState({
          hospitalDoctor: data,
          doctors: data.length
        });
      }
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            marginLeft: 0,
            width: "100%",
            height: 32,
            borderBottom: "1px solid gray",
            marginBottom: 10
          }}
        >
          <h2 style={{ float: "left" }}>
            {this.props.location.query.hospital}
          </h2>
          <span style={{ float: "left", marginLeft: 10, marginTop: 10 }}>
            {this.props.location.query.hospitalType}
          </span>
        </div>
        <div style={{ marginLeft: 0, width: "100%", fontSize: 14 }}>
          <p style={{ fontSize: 20, margin: "10px 0 10px 0" }}>医院介绍</p>
          <p>{this.state.hospitalIntroduce}</p>
        </div>
        <div
          style={{ marginLeft: 0, width: "100%", fontSize: 14, marginTop: 10 }}
        >
          <span style={{ fontSize: 20, margin: "10px 0 10px 0" }}>医生</span>
          <br />
          <span>已入驻(</span>
          <span style={{ color: "red", fontSize: 18 }}>
            {this.state.doctors}
          </span>
          <span>人)</span>
          <span>当前在线(</span>
          <span style={{ color: "red", fontSize: 18 }}>
            {this.state.doctorOnline}
          </span>
          <span>人)</span>
        </div>
        <div style={{ width: 960, height: 200, float: "left" }}>
          {this.state.hospitalDoctor.map(obj => {
            return (
              <Doctor
                doctor={obj}
                userName={this.props.location.query.userName}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
