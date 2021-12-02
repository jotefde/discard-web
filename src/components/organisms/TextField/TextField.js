import React, {useEffect, useState} from 'react';
import withContext from 'hoc/withContext';
import "./TextField.scss"
import io from "socket.io-client";


class TextField extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { content: "", cursorPosition: 0 };
    }
    componentDidMount() {
        this.textFieldEl = document.querySelector("#TextField");
        this.socket = io.connect(`/`);
        this.socket.on("init",(data)=> {
            console.log(data);
            this.setState({ ...this.state, content: data });
        });
        this.socket.on("processString",({string, pos}) => {
            let { content } = this.state;
            content = [content.slice(0, pos), string, content.slice(pos)].join('');
            this.setState({ ...this.state, content });
        });
        this.socket.on("setCursor",(position) => {
            this.setState({ ...this.state, cursorPosition: position });
            this.setCursor(position);
        });
    }

    sendString = (string, pos) =>  this.socket.emit("newString", { string, pos });

    textInputHandler = (e) => {
        switch(e.key){
            case "Delete":
            case "Backspace":
                e.preventDefault();
                break
            case "Enter":
                this.sendString('\n', e.target.selectionStart);
                break
            default:
                console.log(e);
                if(e.ctrlKey || e.metaKey)
                    return false;
                if(e.target.selectionStart != e.target.selectionEnd)
                {
                    e.preventDefault();
                    return false;
                }
                if(e.key.length === 1)
                    this.sendString(e.key, e.target.selectionStart);
            //sendChar(e.key, e.target.selectionStart);
        }
        return true;
    }

    doReset = e => this.socket.emit("reset", {});

    pasteHandler = e => {
        let clipboardData, pastedData;
        const { selectionStart, selectionEnd } = document.querySelector("#TextField");
        if(selectionStart !== selectionEnd)
        {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        clipboardData = e.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData('text/plain');
        this.sendString(pastedData, selectionStart);
    };

    setCursor = (pos) => {
        this.textFieldEl.focus();
        this.textFieldEl.selectionStart = pos;
        this.textFieldEl.selectionEnd = pos;
    };

    mouseUpHandler = e => {
        e.preventDefault();
        this.socket.emit("requestCursorPosition", this.textFieldEl.selectionStart);
        return false;
    }

    render()
    {
        console.log(this.state.content);
        return <>

        <button onClick={this.doReset}>Reset</button>
        <button onClick={this.cursorHandler}>ustaw</button>
        <textarea id="TextField" rows={20} style={{width: '100%'}} onMouseUp={this.mouseUpHandler} onKeyDown={this.textInputHandler} onPaste={this.pasteHandler} onDrop={e => e.preventDefault()} wrap={true} value={this.state.content}>
        </textarea>
        </>
    }
}
export default withContext(TextField);
