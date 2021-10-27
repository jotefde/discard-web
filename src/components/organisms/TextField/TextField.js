import React, {useEffect, useState} from 'react';
import withContext from 'hoc/withContext';
import "./TextField.scss"
import io from "socket.io-client";


class TextField extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { content: "" };
    }
    componentDidMount() {
        this.socket = io.connect(`/`);
        this.socket.on("init",(data)=> {
            this.setState({content: data });
        });
        this.socket.on("processString",({string, pos}) => {
            let { content } = this.state;
            content = [content.slice(0, pos), string, content.slice(pos)].join('');
            this.setState({ content });
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
                if(e.ctrlKey)
                    return false;
                if(e.key.length === 1)
                    this.sendString(e.key, e.target.selectionStart);
            //sendChar(e.key, e.target.selectionStart);
        }
        return true;
    }

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

    render()
    {
        console.log(this.state.content);
        return <>
       <textarea id="TextField" rows={20} style={{width: '100%'}} onKeyDown={this.textInputHandler} onPaste={this.pasteHandler} onDrop={e => e.preventDefault()} wrap={true} defaultValue={this.state.content}>
       </textarea>
        </>
    }
}

//
// const TextField = ({socket}) => {
//     const [content,setContent] = useState("");
//     useEffect(() => {
//
//     });
//     const sendChar = (char,pos) => {
//         socket.emit("newChar", { char, pos });
//     }
//     const textInput = (e) => {
//         switch(e.key){
//             case "Delete":
//             case "Backspace":
//                 e.preventDefault();
//                 break
//             case "Enter":
//                 sendChar('\n', e.target.selectionStart);
//                 break
//             default:
//                 if(e.key.length === 1){sendChar(e.key, e.target.selectionStart);}
//                 console.log(e.key);
//             //sendChar(e.key, e.target.selectionStart);
//         }
//         return true;
//     }
//     console.log(content);
//     return <>
//        <textarea id="TextField" rows={20} cols={150} onKeyDown={textInput} defaultValue={content}>
//        </textarea>
//     </>
// };
export default withContext(TextField);
