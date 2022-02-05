import React from "react";
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


const Home = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.loginStatus);
    console.log(userInfo);

    // const handleData = (res) => {
    //     console.log(res);
    // }
    useEffect(() => {
        axios.post('http://localhost:3001/getFriends',
            {
                source_id: userInfo.id
            }).then((res) => {
                console.log(res, 1);
            });

        axios.post('http://localhost:3001/getRequestedFriends',
            {
                source_id: userInfo.id
            }).then((res) => {
                console.log(res, 2);
            });
        axios.post('http://localhost:3001/getPandingFriends',
            {
                target_id: userInfo.id
            }).then((res) => {
                console.log(res, 3);
            });
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
