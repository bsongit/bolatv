import React, { Component } from "react";

export default class ModalGeral extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div   style={{zIndex: 3000 ,backgroundColor: "rgba(0,0,0,0.3)", top: 0, left: 0, position: "fixed", height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="bg-light" style={{marginTop: "-160px", border: "1px solid #e9ebf7", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",borderRadius: "12px", boxShadow: "0px 0px 24px rgba(0,0,0,0.3)", backgroundColor: "white", maxWidth: "1024px", maxHeight: "768px", width: "96%", minHeight: "64px", height: "auto"}}>
                    <div className="d-flex w-100 justify-content-end rounded" style={{height: "2em", borderRadius: "64px"}}>
                        <button className="btn btn-light btn-sm" style={{border: "1px dotted #d3d6e0"}} onClick={this.props.handler}><b>X</b></button>
                    </div>
                    {this.props.children}
                </div>
            </div>
            );
    }
}
