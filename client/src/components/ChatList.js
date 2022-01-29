import React from "react";
import './components.css';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react';
import { nanoid } from "nanoid";
import img from '../images/profile.png';
import { chatsConnect } from '../connect/index';
import { addMessage } from "../store/messages";
import axios from 'axios';
import discordIcon from '../images/discordIcon.png';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';



const Chatlist = ({ chats, addChat }) => {
    const inputRef = useRef(null);


    const addChatToDB = () => {
        axios.post('http://localhost:3001/insert',
            {
                email: 'ma@gmail.com'
            }).then(() => {
                alert('Inseted!');
            });

    };


    const createChat = () => {
        addChatToDB();
        if (inputRef.current.value.length > 0) {
            const newChat = {
                chatId: nanoid(),
                name: inputRef.current.value,
                img: img
            }
            addChat(newChat);
        }
    }

    return (
        <div className="mainMenuBox">
            <div className="ChatsMenu">
                <div className="icons mainIcon">
                    <img width='25px' src={discordIcon} alt='discordIcon' />
                </div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
                <div className="icons"></div>
            </div>
            <div className="chat-list-box">
                <div className="searchBox">
                    <div className="addChatBar">
                        <input ref={inputRef} placeholder="Add chat..." type='text' />
                        <IconButton sx={{ background: 'grey' }} onClick={() => createChat()}><AddIcon sx={{ color: '#1F2833' }} /></IconButton>
                    </div>
                </div>
                <ul className="chat-list">
                    <NavLink className="addFriendBox" to='/friends/*'>
                        <PersonAddAlt1Icon />
                        <p className="addFriendText">Friends</p>
                    </NavLink>
                    {chats.map((item) => (
                        <NavLink
                            className="chat-box"
                            key={item.chatId}
                            to={`/${item.chatId}`}
                        >
                            <img className="chat-img" src={item.img} />
                            <p>{item.name}</p>
                        </NavLink>
                    )
                    )}
                </ul>
            </div>
        </div>
    )
}
const ChatList = chatsConnect(Chatlist);
export default ChatList;