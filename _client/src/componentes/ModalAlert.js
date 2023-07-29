import React, { Component } from "react";

export default class ModalAlert extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div  onClick={this.props.handler} style={{zIndex: 3000 ,backgroundColor: "rgba(0,0,0,0.3)", top: 0, left: 0, position: "fixed", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{marginTop: "-160px", border: "1px solid #e9ebf7", borderBottom: "6px solid #2041fa", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",  padding: "24px",borderRadius: "8px", boxShadow: "0px 0px 24px rgba(0,0,0,0.3)", backgroundColor: "white", maxWidth: "480px", maxHeight: "800px", width: "96%", minHeight: "64px", height: "auto"}}>
                    {this.props.variant == "danger" ? <h1><i className="text-danger mdi mdi-alert"></i></h1> :
                        <h1><i className="text-primary mdi mdi-alert-circle"></i></h1>
                    }
                    <span>{this.props.mensagem}</span>
                    <button type="button" className="mt-5 btn btn-primary btn-rounded btn-fw" onClick={this.props.handler}>Entendi</button>
                </div>
            </div>
            );
    }
}
