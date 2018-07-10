import React, { Component } from 'react';
//import logo from './logo.svg';
import '../css/App.css';
import RecommendApp from './recommendApp.jsx';
import PageHead from './pageHead.jsx';
import PageContent from './pageContent.jsx';
import $ from 'jquery';
//import PageFoot from './PageFoot'
// import FontAwesome from 'react-fontawesome'

class App extends Component{
    constructor(){
        super();
        this.state={
            loginStatus:false,
            userName:'',
            currentUser:''
        }
    }
    changeLoginStatus(boolean,string,string2){
        this.setState({
            loginStatus:boolean,
            userName:string,
            currentUser:string2
        })
        console.log(this.state.loginStatus)
    }
    render(){
        return (
            <div id="container" style={{margin:'0 auto',width:1200}}>
                <RecommendApp/>
                <PageHead loginStatus={this.state.loginStatus} userName={this.state.userName} changeLoginStatus={this.changeLoginStatus.bind(this)}/>
                <PageContent changeLoginStatus={this.changeLoginStatus.bind(this)} userName={this.state.userName} loginStatus={this.state.loginStatus} userType={this.state.currentUser}/>
                {/*<PageFoot />*/}
            </div>
        )
    }
}

export default App;
