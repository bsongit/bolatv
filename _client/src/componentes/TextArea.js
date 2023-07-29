import React, { Component } from "react";

export default class TextArea extends Component{
    constructor(props){
        super(props)
    }



    execCommand(command) {
      document.execCommand(command, false, null);
      this.props.onChange({target: {name: this.props.name, value: document.getElementById("myDiv").innerText}})
    }

    handleKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            document.execCommand("insertText", false, " ");
            document.execCommand("insertText", false, " ");
            document.execCommand("insertText", false, " ");
            document.execCommand("insertText", false, " ");
            document.execCommand("insertText", false, " ");
        }
        
        this.props.onChange({target: {name: this.props.name.split(".")[1], value: event.target.innerText}})
    }

    render(){
        return (
        <div>
            <div className="toolbar">
                <button onClick={(e) => {e.preventDefault(); this.execCommand('bold')}}><b>B</b></button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('italic')}}><i>I</i></button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('underline')}}><u>U</u></button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('insertOrderedList')}}>&#35;</button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('insertUnorderedList')}}>&#8226;</button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('justifyLeft')}}><i className="menu-icon mdi mdi-format-align-left"></i></button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('justifyCenter')}}><i className="menu-icon mdi mdi-format-align-justify"></i></button>
                <button onClick={(e) => {e.preventDefault(); this.execCommand('justifyRight')}}><i className="menu-icon mdi mdi-format-align-right"></i></button>
            </div>
            <div id="myDiv" className="editor" contenteditable="true" onKeyDown={this.handleKeyDown.bind(this)}>
                {this.props.value}
            </div>
        </div>
            );
    }
}
