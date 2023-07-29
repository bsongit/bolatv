import React, { Component } from "react";
import logo from "../images/logo.png";
import API from "../serviços/api";

export default class Layout1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            jogos: [],
            currentHref: localStorage.getItem("currentHref")? localStorage.getItem("currentHref") : "https://futemax.app/"
        }
    }

    componentDidMount(){
        this.getCurrentGames();
    }

    async getCurrentGames(){
        try {
            const response = await API.post("futebol1/categoria/", {url : this.state.currentHref});
            this.setState({jogos: response.data});
        } catch (error) {
            console.log(error)
        }
    }

    setCurrentGameGoToLive(game){
        localStorage.setItem("currentGame", JSON.stringify(game));
        window.location.href = "/live"
    }

    render(){
        return (
            <div className="w-100 h-100 d-flex justify-content-center">
                <div className="bContainer">
                    <div className="bSubContainer" >
                        <div className="bRow1">
                            <div className="bTiTleDiv" >
                                <h3 className="bTitle1">AO VIVO AGORA</h3>
                            </div>

                            {this.state.jogos.length > 0?
                                <div className="bContentDiv">
                                    <div className="card-do-jogo" onClick={() => {this.setCurrentGameGoToLive(this.state.jogos[0])}}>
                                        <div className="bCardImages" >
                                            <img src={this.state.jogos[0].emblemaTimeA}></img>
                                            <img src={this.state.jogos[0].emblemaTimeB}></img>
                                        </div>
                                        <span className="bLenged">{this.state.jogos[0].titulo}</span>
                                    </div>

                                    <div className="card-do-jogo" onClick={() => {this.setCurrentGameGoToLive(this.state.jogos[1])}}>
                                        <div className="bCardImages">
                                            <img src={this.state.jogos[1].emblemaTimeA}></img>
                                            <img src={this.state.jogos[1].emblemaTimeB}></img>
                                        </div>
                                        <span className="bLenged">{this.state.jogos[1].titulo}</span>
                                    </div>
                                </div>
                            : <div></div>}
                            </div>
                       
                        <div className="bRow2">
                            <div className="bTiTleDiv">
                                <h3 className="bTitle1">OUTROS JOGOS</h3>
                            </div>
                            {this.state.jogos.length > 0?
                                <div onClick={() => {window.location.href = "/live"}} className="contentDivWrap">
                                    {this.state.jogos.slice(2,this.state.jogos.length).map(jogo => 
                                        <div className="card-do-jogo" onClick={() => {this.setCurrentGameGoToLive(jogo)}}>
                                            <div className="bCardImages">
                                                <img src={jogo.emblemaTimeA} ></img>
                                                <img src={jogo.emblemaTimeB} ></img>
                                            </div>
                                                <span  className="bLenged">{jogo.titulo}</span>
                                        </div>    
                                    )}
           
                                </div>
                            : <div></div>}
                        </div>
                    </div>
                    <div className="contentDivColumn">
                        <div className="bRow2">
                            <div className="bTitleDiv2">
                                <h3 style={{color: "white"}}>TOP JOGOS</h3>
                            </div>
                            {this.state.jogos.length > 0?
                                <div onClick={() => {window.location.href = "/live"}} className="subContentDiv2">
                                    {this.state.jogos.slice(2,this.state.jogos.length).map(jogo => 
                                        <div className="subContentDiv3">
                                            <span className="bLegend2">{jogo.titulo}</span>
                                       
                                            <div className="topjogos" onClick={() => {this.setCurrentGameGoToLive(jogo)}}>
                                                <div className="bCardImages2">
                                                    <img src={jogo.emblemaTimeA} style={{width: "86px", height: "86px"}}></img>
                                                    <img src={jogo.emblemaTimeB} style={{width: "86px", height: "86px"}}></img>
                                                </div>
                                            </div>  
                                       
                                        </div>
  
                                    )}
           
                                </div>
                            : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}
