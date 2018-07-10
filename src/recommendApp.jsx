import React,{Component} from 'react';
import { Link} from "react-router-dom";
class RecommendApp extends Component{

    render(){
        let style={
            width:'80%',
            marginLeft:'10%',
            backgroundColor:'#F8F8F8',
            height:40,
            borderBottom:'solid 1px red'
        }
        let listStyle={
            fontSize:13,
            float:'right',
            height:40,
            lineHeight:'40px',
            marginRight:20
        }
        return <div style={style}>
            <div style={listStyle}>用户端App</div>
            <div style={listStyle}>
            <Link to='/doctorRegister'>医生入口</Link></div>
            <div style={listStyle}>管理员入口</div>
        </div>
    }
}
export default RecommendApp