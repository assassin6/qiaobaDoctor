import React,{Component} from 'react';
import '../css/PageHead.css';
import SearchBar from './searchBar.jsx';
import TapController from './tabController.jsx'
class PageHead extends Component{
    render(){
        let headStyle={
            backgroundColor:'#F8F8F8',
            width:'80%',
            height:180,
            marginLeft:'10%',
            marginTop:20
        }

        return (<div style={headStyle}>
            <a href='/'><img src='http://120.77.204.15:3000/img/乔巴医生.png' height='100' alt={'图片加载出错'} />
            <h1 id="PageTitle">乔巴医生</h1></a>
            <SearchBar loginStatus={this.props.loginStatus} userName={this.props.userName} changeLoginStatus={this.props.changeLoginStatus}/>
            <TapController/>
        </div>)
    }
}
export default PageHead