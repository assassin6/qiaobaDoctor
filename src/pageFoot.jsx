import React, { Component } from 'react';
class PageFoot extends Component{
    render(){
        let footStyle={
            backgroundColor:'red',
            position:'fixed',
            bottom:0,
            width:1200*0.8,
            height:100
        }
        return <div style={footStyle}></div>
    }
}
export  default PageFoot