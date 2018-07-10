const path = require("path");

const express = require("express"),
  app = express(),
  server = require("http").Server(app),
  io = require("socket.io").listen(server);
server.listen(3000);
const fs = require("fs");
var urlencode = require("urlencode"); //解决请求中携带中文乱码问题
const connection = require("./modules/conMysql");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });
app.use(upload.fields([{ name: "thumbnail", maxCount: 1 }]));
app.use(express.static(__dirname));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});
app.get("/api/hospitalDetail/:hospitalName/:area", (req, res) => {
  connection.query(
    'select * from t_hospitaldetail where hospitalName="' +
      req.params.hospitalName +
      '"',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < result.length; i++) {
          if (req.params.area === result[i].hospitalArea) {
            res.send(result[i].introduce);
            break;
          }
        }
      }
    }
  );
});
app.get("/api/hospitalDoctor/:hospitalName", (req, res) => {
  connection.query(
    'select * from doctorList where hospital="' + req.params.hospitalName + '"',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let a = [];
        for (var i = 0; i < result.length; i++) {
          let b = {};
          b.doctorName = result[i].doctorName;
          b.realName = result[i].realname;
          b.hospital = result[i].hospital;
          b.branch = result[i].branch;
          b.disease = result[i].disease;
          a.push(b);
        }
        res.send(a);
      }
    }
  );
});
app.get("/messageList/:userType/:userName", (req, res) => {
  let sqlParam
  if(req.params.userType==='user'){
    sqlParam='select * from user_doctor where userName="' + req.params.userName + '"'
  } else {
    sqlParam='select * from user_doctor where doctorName="' + req.params.userName + '"'
  }
  connection.query(
    sqlParam,
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("failed");
      } else {
        let newResult = [];
        for (var i = 0; i < result.length; i++) {
          let b = {};
          b.userName = result[i].userName;
          b.doctorName = result[i].doctorName;
          b.messageList = result[i].messageList;
          newResult.push(b);
        }
        res.send(newResult);
      }
    }
  );
});
app.post("/addMessageList", (req, res) => {
  req.on("data", chunk => {
    let addmessage = [
      bodyParsers(chunk.toString()).userName,
      bodyParsers(chunk.toString()).doctor,
      bodyParsers(chunk.toString()).message
    ];
    console.log(addmessage);
    connection.query(
      "insert into user_doctor(userName,doctorName,messageList) values(?,?,?)",
      addmessage,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("failed");
        } else {
          console.log(
            "addMessage success",
            bodyParsers(chunk.toString()).userName
          );
          res.send("success");
        }
      }
    );
  });
});
app.get("/api/diseaseDoctor/:diseaseName", (req, res) => {
  console.log(1);
  connection.query("select * from doctorList", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let newResult = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].disease.search(req.params.diseaseName) != -1) {
          let b = {};
          b.doctorName = result[i].doctorName;
          b.realName = result[i].realname;
          b.hospital = result[i].hospital;
          b.branch = result[i].branch;
          b.disease = result[i].disease;
          newResult.push(b);
        }
      }
      res.send(newResult);
    }
  });
});
app.get("/api/diseaseList", (req, res) => {
  connection.query(
    "select t_departments.department_1_name,t_departments.department_2_name,t_symptoms.symptoms_name,t_symptoms.id from t_departments inner join t_symptoms on t_departments.department_2_name=t_symptoms.department_2_name limit 0,4000",
    function(err, result) {
      var newResult = [];
      if (err) {
        console.log(err);
      }
      for (var i = 0; i < result.length; i++) {
        var obj = {};
        obj.firstBranch = result[i].department_1_name;
        obj.secondBranch = result[i].department_2_name;
        obj.disease = result[i].symptoms_name;
        obj.id = result[i].id;
        newResult.push(obj);
      }
      res.send(newResult);
    }
  );
});
app.get("/api/department", (req, res) => {
  connection.query("select * from t_departments", (err, result) => {
    var newResult = [];
    if (err) {
      console.log(err);
    }
    for (var i = 0; i < result.length; i++) {
      var obj = {};
      obj.department_2_name = result[i].department_2_name;
      newResult.push(obj);
    }
    res.send(newResult);
  });
});
app.get("/api/disease/:diseaseId", (req, res) => {
  connection.query(
    'select * from t_disease where id="' + req.params.diseaseId + '"',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        var a = {};
        a["疾病名称"] = result[0].symptom;
        a["疾病介绍"] = result[0].introduction_of_disease;
        a["高发人群"] = result[0].high_incidence_group;
        a["传染性"] = result[0].contagion;
        a["症状"] = result[0].state;
        a["检查"] = result[0]["inspect"];
        a["诊断和鉴别"] = result[0].diagnosis;
        a["治疗"] = result[0].cure;
        a["护理"] = result[0].nursing;
        res.send(a);
      }
    }
  );
});
app.post("/sign", (req, res) => {
  req.on("data", chunk => {
    connection.query(
      'insert into userList(userName,password) values("' +
        bodyParsers(chunk.toString()).userName +
        '","' +
        bodyParsers(chunk.toString()).password +
        '")',
      function(err, result) {
        if (err) {
          console.log(err);
          res.send("failed");
        } else {
          res.send("success");
        }
      }
    );
  });
});
app.post("/login", (req, res) => {
  req.on("data", chunk => {
    connection.query(
      'select * from userlist where userName="' +
        bodyParsers(chunk.toString()).userName +
        '"',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length!=0&&result[0].password === bodyParsers(chunk.toString()).password) {
            res.send("success");
          } else {
            res.send("failed");
          }
        }
      }
    );
  });
});
app.post("/completeUser", (req, res) => {
  req.on("data", function(chunk) {
    let sqlU =
      "update userList set age=?,weight=?,height=?,realName=? where userName=?";
    let sqlParm = [
      bodyParsers(chunk.toString()).age,
      bodyParsers(chunk.toString()).weight,
      bodyParsers(chunk.toString()).height,
      bodyParsers(chunk.toString()).realName,
      bodyParsers(chunk.toString()).userName
    ];
    connection.query(sqlU, sqlParm, function(err, result) {
      if (err) {
        console.log(err);
        res.send("failed");
      } else {
        res.success("success");
      }
    });
  });
});
app.post("/doctorRegister", (req, res) => {
  // console.log(req.files)
  // console.log(req.body)
  // fs.rename('./uploads/'+req.files.thumbnail[0].filename,'./uploads/'+req.body.userName+'.jpg',(err)=>{
  //   if(err){
  //     console.log(err)
  //   }
  // })
  req.on("data", chunk => {
    console.log(bodyParsers(chunk.toString()).password);
    let arr = [
      urlencode.decode(bodyParsers(chunk.toString()).userName, "utf8"),
      urlencode.decode(bodyParsers(chunk.toString()).realName, "utf8"),
      bodyParsers(chunk.toString()).password,
      urlencode.decode(bodyParsers(chunk.toString()).hospital, "utf8"),
      urlencode.decode(bodyParsers(chunk.toString()).branch, "utf8"),
      urlencode.decode(bodyParsers(chunk.toString()).disease, "utf8")
    ];
    connection.query(
      "insert into doctorlist(doctorname,realname,password,hospital,branch,disease) values(?,?,?,?,?,?)",
      arr,
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("failed");
        } else {
          res.redirect("/");
        }
      }
    );
  });
});
app.get("/download", (req, res) => {
  res.download("app.js");
});
app.post("/doctorLogin", (req, res) => {
  req.on("data", chunk => {
    connection.query(
      'select * from doctorlist where doctorName="' +
        bodyParsers(chunk.toString()).doctorName +
        '"',
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length!=0&&result[0].password === bodyParsers(chunk.toString()).password) {
            res.send('success');
          } else {
            res.send("failed");
          }
        }
      }
    );
  });
});
app.post('/saveMessage/:userType/:userName',(req,res)=>{
  console.log(req.params.userName,req.params.userType)
  req.on('data',(chunk=>{
    JSON.parse(chunk.toString()).map(obj=>{
      if(obj.messageList.length>0){
        connection.query('update user_doctor set messageList=? where userName=? and doctorName=?',[JSON.stringify(obj.messageList),obj.userName,obj.doctorName],(err,result)=>{
        if(err){
          console.log(err)
        }
      })
      }
    })
   
  }))
})
function bodyParsers(body) {
  //将post格式的数据封装成数组的格式
  var Array = {};
  body.split("&").forEach(function(t) {
    Array[t.split("=")[0]] = t.split("=")[1];
  });
  return Array;
}
io.sockets.on("connection", socket => {
  socket.on("message", data => {
    console.log(data);
    socket.broadcast.emit("receive", data);
  });
});
