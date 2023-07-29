import React, { Component } from "react";
import logo from "../images/logo.png";
import API from "../serviços/api";

export default class SideMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            sideBar: localStorage.getItem("sideBar") ? JSON.parse(localStorage.getItem("sideBar")) : []
        }
    }

    componentDidMount(){
        if(!this.state.sideBar)
            this.getLabelHrefMenu();
    }

    async getLabelHrefMenu(){
        try {
            const response = await API.get("futebol1/side-bar");
            this.setState({sideBar: response.data});
            localStorage.setItem("sideBar", JSON.stringify(response.data))

        } catch (error) {
            console.log(error)
        }
    }

    async setNewLayout(href){
        localStorage.setItem("currentHref", href);
        window.location.href = "/";
    }

    render(){
        return (
            <div style={{height: "auto", width: "100%",display: "flex", position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3000}}>
                <div style={{ height: "auto", width: "320px", backgroundColor: "rgba(0,0,0,0.7)", boxShadow: "0px 0px 32px black", display: "flex", flexDirection: "column"}}>
                    <div style={{height: "80px", width: "100%", backgroundColor: "#35f063",display: "flex", justifyContent: "space-between", padding: "12px", alignItems: "center", cursor: "pointer" }}>
                        <span style={{fontWeight: "bold", color: "white", fontSize: "2em"}}>Menu</span>
                        <div onClick={this.props.handlerModal}><span style={{fontWeight: "bold", color: "white", fontSize: "2em"}}> <i className="mdi mdi-close-circle-outline"></i></span></div>
                    </div>
                    {this.state.sideBar.map(element => 
                        <div onClick={(e) => {this.setNewLayout(element.href)}}  style={{fontWeight: "bold", color: "white", fontSize: "1.2em", paddingTop: "12px", paddingLeft: "12px", display: "flex", alignItems: "center", cursor: "pointer"}}>
                            <i className="mdi mdi-chevron-double-right" style={{color: "#35f063", fontSize: "1.2em"}}></i>
                            <span>{element.label}</span>
                        </div>  
                    )}

                </div>
            </div>
            );
    }
}
