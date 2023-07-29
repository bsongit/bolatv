import React, { Component } from "react";
import logo from "../images/logo.png";
import API from "../serviços/api";
import loading from "../images/loading.png"

export default class LayoutLive extends Component{
    constructor(props){
        super(props)
        this.state = {
            jogos: [],
            currentGame: JSON.parse(localStorage.getItem("currentGame")),
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

    onCliqueAction(e){
        e.target.classList = "d-none";
        console.log(document.getElementsByTagName("iframe"))
    }

    render(){
        return (
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <div className="bContainerLiveAjust">
                    <h4 className="bTitleWhite" style={{marginTop: "24px"}}>Assistir {this.state.currentGame.timeA} x {this.state.currentGame.timeB} ao vivo sem travamentos na tela, venha assistir grátis {this.state.currentGame.timeA} e {this.state.currentGame.timeB} aqui no +Bet.com</h4>
                    <iframe  id="Player" name="Player" className="bIframe" src={loading}    frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"></iframe>
                    <div className="bCanais">
                        <a className="btn btn-success"  href="https://v3.sportsonline.sx/channels/bra/br1.php" onClick={this.onCliqueAction.bind(this)} target="Player" rel="noopener noreferrer"><strong>CANAL1</strong> </a> 
                        <a className="btn btn-success" href="https://v3.sportsonline.sx/channels/bra/br1.php" onClick={this.onCliqueAction.bind(this)} target="Player" rel="noopener noreferrer"><strong>CANAL2</strong> </a> 
                        <a className="btn btn-success" href="https://v3.sportsonline.sx/channels/hd/hd5.php" onClick={this.onCliqueAction.bind(this)} target="Player" rel="noopener noreferrer"><strong>CANAL3</strong> </a>
                    </div>
                    <h4 className="bTitleGray">Não deixe de acompanhar o jogão entre {this.state.currentGame.timeA} x {this.state.currentGame.timeB} ao vivo a partir das 16h30 (de Brasília) com transmissão do canal SPORTV.</h4>
                    <hr/>
                    <h3  className="bTitleGreen">Assistir {this.state.currentGame.timeA} x {this.state.currentGame.timeB} ao vivo Online.</h3>
                    <hr></hr>
                    <h4 className="bTitleWhite">Só aqui no +Bet.com você não vai perder nenhum lance da partida entre {this.state.currentGame.timeA} E {this.state.currentGame.timeB} grátis sem travamentos.</h4>
                    <hr></hr>
                    <h4 className="bTitleWhite">16h30 - jogo: {this.state.currentGame.timeA} x {this.state.currentGame.timeB} - SPORTV</h4>
                    <hr></hr>
                    <h3 className="bTitleGreen">APÓS O INICIO DA PARTIDA, SELECIONE UMA OPÇÃO DE CANAL E DIVIRTA-SE! CASO VOCÊ ESTEJA ENFRENTANDO ALGUM PROBLEMA PARA VER ESTA PARTIDA, TENTE RECARREGAR SUA PÁGINA! CASO NÃO CONSIGA, ENVIE SEU COMENTÁRIO LOGO ABAIXO PARA RESOLVERMOS O PROBLEMA.</h3>
                    <hr></hr>
                    <h3 className="bTitleWhite">{this.state.currentGame.timeA} x {this.state.currentGame.timeB} pela rodada do jogo no +Bet.com!</h3>
                    <hr></hr>
                    <h3  className="bTitleGreen">É MUITO IMPORTANTE QUE VOCÊ COMPARTILHE NAS SUAS REDES SOCIAIS O NOSSO SITE PARA QUE POSSAMOS MANTER NO AR. QUANTO MAIS PESSOAS, MELHOR.</h3>
                    <hr></hr>
                    <h4  className="bTitleWhite">Aqui você não vai perder nenhuma partida dos jogos do {this.state.currentGame.timeA} ao vivo ou {this.state.currentGame.timeB} online grátis</h4>
                    <hr></hr>
                    <h4  className="bTitleWhite">Confira também toda a nossa gama completa de futebol HD ao vivo</h4>
                    <hr></hr>
                </div>

                <div className="bJogosRelacionados">
                    <div className="bTitleDiv">
                        <h3 style={{marginLeft: "24px" , color: "white"}}>JOGOS RELACIONADOS</h3>
                    </div>
                    <div className="contentDivWrap">
                        {this.state.jogos.map(jogo => 
                            <div onClick={() => {window.location.href = "/live"}} style={{display: "flex", paddingTop: "12px"}}>
                                <div className="card-do-jogo" >
                                    <div className="bCardImages">
                                        <img src={jogo.emblemaTimeA}></img>
                                        <img src={jogo.emblemaTimeB}></img>
                                    </div>
                                    <span className="bLenged">{jogo.titulo}</span>
                                </div>
                            </div>                        
                        )}
                    </div>
                </div>
           
            </div>
            );
    }
}
