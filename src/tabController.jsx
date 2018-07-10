import React,{Component} from 'react';
import {Link} from 'react-router-dom'
class TapController extends Component{
    render(){
        let divStyle={
            marginTop:10,
            width:'100%',
            height:50,
            backgroundColor:'red',
            textDecoration:'none'
        }
        return <div style={divStyle} id="tapController">
            <div>
                <Link to="/home">首页</Link></div>
            <div>
                <Link to="/searchByDoctor">按疾病找医生</Link></div>
            <div>
                <Link to="/searchByHospital">按医院找医生</Link></div>
            <div>
                <Link to="/searchByBranch">按科室找医生</Link></div>
            <div>
                <Link to="/diseaseKnowledge">疾病知识库</Link></div>
            <div>
                <Link to="/askDoctor">医生问答</Link></div>

        </div>
    }
}
export default TapController