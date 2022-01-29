import React from "react";
import './components.css';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { chatsConnect } from '../connect/index';






const Chats = ({ addMessage, messages }) => {
    const { chatId } = useParams();
    const inputRef = useRef(null);

    const cleanInput = () => {
        inputRef.current.value = '';
        inputRef.current.focus();
    }


    const SendMessage = () => {
        if (inputRef.current.value.length > 0) {
            const createMessage = {
                chatId: chatId,
                date: 1,
                newMessage: inputRef.current.value,
            }
            addMessage(createMessage);
            cleanInput();
        }
    }

    let messageList = [];
    if (messages[chatId] !== undefined) {
        messageList = messages[chatId];
    }

    return (
        <div className="chats-box">
            <div className="top-chat-bar"></div>
            <ul className="chat-area">
                {messageList.map((item, index) => (
                    <li className="messageBox" key={index}>
                        <p>{item.message}</p>
                    </li>
                ))}
            </ul>
            <div className="bottom-chat-bar">
                <div className="input-area">
                    <IconButton><AttachFileIcon /></IconButton>
                    <input ref={inputRef} className="chatInput" type="text" />
                    <IconButton onClick={SendMessage}><SendIcon /></IconButton>
                </div>
            </div>
        </div>
    )
}
const Chat = chatsConnect(Chats);
export default Chat;