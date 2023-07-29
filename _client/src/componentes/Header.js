import React, { Component } from "react";
import logo from "../images/logo.png";

export default class Header extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="bHeaderContainer">
                <div className="bHeaderLeftBar">
                    <div className="bButonBurger" onClick={this.props.handlerModal}>
                        <i className="mdi mdi-menu" style={{color: "white", fontSize: "2em"}}></i>
                    </div>
                </div>
                <img className="bLogo" src={logo}></img>
                <div className="bHeaderRightBar">
                    <div style={{transform: "skew(-20deg)", cursor: "pointer"}} onClick={this.props.handlerModal}>

                    </div>
                </div>
            </div>
            );
    }
}
