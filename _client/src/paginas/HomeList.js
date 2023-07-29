import React, { Component } from "react";
import Header from "../componentes/Header";
import SideMenu from "../componentes/SideMenu";
import Layout1 from "../componentes/Layout1";

export default class HomeList extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalOpened: false,
            modalMensagem: "",
            modalVariant: ""
        }
    }

    componentDidMount(){
    }

    handlerModal(){
        this.setState({modalOpened: !this.state.modalOpened})
    }

    render(){
        return (
              <div style={{margin: 0, padding: 0}}>
                {this.state.modalOpened? <SideMenu handlerModal={this.handlerModal.bind(this)}></SideMenu> : <div></div>}
                <div style={{margin: 0, padding: 0}}>
                  <Header handlerModal={this.handlerModal.bind(this)}></Header>
                </div>
                <div className="row">
                  <br/>
                </div>
                <div className="row">
                </div>
                <Layout1></Layout1>
              </div>
            );
    }
}
