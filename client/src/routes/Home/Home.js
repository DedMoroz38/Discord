import React from "react";
import '../routes.css';
import ChatList from "../../components/ChatList";
import { Routes, Route } from 'react-router-dom';
import Chat from "../../components/Chat";
import Header from "../../components/Header";
import Friends from "../../components/friends/friends";


const Home = () => {
    return (
        <div className="home">
            <Header />
            {/* <div className="container"> */}
            <div className="home-box">
                <ChatList />
                <Routes>
                    <Route path="/friends/*" element={<Friends />} />
                    <Route path="/:chatId" element={<Chat />} />
                </Routes >
            </div>
            {/* </div> */}
        </div>
    )
}
export default Home;
