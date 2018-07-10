import React,{Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom'
class SearchBar extends Component{
    render(){
        let a=this.props.loginStatus?(
            <div id="signBar">
                <Link to="/userPage"><FontAwesome name="sign-in" style={{fontSize:25}}/>{this.props.userName}</Link>
                <Link to="/home" onClick={()=>{
                    this.props.changeLoginStatus(false,'');
                }}><FontAwesome name="sign-out" style={{fontSize:25,marginLeft:20}}/>登出</Link>
            </div>):(
            <div id="signBar">
                <Link to="/Login"><FontAwesome name="sign-in" style={{fontSize:25}}/>登录</Link>
                <Link to="/signUp"><FontAwesome name="sign-out" style={{fontSize:25,marginLeft:20}}/>注册</Link>
            </div>)
        return <div style={{height:100}}>
            <input type="search" placeholder="按疾病或者科室进行搜索" id='searchDisease' />
            <button>
                <FontAwesome name="search" />
            </button>
            {a}
        </div>
    }
}
export default SearchBar