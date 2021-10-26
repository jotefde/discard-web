import React, {useEffect, useState} from 'react';
import withContext from 'hoc/withContext';
import "./TextField.scss"


class TextField extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { content: "" };
    }
    componentDidMount() {
        this.socket = this.props.socket;
        this.socket.on("init",(data)=> {
            this.setState({content: data });
        });
        this.socket.on("processChar",({char,pos}) => {
            let { content } = this.state;
            content = [content.slice(0, pos), char, content.slice(pos)].join('');
            console.log("processChar: ",content);
            this.setState({ content });
        });
    }

    sendChar = (char,pos) => {
        this.socket.emit("newChar", { char, pos });
    }
    textInput = (e) => {
        switch(e.key){
            case "Delete":
            case "Backspace":
                e.preventDefault();
                break
            case "Enter":
                this.sendChar('\n', e.target.selectionStart);
                break
            default:
                if(e.key.length === 1)
                    this.sendChar(e.key, e.target.selectionStart);
                console.log(e.key);
            //sendChar(e.key, e.target.selectionStart);
        }
        return true;
    }

    render()
    {
        console.log(this.state.content);
        return <>
       <textarea id="TextField" rows={20} cols={150} onKeyDown={this.textInput} defaultValue={this.state.content}>
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
