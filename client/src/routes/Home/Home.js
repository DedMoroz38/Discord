import React, { useState } from "react";
import '../routes.css';
import ChatList from "../../components/ChatList";
import { Routes, Route } from 'react-router-dom';
import Chat from "../../components/Chat";
import Header from "../../components/Header";
import Friends from "../../components/friends/friends";
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { pandingFriend, requestFriend, addFriend } from '../../store/friends/action';


const Home = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.loginStatus.id);
    const [get, setGet] = useState(true);
    console.log(userInfo);

    useEffect(() => {
        if (get) {
            axios.post('http://localhost:3001/getFriends',
                {
                    source_id: userInfo.id
                }).then((res) => {
                    const result = res.data.result;
                    console.log(result);
                    if (result.length > 0) {
                        console.log(result);
                        dispatch(addFriend(result));
                    }
                });

            axios.post('http://localhost:3001/getRequestedFriends',
                {
                    source_id: userInfo.id
                }).then((res) => {
                    console.log(res, 2);
                });
            setGet(false);
        }
    });
    return (
        <div className="home">
            <Header />
            <div className="home-box">
                <ChatList />
                <Routes>
                    <Route path="/friends/*" element={<Friends />} />
                    <Route path="/:chatId" element={<Chat />} />
                </Routes >
            </div>
        </div>
    )
}
export default Home;
